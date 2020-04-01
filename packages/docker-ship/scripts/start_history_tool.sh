#!/usr/bin/env bash
set -o errexit

echo "starting postgres"

set -m

# wait for config file to be copied to container
sleep 5

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

SHIP_PLUGIN_ENDPOINT="$NODE_ENDPOINT_DOMAIN_NAME:$SHIP_PLUGIN_PORT"

if [ $POSTGRES_HOST == "localhost" ]; then
  POSTGRES="127.0.0.1"
else
  POSTGRES=$POSTGRES_HOST
fi

./build/fill-pg --fpg-create --ignore-onblock --remove_old_delta_row --dbstring="hostaddr=$POSTGRES port=$POSTGRES_PORT" --fill-connect-to $SHIP_PLUGIN_ENDPOINT
