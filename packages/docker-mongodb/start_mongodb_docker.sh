#!/usr/bin/env bash
set -o errexit

# change to script's directory
cd "$(dirname "$0")"

# docker did not stop properly
if [ "$(docker ps -q -f status=exited -f name=eosio-mongodb)" ]; then
  docker rm eosio-mongodb
fi

if [ ! "$(docker ps -q -f name=eosio-mongodb)" ]; then
  if find "$(pwd)/data" -mindepth 1 -print -quit 2>/dev/null | grep -q .; then
    echo "mongodb docker is not running, but data folder exists"
    echo "cleaning data now"
    rm -r "$(pwd)"/data/*
    docker volume rm --force mongodata
  fi
  docker volume create --name=mongodata
  docker run -d --rm -p 27017:27017 --name eosio-mongodb -v mongodata:/data/db mongo
else
  echo "docker already running"
fi
