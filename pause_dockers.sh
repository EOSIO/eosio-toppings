#!/usr/bin/env bash

echo " "
echo "=============================="
echo "PAUSING EOSIO DOCKER"
echo "=============================="
# Checks if the Docker container is already running. If it is, then compile the contract as normal.
if [ "$(docker ps -q -f name=eosio_gui_nodeos_container)" ]; then
    if [ "$(docker ps -aq -f status=running -f name=eosio_gui_nodeos_container)" ]; then
        echo "Blockchain container is running, stopping the operation"
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
        echo "MongoDB container is running, stopping the operation"
        docker pause eosio-mongodb
    else 
        echo "MongoDB container not running"
    fi
fi

echo " "
echo "=============================="
echo "PAUSING NODEOS GUI DOCKER"
echo "=============================="
# Checks if the Docker container is already running. If it is, then compile the contract as normal.
if [ "$(docker ps -aq -f name=eosio-nodeos)" ]; then
    if [ "$(docker ps -aq -f status=running -f name=eosio-nodeos)" ]; then
        echo "nodeos gui container is running, stopping the operation"
        docker pause eosio-nodeos
    else 
        echo "nodeos gui container not running"
    fi
fi
