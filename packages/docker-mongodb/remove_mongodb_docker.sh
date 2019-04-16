#!/usr/bin/env bash
set -o errexit

# change to script's directory
cd "$(dirname "$0")"
if [ "$(docker ps -q -f name=eosio-mongodb)" ]; then
  docker stop eosio-mongodb
  docker volume rm --force mongodata
fi

