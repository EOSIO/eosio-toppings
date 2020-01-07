DO $$ BEGIN
  IF NOT EXISTS (select 1 from pg_type where typname = 'key_weight') THEN
    CREATE TYPE chain.key_weight AS (key character varying, weight integer);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (select 1 from pg_type where typname = 'permission_level_weight') THEN
    CREATE TYPE chain.permission_level_weight AS (permission_actor character varying(13), permission_permission character varying(13), weight integer);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (select 1 from pg_type where typname = 'wait_weight') THEN
    CREATE TYPE chain.wait_weight AS (wait_sec bigint, weight integer);
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS chain.permission (
    block_num bigint,
    present boolean,
    owner character varying(13),
    name character varying(13),
    parent character varying(13),
    last_updated timestamp without time zone,
    auth_threshold bigint,
    auth_keys chain.key_weight[],
    auth_accounts chain.permission_level_weight[],
    auth_waits chain.wait_weight[],
    CONSTRAINT permission_pkey PRIMARY KEY (block_num, present, owner, name)
);

CREATE UNIQUE INDEX IF NOT EXISTS permission_pkey ON chain.permission(block_num int8_ops,present bool_ops,owner text_ops,name text_ops);

CREATE INDEX IF NOT EXISTS chain_permission_index ON chain.permission(owner text_ops,name text_ops);

TRUNCATE TABLE chain.permission;
