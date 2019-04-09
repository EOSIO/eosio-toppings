#!/usr/bin/env bash

NC='\033[0m' # No Color
GREEN='\033[0;32m'

echo " "
echo "=============================="
echo "PAUSING EOSIO DOCKER"
echo "=============================="
# Checks if the Docker container is already running. If it is, then compile the contract as normal.
if [ "$(docker ps -q -f name=eosio_gui_nodeos_container)" ]; then
    if [ "$(docker ps -aq -f status=running -f name=eosio_gui_nodeos_container)" ]; then
        echo "blockchain container is running, pausing the container"
        docker pause eosio_gui_nodeos_container
        printf "${GREEN}done${NC}"
    else
        echo "eosio docker is not running"
    fi
else
    echo "eosio docker is not running"
fi


echo " "
echo "=============================="
echo "PAUSING MONGODB DOCKER"
echo "=============================="
# Checks if the Docker container is already running. If it is, then compile the contract as normal.
if [ "$(docker ps -aq -f name=eosio-mongodb)" ]; then
    if [ "$(docker ps -aq -f status=running -f name=eosio-mongodb)" ]; then
        echo "mongodb container is running, pausing the container"
        docker pause eosio-mongodb
        printf "${GREEN}done${NC}"
    else 
        echo "mongodb docker is not running"
    fi
else
     echo "mongodb docker is not running"
fi






