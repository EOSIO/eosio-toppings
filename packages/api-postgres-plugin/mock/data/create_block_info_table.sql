DO $$ BEGIN
  IF NOT EXISTS (select 1 from pg_type where typname = 'producer_key') THEN
    CREATE TYPE chain.producer_key AS (producer_name character varying(13), block_signing_key character varying);
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

TRUNCATE TABLE chain.block_info;

TRUNCATE TABLE chain.received_nonempty_block;
