#!/usr/bin/env bash
set -o errexit

ROOTPATH="../.."
SCRIPTPATH="$( pwd -P )"
if find "$ROOTPATH/packages/docker-eosio-nodeos" -mindepth 1 -print -quit 2>/dev/null | grep -q .; then
  SCRIPTPATH="../.."
fi

echo " "
echo "=============================="
echo "CLEANING BLOCKCHAIN DATA AND RESTARTING"
echo "=============================="
echo "Checking if nodeos container is running"
if [ "$(docker ps -q -f name=eosio_gui_nodeos_container)" ]; then
    if [ "$(docker ps -aq -f status=running -f name=eosio_gui_nodeos_container)" ]; then
        echo "blockchain container is running, stopping the container"
        docker stop eosio_gui_nodeos_container
    fi
fi

echo "reinitializing nodeos"
(cd ${SCRIPTPATH}/packages/ && exec docker-eosio-nodeos/start_eosio_docker.sh)

echo "reinitializing mongodb"
(cd ${SCRIPTPATH}/packages/ && exec docker-mongodb/remove_mongodb_docker.sh && exec docker-mongodb/start_mongodb_docker.sh)
