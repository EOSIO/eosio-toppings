const parse = require('pg-connection-string').parse;
const Postgres = require('../api/db');
const DB_CONNECTION_QUERY = require('../env-config').db;

const { host, user, database, password, port } = parse(
  process.env.DATABASE_URL || ''
);

const MOCK_DB_CONNECTION_QUERY = {
  host: host || '',
  user,
  database: database || '',
  password,
  port: port || ''
};

const CREATE_BLOCK_INFO_TABLE = `
DO $$ BEGIN
  IF NOT EXISTS (select 1 from pg_type where typname = 'producer_key') THEN
    CREATE TYPE chain.producer_key AS (name character varying(13), key character varying(64));
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS chain.block_info (
  block_num bigint PRIMARY KEY,
  block_id character varying(64),
  timestamp timestamp without time zone,
  producer character varying(13),
  confirmed integer,
  previous character varying(64),
  transaction_count integer,
  transaction_mroot character varying(64),
  action_mroot character varying(64),
  schedule_version bigint,
  new_producers_version bigint,
  new_producers chain.producer_key[]
);

CREATE UNIQUE INDEX IF NOT EXISTS block_info_pkey ON chain.block_info(block_num int8_ops);

CREATE TABLE IF NOT EXISTS chain.received_nonempty_block (
  block_num bigint PRIMARY KEY,
  block_id character varying(64),
  transaction_count integer,
  timestamp timestamp without time zone
);

CREATE UNIQUE INDEX IF NOT EXISTS received_nonempty_block_pkey ON chain.received_nonempty_block(block_num int8_ops);
`;

const CREATE_ACTION_TRACE_TABLE = `
DO $$ BEGIN
  IF NOT EXISTS (select 1 from pg_type where typname = 'transaction_status_type') THEN
    CREATE TYPE chain.transaction_status_type AS ENUM('executed', 'soft_fail', 'hard_fail', 'delayed', 'expired');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS chain.action_trace (
  block_num bigint,
  timestamp timestamp without time zone,
  transaction_id character varying(64),
  transaction_status chain.transaction_status_type,
  actor character varying(13),
  permission character varying(13),
  token_from character varying(13),
  token_to character varying(13),
  amount bigint,
  symbol character varying(7),
  action_ordinal bigint,
  creator_action_ordinal bigint,
  receipt_present boolean,
  receipt_receiver character varying(13),
  receipt_act_digest character varying(64),
  receipt_global_sequence numeric,
  receipt_recv_sequence numeric,
  receipt_code_sequence bigint,
  receipt_abi_sequence bigint,
  receiver character varying(13),
  act_account character varying(13),
  act_name character varying(13),
  act_data bytea,
  context_free boolean,
  elapsed bigint,
  console character varying(13),
  "except" character varying(13),
  error_code numeric,
  CONSTRAINT action_trace_pkey PRIMARY KEY (block_num, transaction_id, action_ordinal)
);

CREATE UNIQUE INDEX IF NOT EXISTS action_trace_pkey ON chain.action_trace(block_num int8_ops,transaction_id text_ops,action_ordinal int8_ops);
CREATE INDEX IF NOT EXISTS act_account_index ON chain.action_trace(act_account text_ops,receipt_global_sequence numeric_ops);
CREATE INDEX IF NOT EXISTS actor_index ON chain.action_trace(actor text_ops,receipt_global_sequence numeric_ops);
CREATE INDEX IF NOT EXISTS from_index ON chain.action_trace(token_from text_ops,receipt_global_sequence numeric_ops);
CREATE INDEX IF NOT EXISTS to_index ON chain.action_trace(token_to text_ops,receipt_global_sequence numeric_ops);
`;

const CREATE_TRANSACTION_TRACE_TABLE = `
CREATE TABLE IF NOT EXISTS chain.transaction_trace (
  block_num bigint,
  transaction_ordinal integer,
  failed_dtrx_trace character varying(64),
  id character varying(64),
  status chain.transaction_status_type,
  cpu_usage_us bigint,
  net_usage_words bigint,
  elapsed bigint,
  net_usage numeric,
  scheduled boolean,
  account_ram_delta_present boolean,
  account_ram_delta_account character varying(13),
  account_ram_delta_delta bigint,
  "except" character varying,
  error_code numeric,
  partial_present boolean,
  partial_expiration timestamp without time zone,
  partial_ref_block_num integer,
  partial_ref_block_prefix bigint,
  partial_max_net_usage_words bigint,
  partial_max_cpu_usage_ms smallint,
  partial_delay_sec bigint,
  partial_signatures character varying[],
  partial_context_free_data bytea[],
  CONSTRAINT transaction_trace_pkey PRIMARY KEY (block_num, transaction_ordinal)
);

CREATE UNIQUE INDEX IF NOT EXISTS transaction_trace_pkey ON chain.transaction_trace(block_num int8_ops,transaction_ordinal int4_ops);
`;

module.exports = {
  startConnection: async (mockMode = true) => {
    if (!!mockMode) {
      await Postgres.connectToDB(MOCK_DB_CONNECTION_QUERY);
      await Postgres.queryAsync(`
        CREATE SCHEMA IF NOT EXISTS chain;
        ${CREATE_BLOCK_INFO_TABLE}
        ${CREATE_ACTION_TRACE_TABLE}
        ${CREATE_TRANSACTION_TRACE_TABLE}
      `);
    } else {
      await Postgres.connectToDB(DB_CONNECTION_QUERY);
    }
  },
  endConnection: () => Postgres.disconnectFromDB()
};
