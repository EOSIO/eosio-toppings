#!/usr/bin/env bash

RED='\033[0;31m'
NC='\033[0m' # No Color
GREEN='\033[0;32m'

SCRIPTPATH="$( pwd -P )"
GUI="$SCRIPTPATH/packages/ui-gui-nodeos"
COMPILER="$SCRIPTPATH/packages/api-eosio-compiler"

# start compiler service in background
echo " "
echo "=============================="
echo "STARTING COMPILER SERVICE"
echo "=============================="
(cd $COMPILER && yarn start > compiler.log &)

#if [ "$1" == "-b" -o "$1" == "--build" ]; then
  echo " "
  echo "=============================="
  echo "BUILDING GUI"
  echo "=============================="
  sh ./build_gui.sh
#fi

echo " "
echo "=============================="
echo "STARTING GUI"
echo "=============================="
(cd $GUI && yarn serve)
