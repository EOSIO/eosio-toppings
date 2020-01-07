const fs = require('fs');
const path = require('path');
const parse = require('pg-connection-string').parse;
const Postgres = require('../api/db');
const DB_CONNECTION_QUERIES = require('../env-config').db;

const { host, user, database, password, port } = parse(
  process.env.DATABASE_URL || ''
);

const MOCK_DB_CONNECTION_QUERIES = {
  host: host || '',
  user,
  database: database || '',
  password,
  port: port || ''
};

const getQueries = pathname =>
  fs
    .readFileSync(path.join(__dirname, pathname))
    .toString()
    .split('\n\n');

const initMockDatabase = async () => {
  const queries = ['CREATE SCHEMA IF NOT EXISTS chain;'];

  queries.push(...getQueries('../mock/data/create_block_info_table.sql'));
  queries.push(...getQueries('../mock/data/create_action_trace_table.sql'));
  queries.push(...getQueries('../mock/data/create_trx_trace_table.sql'));
  queries.push(...getQueries('../mock/data/create_permission_table.sql'));

  queries.push(...getQueries('../mock/data/insert_block_info_data.sql'));
  queries.push(...getQueries('../mock/data/insert_action_trace_data.sql'));
  queries.push(...getQueries('../mock/data/insert_trx_trace_data.sql'));
  queries.push(...getQueries('../mock/data/insert_permission_data.sql'));

  for (let i = 0; i < queries.length; i++) {
    await Postgres.queryAsync(queries[i]);
  }
};

const startConnection = async (mockMode = true) => {
  if (!!mockMode) {
    await Postgres.connectToDB(MOCK_DB_CONNECTION_QUERIES);
    await initMockDatabase();
  } else {
    await Postgres.connectToDB(DB_CONNECTION_QUERIES);
  }
};

const endConnection = () => Postgres.disconnectFromDB();

module.exports = {
  startConnection,
  endConnection,
  testConnection: () => {
    it('Check connection to PostgreSQL', async done => {
      const connectToDBCall = jest.spyOn(Postgres, 'connectToDB');

      await startConnection();
      await endConnection();

      expect(connectToDBCall).toBeCalledTimes(1);

      done();
    });
  }
};
