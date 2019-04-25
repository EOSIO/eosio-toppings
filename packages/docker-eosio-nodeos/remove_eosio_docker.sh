#!/usr/bin/env bash
set -e

# sourcing variable from config file
source ./config.file

# override config if there are any local config changes
if [ -f "./config.file.local" ]; then
  source ./config.file.local
fi

# change to script's directory
cd "$(dirname "$0")"
# stop the container 
if [ "$(docker ps -q -f name=$NODEOS_CONTAINER_NAME)" ]; then
  docker stop $NODEOS_CONTAINER_NAME
fi

# remove blockchain volume
if [ "$(docker volume ls --format '{{.Name}}' -f name=$NODEOS_VOLUME_NAME)" ]; then
    docker volume rm --force $NODEOS_VOLUME_NAME
fi
