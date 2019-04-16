#!/usr/bin/env bash

script="./serve-docker.sh"

echo " "
echo "=============================="
echo "STARTING GUI DOCKER"
echo "=============================="

if [ "$1" == "-s" -o "$1" == "--stop" ]; then
  echo "stopping nodeos-gui docker"
  docker stop nodeos-gui 
fi

if [ ! "$(docker ps -q -f name=nodeos-gui)" ]; then
  docker run --rm --name nodeos-gui \
    --link eosio-mongodb \
    --link eosio_gui_nodeos_container \
    -p 5000:5000 \
    -i eosio/nodeos-gui \
    "$script"
else
  echo "nodeos-gui docker already running"
fi
