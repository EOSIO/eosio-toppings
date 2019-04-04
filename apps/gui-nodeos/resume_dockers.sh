#!/usr/bin/env bash
set -o errexit

NC='\033[0m' # No Color
GREEN='\033[0;32m'

ROOTPATH="../.."
SCRIPTPATH="$( pwd -P )"
if find "$ROOTPATH/packages/docker-eosio-nodeos" -mindepth 1 -print -quit 2>/dev/null | grep -q .; then
  SCRIPTPATH="../.."
fi

EOSDOCKER="$SCRIPTPATH/packages/docker-eosio-nodeos"

echo " "
echo "=============================="
echo "RESUMING MONGODB DOCKER"
echo "=============================="
if [ "$(docker ps -q -f name=eosio-mongodb)" ]; then
    if [ "$(docker ps -aq -f status=running -f name=eosio-mongodb)" ]; then
        echo "mongodb container is already running"
    else 
        if [ "$(docker ps -aq -f status=paused -f name=eosio-mongodb)" ]; then
            echo "resuming paused mongodb container"
            docker unpause eosio-mongodb
        fi
    fi
else
    echo "mongodb container not found, restarting it instead "
    (cd ${SCRIPTPATH}/packages/ && exec docker-mongodb/start_mongodb_docker.sh && printf "${GREEN}restarted${NC}")
fi

echo " "
echo "=============================="
echo "RESUMING EOSIO DOCKER"
echo "=============================="
if [ "$(docker ps -q -f name=eosio_gui_nodeos_container)" ]; then
    if [ "$(docker ps -aq -f status=running -f name=eosio_gui_nodeos_container)" ]; then
        echo "blockchain container is already running"
    else 
        if [ "$(docker ps -aq -f status=paused -f name=eosio_gui_nodeos_container)" ]; then
            echo "resuming paused blockchain container"
            docker unpause eosio_gui_nodeos_container
        fi
    fi
else
    if find "$EOSDOCKER/data" -mindepth 1 -print -quit 2>/dev/null | grep -q .; then
        echo "blockchain container is not running, but old data folder exists "
        echo "cleaning it up"
        rm -r ${SCRIPTPATH}/packages/docker-eosio-nodeos/data/*
        sleep 10 #else docker fails  sometimes
    fi
    echo "blockchain container not found, restarting it instead"
    (cd ${SCRIPTPATH}/packages/ && exec docker-eosio-nodeos/start_eosio_docker.sh && printf "${GREEN}Restarted${NC}")
fi
