#!/usr/bin/env bash
# change to script's directory
cd "$(dirname "$0")"
SCRIPTPATH="$( pwd -P )"

# make sure Docker and Node.js is installed
if [ ! -x "$(command -v docker)" ] ||
   [ ! -x "$(command -v npm)" ]; then
  echo ""
  echo -e "\033[0;31m[Error with Exception]\033[0m"
  echo "Please make sure Docker and Node.js are installed"
  echo ""
  echo "Install Docker: https://docs.docker.com/docker-for-mac/install/"
  echo "Install Node.js: https://nodejs.org/en/"
  echo ""
  exit
fi

# build docker image, if necessary
if [[ "$(docker images -q eosio-gui-nodeos-cdt:1.5.0)" == "" ]]; then
  echo "building docker image eosio-gui-nodeos version cdt1.5.0, this may take some time"
  docker build -t eosio-gui-nodeos-cdt:1.5.0 . --no-cache
else
  echo "docker image already exists, skip building"
fi
