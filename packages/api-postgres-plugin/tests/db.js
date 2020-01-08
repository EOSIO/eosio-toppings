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
  queries.push(...getQueries('../mock/data/create_permission_link_table.sql'));

  queries.push(...getQueries('../mock/data/insert_block_info_data.sql'));
  queries.push(...getQueries('../mock/data/insert_action_trace_data.sql'));
  queries.push(...getQueries('../mock/data/insert_trx_trace_data.sql'));
  queries.push(...getQueries('../mock/data/insert_permission_data.sql'));
  queries.push(...getQueries('../mock/data/insert_permission_link_data.sql'));

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
    it('attempt to connect as normal', async done => {
      const connectToDBCall = jest.spyOn(Postgres, 'connectToDB');

      await startConnection();
      await endConnection();

      expect(connectToDBCall).toBeCalledTimes(1);

      done();
    });

    it('check if the correct error is returned when a faulty connection is used', async done => {
      expect.assertions(4);

      try {
        await Postgres.connectToDB({
          host: 'dummyHost',
          user: 'dummyUser',
          database: 'dummyDB',
          password: 'dummyPassword',
          port: 1234
        });
      } catch (error) {
        expect(error.syscall).toMatch('getaddrinfo');
        expect(error.code).toMatch('ENOTFOUND');
        expect(error.host).toMatch('dummyHost');
        expect(error.port).toEqual(1234);
      }

      done();
    });
  },
  testQuery: () => {
    it('should return an error if the query is invalid', done => {
      Postgres.query('AN INVALID QUERY', '', (error, result) => {
        expect(error).toBeDefined();
        expect(result).not.toBeDefined();

        done();
      });
    });

    it('format validation', done => {
      Postgres.query('SELECT 420 as test', '', (error, result) => {
        expect(error).not.toBeDefined();
        expect(result).toBeDefined();
        expect(result.rows).toBeInstanceOf(Array);
        expect(result.rows.length).toEqual(1);
        expect(result.rows[0].test).toEqual(420);

        done();
      });
    });
  },
  testQueryAsync: () => {
    it('should return an error if the query is invalid', async done => {
      expect.assertions(1);

      try {
        await Postgres.queryAsync('AN INVALID QUERY', '');
      } catch (error) {
        expect(error).toBeDefined();
      }

      done();
    });

    it('format validation', async done => {
      const result = await Postgres.queryAsync('SELECT 420 as test', '');

      expect(result).toBeDefined();
      expect(result.rows).toBeInstanceOf(Array);
      expect(result.rows.length).toEqual(1);
      expect(result.rows[0].test).toEqual(420);

      done();
    });
  }
};
