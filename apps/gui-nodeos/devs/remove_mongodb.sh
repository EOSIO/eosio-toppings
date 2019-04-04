#!/usr/bin/env bash

ROOTPATH="../../.."
SCRIPTPATH="$( pwd -P )"
if find "$ROOTPATH/packages/docker-mongodb" -mindepth 1 -print -quit 2>/dev/null | grep -q .; then
  SCRIPTPATH=$ROOTPATH
fi

echo " "
echo "=============================="
echo "CLEANING MONGODB"
echo "=============================="
(cd $SCRIPTPATH/packages/docker-mongodb && ./remove_mongodb_docker.sh)