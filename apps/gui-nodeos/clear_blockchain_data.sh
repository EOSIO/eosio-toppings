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
echo "CLEANING BLOCKCHAIN DATA"
echo "=============================="
echo "checking if nodeos container is running"
if [ "$(docker ps -q -f name=eosio_gui_nodeos_container)" ]; then
    if [ "$(docker ps -aq -f status=running -f name=eosio_gui_nodeos_container)" ]; then
        echo "stopping the container"
        docker stop eosio_gui_nodeos_container && cd $EOSDOCKER &&  rm -r data/*
        printf "${GREEN}done${NC}"
    fi
else
    echo "container is not running"
fi
if [ "$(docker ps -q -f name=eosio-mongodb)" ]; then
    echo " "
    echo "Note: mongdodb docker is still running"
fi