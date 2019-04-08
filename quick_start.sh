#!/usr/bin/env bash

RED='\033[0;31m'
NC='\033[0m' # No Color
GREEN='\033[0;32m'

SCRIPTPATH="$( pwd -P )"

EOSDOCKER="$SCRIPTPATH/packages/docker-eosio-nodeos"
MONGODOCKER="$SCRIPTPATH/packages/docker-mongodb"
COMPILER="$SCRIPTPATH/packages/api-eosio-compiler"
GUI="$SCRIPTPATH/packages/ui-gui-nodeos"
APPS="$SCRIPTPATH/apps/gui-nodeos"

if [ "$1" == "-d" -o "$1" == "--delete" ]; then
  (cd $APPS && ./remove_dockers.sh)
fi

echo " "
echo "=============================="
echo "STARTING MONGODB DOCKER"
echo "=============================="
if [ "$(docker ps -q -f status=paused -f name=eosio-mongodb)" ]; then
  echo 'resuming mongodb docker'
  docker unpause eosio-mongodb
  (printf "${GREEN}done${NC}")
else
  (cd $MONGODOCKER && ./start_mongodb_docker.sh && printf "${GREEN}done${NC}")
fi

echo " "
echo "=============================="
echo "STARTING EOSIO DOCKER"
echo "=============================="
if [ "$(docker ps -q -f status=paused -f name=eosio_gui_nodeos_container)" ]; then
  echo 'resuming eosio docker'
  docker unpause eosio_gui_nodeos_container
  (printf "${GREEN}done${NC}")
else
  if [ ! "$(docker ps -q -f name=eosio_gui_nodeos_container)" ]; then
    if find "$EOSDOCKER/data" -mindepth 1 -print -quit 2>/dev/null | grep -q .; then
        echo "eosio docker is not running, but data folder exists"
        echo "cleaning data now"
        rm -r $EOSDOCKER/data/*
        sleep 10 #else docker fails  sometimes
    fi
  fi
  echo " "
  (cd $EOSDOCKER && ./start_eosio_docker.sh --nolog && printf "${GREEN}done${NC}")
fi

# start compiler service in background
echo " "
echo "=============================="
echo "STARTING COMPILER SERVICE"
echo "=============================="
(cd $COMPILER && yarn start > compiler.log &)
(printf "${GREEN}done${NC}")
echo " "

# wait until eosio blockchain to be started
waitcounter=0
until $(curl --output /dev/null \
             --silent \
             --head \
             --fail \
             localhost:8888/v1/chain/get_info)
do
  if [[ "$waitcounter" -lt 6 ]]; then
    echo " "
    echo "$((waitcounter+1)) - Waiting for dockers to be started..."
    sleep 10s
    waitcounter=$((waitcounter+1))
  else
    echo " "
    echo "problem starting docker, removing dockers and restarting"
    ./remove_dockers.sh
    echo " "
    ./quick_start.sh
    exit 0
  fi
done

echo " "
echo "=============================="
echo "STARTING GUI"
echo "=============================="
(cd $GUI && yarn start)

P1=$!

# wait $P1
wait $P1
