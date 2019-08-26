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
if [ "$(docker ps -q -f status=exited -f name=^$NODEOS_CONTAINER_NAME$)" ]; then
  docker rm $NODEOS_CONTAINER_NAME
fi

HARDREPLAY=false
NOLOG=false
SAMPLEDATA=false

# check for arguments
for arg in $@
do
  case $arg in
    --hard-replay)
      HARDREPLAY=true
      ;;
    --NOLOG)
      NOLOG=true
      ;;
    --sample-data)
      SAMPLEDATA=true
      ;;
  esac
done


# check if blockchain has been already been initialized/started previously
if ( $HARDREPLAY ); then
  if [ "$(docker ps -q -f name=^$NODEOS_CONTAINER_NAME$)" ]; then
    echo 'stopping container if already running '
    docker stop $NODEOS_CONTAINER_NAME
    docker rm $NODEOS_CONTAINER_NAME
    sleep 10
  fi
  script="./scripts/replay_blockchain.sh"
else
  script="./scripts/init_blockchain.sh"
fi

# check if container does not already exists
if [ ! "$(docker ps -q -f name=^$NODEOS_CONTAINER_NAME$)" ]; then
  # check if blockchain volume exists and remove it 
  if [ ! "$(docker volume ls --format '{{.Name}}' -f name=^$NODEOS_VOLUME_NAME$)" ]; then
    # recreate fresh volume
    docker volume create --name=$NODEOS_VOLUME_NAME
  fi

  # start the blockchain docker
  # --link is to get access to other container
  echo "running docker container from the $NODEOS_IMAGE_NAME image"
  docker run --name $NODEOS_CONTAINER_NAME -d \
  -p 8888:8888 \
  -p 8080:8080 \
  -v $NODEOS_VOLUME_NAME:/mnt/dev/data \
  $NODEOS_IMAGE_NAME \
  "$script"

  if ( $SAMPLEDATA ); then
    echo "waiting to ensure sample data can be created safely..."
    sleep 10s
    docker exec -i $NODEOS_CONTAINER_NAME ./scripts/create_sample_data.sh
  fi

  # check if we have follow log
  if ( $NOLOG ); then
      echo "follow $NODEOS_CONTAINER_NAME logs"
      docker logs $NODEOS_CONTAINER_NAME --follow
  fi
else
    echo "docker is already running"
fi
