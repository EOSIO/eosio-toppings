#!/usr/bin/env bash

set -e

RED='\033[0;31m'
NC='\033[0m' # No Color
GREEN='\033[0;32m'

SCRIPTPATH="$( pwd -P )/../.."
EOSDOCKER="$SCRIPTPATH/docker-eosio-nodeos"
MONGODOCKER="$SCRIPTPATH/docker-mongodb"
LOCALSERVICE="$SCRIPTPATH/api-eosio-compiler"
COMPILER="$LOCALSERVICE/docker-eosio-cdt"
GUI="$SCRIPTPATH/ui-gui-nodeos"
ISDEV=false

if [ "$1" == "-dev" -o "$1" == "--develop" ]; then
  ISDEV=true
fi

echo "=============================="
echo "INITIALISING CONFIG IN PACKAGES"
echo "=============================="

# sourcing variable from config file
source ../init_config.file

# copy init config into different packages
cp -f ../init_config.file $EOSDOCKER/config.file.local
cp -f ../init_config.file $EOSDOCKER/scripts/config.file.local
cp -f ../init_config.file $MONGODOCKER/config.file.local
cp -f ../init_config.file $COMPILER/config.file.local
cp -f ../init_config.file $GUI/config.file.local

# print init config and save it as .env.local into different packages
echo "REACT_APP_MONGODB_PORT=$MONGODB_PORT" > $GUI/.env.local
echo "REACT_APP_MONGODB_DB_NAME=$MONGODB_DB_NAME" >> $GUI/.env.local
echo "REACT_APP_LOCAL_SERVICE_PORT=$LOCAL_SERVICE_PORT" >> $GUI/.env.local
echo "REACT_APP_UI_SERVE_PORT=$UI_SERVE_PORT" >> $GUI/.env.local

echo "LOCAL_SERVICE_PORT=$LOCAL_SERVICE_PORT" > $LOCALSERVICE/.env.local

echo "Copying initial config done."
echo " "


echo "=============================="
echo "INSTALLING DEPENDENCIES"
echo "=============================="
yarn install

echo " "
echo "=============================="
echo "BUILDING EOSIO DOCKER"
echo "=============================="
(cd $EOSDOCKER && ./build_eosio_docker.sh && printf "${GREEN}done${NC}")

echo " "
echo "=============================="
echo "BUILDING EOSIO_CDT DOCKER USED BY COMPILER SERVICE"
echo "=============================="
(cd $COMPILER && ./build_eosio_cdt_docker.sh && printf "${GREEN}done${NC}")

# remove existing dockers
./remove_dockers.sh

./quick_start.sh $1 --first-time-setup

P1=$!

# wait $P1
wait $P1
