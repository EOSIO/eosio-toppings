#!/usr/bin/env bash

echo " "
echo "=============================="
echo "PAUSING EOSIO DOCKER"
echo "=============================="
# Checks if the Docker container is already running. If it is, then compile the contract as normal.
if [ "$(docker ps -q -f name=eosio_gui_nodeos_container)" ]; then
    if [ "$(docker ps -aq -f status=running -f name=eosio_gui_nodeos_container)" ]; then
        echo "blockchain container is running, stopping the container"
        docker pause eosio_gui_nodeos_container
    else
        echo "Blockchain container not running"
    fi
fi


echo " "
echo "=============================="
echo "PAUSING MONGODB DOCKER"
echo "=============================="
# Checks if the Docker container is already running. If it is, then compile the contract as normal.
if [ "$(docker ps -aq -f name=eosio-mongodb)" ]; then
    if [ "$(docker ps -aq -f status=running -f name=eosio-mongodb)" ]; then
        echo "mongodb container is running, stopping the container"
        docker pause eosio-mongodb
    else 
        echo "mongodb container not running"
    fi
fi






