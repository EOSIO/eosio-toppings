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

TRUNCATE TABLE chain.transaction_trace;
