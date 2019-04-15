#!/usr/bin/env bash

NC='\033[0m' # No Color
GREEN='\033[0;32m'

ROOTPATH="../../.."
SCRIPTPATH="$( pwd -P )"
if find "$ROOTPATH/packages/docker-eosio-nodeos" -mindepth 1 -print -quit 2>/dev/null | grep -q .; then
  SCRIPTPATH=$ROOTPATH
fi

echo " "
echo "=============================="
echo "STARTING NODEOS"
echo "=============================="
(cd $SCRIPTPATH/packages/docker-eosio-nodeos && ./start_eosio_docker.sh --nolog)
printf "${GREEN}done${NC}"
