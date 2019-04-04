#!/usr/bin/env bash

NC='\033[0m' # No Color
GREEN='\033[0;32m'

ROOTPATH="../../.."
SCRIPTPATH="$( pwd -P )"
if find "$ROOTPATH/packages/docker-mongodb" -mindepth 1 -print -quit 2>/dev/null | grep -q .; then
  SCRIPTPATH=$ROOTPATH
fi

echo " "
echo "=============================="
echo "STARTING MONGODB"
echo "=============================="
(cd $SCRIPTPATH/packages/docker-mongodb && ./start_mongodb_docker.sh)
printf "${GREEN}done${NC}"