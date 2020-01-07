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

TRUNCATE TABLE chain.action_trace;
