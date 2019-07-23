#!/usr/bin/env bash

echo "start building state history plugin docker"

# change to script's directory
cd "$(dirname "$0")"
SCRIPTPATH="$( pwd -P )"

# sourcing variable from config file
source ./config.file

# override config if there are any local config changes
if [ -f "./config.file.local" ]; then
  source ./config.file.local
fi

# build docker image, if necessary
if [[ "$(docker images -q $SHIP_IMAGE_NAME)" == "" ]]; then
  echo "Build docker image $SHIP_IMAGE_PREFIX version $SHIP_VERSION, this may take some time"
  docker build -t $SHIP_IMAGE_NAME . --no-cache
else
  echo "docker image already exists, skip building"
fi

# force remove the perivous container if any
# create a clean data folder in eosio_docker to preserve block data
echo "cleaning up data remnants"
echo "remove the volume if the container doesn't exists"
if [ "$(docker ps -q -f name=^$SHIP_CONTAINER_NAME$)" ]; then
    if [ "$(docker ps -aq -f status=running -f name=^$SHIP_CONTAINER_NAME$)" ]; then
        echo "Previous container is running, stopping"
        docker rm --force $SHIP_CONTAINER_NAME
    fi
fi
if [ ! "$(docker ps -q -f name=^$SHIP_CONTAINER_NAME$)" ]; then
  echo "No container running"
fi
