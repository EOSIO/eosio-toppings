#!/usr/bin/env bash
set -o errexit

ROOTPATH="../.."
SCRIPTPATH="$( pwd -P )"
if find "$ROOTPATH/packages/docker-eosio-nodeos" -mindepth 1 -print -quit 2>/dev/null | grep -q .; then
  SCRIPTPATH="../.."
fi

echo " "
echo "=============================="
echo "STARTING MONGODB DOCKER"
echo "=============================="
(cd ${SCRIPTPATH}/packages/ && exec docker-mongodb/start_mongodb_docker.sh)

echo " "
echo "=============================="
echo "STARTING EOSIO DOCKER"
echo "=============================="
(cd ${SCRIPTPATH}/packages/ && exec docker-eosio-nodeos/start_eosio_docker.sh)
