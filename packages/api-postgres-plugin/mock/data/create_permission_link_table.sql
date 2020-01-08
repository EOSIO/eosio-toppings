CREATE TABLE IF NOT EXISTS chain.permission_link (
    block_num bigint,
    present boolean,
    account character varying(13),
    code character varying(13),
    message_type character varying(13),
    required_permission character varying(13),
    CONSTRAINT permission_link_pkey PRIMARY KEY (block_num, present, account, code, message_type)
);

CREATE UNIQUE INDEX IF NOT EXISTS permission_link_pkey ON chain.permission_link(block_num int8_ops,present bool_ops,account text_ops,code text_ops,message_type text_ops);

CREATE INDEX IF NOT EXISTS chain_permission_link_index ON chain.permission_link(account text_ops,code text_ops,message_type text_ops);

TRUNCATE TABLE chain.permission_link;
