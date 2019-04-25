#!/usr/bin/env bash

set -o errexit

RED='\033[0;31m'
NC='\033[0m' # No Color
GREEN='\033[0;32m'

SCRIPTPATH="$( pwd -P )/../.."
GUI="$SCRIPTPATH/ui-gui-nodeos"
ISDEV=false
CLEARBROWSERSTORAGE=false

# sourcing variable from config file
source ../config.file

# override config if there are any local config changes
if [ -f "../config.file.local" ]; then
  source ../config.file.local
fi

# check for arguments
for arg in $@
do
    case $arg in
      -dev|--develop)
        ISDEV=true
        ;;
      --clear-browser-storage)
        CLEARBROWSERSTORAGE=true
        ;;
  esac
done

echo " "
echo "=============================="
echo "STARTING GUI"
echo "=============================="
if $ISDEV; then
  if $CLEARBROWSERSTORAGE; then
    # Set environment variable "LAST_FIRST_TIME_SETUP_TIMESTAMP" at dev build to create a new timestamp in CRA development
    (cd $GUI && REACT_APP_LAST_FIRST_TIME_SETUP_TIMESTAMP=$(date +%s) PORT=$UI_DEV_PORT yarn start)
  else
    (cd $GUI && PORT=$UI_DEV_PORT yarn start)
  fi
else
  (cd $GUI && yarn serve)
fi
