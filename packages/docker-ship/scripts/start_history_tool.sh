#!/usr/bin/env bash
set -o errexit

echo "starting postgres"

set -m
# sourcing variable from config file
source ./config.file

# override config if there are any local config changes
if [ -f "./config.file.local" ]; then
  source ./config.file.local
fi

# su postgres

# /etc/init.d/postgresql start
# echo "waiting for postgres to start"
# sleep 10
export PGHOST=$POSTGRES_HOST && export PGUSER=$POSTGRES_USER && export PGPASSWORD=$POSTGRES_PASSWORD && export PGDATABASE=$POSTGRES_DATABASE

./build/fill-pg --fpg-create
