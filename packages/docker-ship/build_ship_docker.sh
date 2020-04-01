#!/usr/bin/env bash

echo "start pulling fill-pg docker image"

# change to script's directory
cd "$(dirname "$0")"
SCRIPTPATH="$( pwd -P )"

# sourcing variable from config file
source ./config.file

# override config if there are any local config changes
if [ -f "./config.file.local" ]; then
  source ./config.file.local
fi

echo "Pulling docker image $SHIP_IMAGE_PREFIX version $SHIP_VERSION, this may take some time..."
docker pull $SHIP_IMAGE_NAME

# # docker build -t $SHIP_IMAGE_NAME .
# # build docker image, if necessary
# if [[ "$(docker images -q $SHIP_IMAGE_NAME)" == "" ]]; then
#   echo "Pulling docker image $SHIP_IMAGE_PREFIX version $SHIP_VERSION, this may take some time..."
#   # docker build -t $SHIP_IMAGE_NAME . --no-cache
#   docker pull eosio/eosio-explorer:fill-pg-test1.0
# else
#   echo "docker image already exists, skip pulling"
# fi

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
