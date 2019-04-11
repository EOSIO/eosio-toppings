#!/usr/bin/env bash

script="./serve-docker.sh -b"

if [ "$1" == "-s" -o "$1" == "--stop" ]; then
  echo "stopping nodeos-gui docker"
  docker stop nodeos-gui 
fi

if [ ! "$(docker ps -q -f name=nodeos-gui)" ]; then
  echo "starting docker"
  docker run --rm --name nodeos-gui \
    --link eosio-mongodb \
    --link eosio_gui_nodeos_container \
    -p 5000:5000 \
    -i eosio/nodeos-gui \
    /bin/bash -c "$script"
else
  echo "nodeos-gui docker already running"
fi
