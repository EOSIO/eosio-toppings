#!/usr/bin/env bash

RED='\033[0;31m'
NC='\033[0m' # No Color
GREEN='\033[0;32m'

SCRIPTPATH="$( pwd -P )"
GUI="$SCRIPTPATH/packages/ui-gui-nodeos"
COMPILER="$SCRIPTPATH/packages/api-eosio-compiler"


echo " "
echo "=============================="
echo "BUILDING GUI"
echo "=============================="
sh ./build_gui.sh

echo " "
echo "=============================="
echo "STARTING GUI"
echo "=============================="
sh ./start_gui.sh
