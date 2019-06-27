#!/usr/bin/env bash
set -o errexit

# change to script's directory
cd "$(dirname "$0")"

# sourcing variable from config file
source ./config.file

# override config if there are any local config changes
if [ -f "./config.file.local" ]; then
  source ./config.file.local
fi

echo "waiting for docker to stop"
# check if mongodb container is running
if [ "$(docker ps -q -f name=^$SHIP_CONTAINER_NAME$)" ]; then
  docker stop $SHIP_CONTAINER_NAME 
  sleep 10
fi

if [ "$(docker ps -q -a -f name=^$SHIP_CONTAINER_NAME$)" ]; then
  docker rm $SHIP_CONTAINER_NAME
fi

if [ "$(docker ps -q -f name=^$POSTGRES_CONTAINER_NAME$)" ]; then
  docker stop $POSTGRES_CONTAINER_NAME 
  sleep 10
fi

if [ "$(docker ps -q -a -f name=^$POSTGRES_CONTAINER_NAME$)" ]; then
  docker rm $POSTGRES_CONTAINER_NAME
fi

# also remove blockchain volume if its exists
if [ "$(docker volume ls --format '{{.Name}}' -f name=^$POSTGRES_VOLUME_NAME$)" ]; then
    docker volume rm --force $POSTGRES_VOLUME_NAME
fi
