#!/usr/bin/env bash

ROOTPATH="../../.."
SCRIPTPATH="$( pwd -P )"
if find "$ROOTPATH/packages/ui-gui-nodeos" -mindepth 1 -print -quit 2>/dev/null | grep -q .; then
  SCRIPTPATH=$ROOTPATH
fi

echo " "
echo "=============================="
echo "STARTING GUI"
echo "=============================="
(cd $SCRIPTPATH/packages/ui-gui-nodeos && yarn start)