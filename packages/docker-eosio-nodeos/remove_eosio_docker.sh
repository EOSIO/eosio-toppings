#!/usr/bin/env bash
set -o errexit

# change to script's directory
cd "$(dirname "$0")"
if [ "$(docker ps -q -f name=eosio_gui_nodeos_container)" ]; then
  docker stop eosio_gui_nodeos_container && rm -r data/*
else
  echo 'eosio nodeos docker is not running'
fi
