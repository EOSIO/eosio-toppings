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

# docker did not stop properly
if [ "$(docker ps -q -f status=exited -f name=^$SHIP_CONTAINER_NAME$)" ]; then
  docker rm $SHIP_CONTAINER_NAME
fi

if [ "$(docker ps -q -f status=exited -f name=^$POSTGRES_CONTAINER_NAME$)" ]; then
  docker rm $POSTGRES_CONTAINER_NAME
fi

script="./resume_history_tool.sh"

# check if container does not already exists
if [ ! "$(docker ps -q -f name=^$POSTGRES_CONTAINER_NAME$)" ]; then
  if [ ! "$(docker volume ls --format '{{.Name}}' -f name=^$POSTGRES_VOLUME_NAME$)" ]; then
    #If the volume is created then call start_history_tool script
    script="./start_history_tool.sh"
    # recreate fresh volume
    docker volume create --name=$POSTGRES_VOLUME_NAME
    
  fi

  # start the postgres docker
  echo "running postgresql docker container"
  docker run -d -p $POSTGRES_PORT:5432 \
  --name $POSTGRES_CONTAINER_NAME \
  -v $POSTGRES_VOLUME_NAME:/var/lib/postgresql/data \
  -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
  postgres:12
  sleep 10
else
    echo "docker is already running"
fi

# check if container does not already exists
if [ ! "$(docker ps -q -f name=^$SHIP_CONTAINER_NAME$)" ]; then
  # start the blockchain docker
  # --link is to get access to other container
  echo "running state history plugin docker container"
  docker run -it --name $SHIP_CONTAINER_NAME -d \
  --net host \
  $SHIP_IMAGE_NAME \
  "$script"

  docker cp config.file.local $SHIP_CONTAINER_NAME:/root/history-tools/
  docker cp config.file $SHIP_CONTAINER_NAME:/root/history-tools/
else
    echo "docker is already running"
fi
