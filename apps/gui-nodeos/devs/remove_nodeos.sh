ROOTPATH="../../.."
SCRIPTPATH="$( pwd -P )"
if find "$ROOTPATH/packages/docker-eosio-nodeos" -mindepth 1 -print -quit 2>/dev/null | grep -q .; then
  SCRIPTPATH=$ROOTPATH
fi

echo " "
echo "=============================="
echo "CLEANING NODEOS"
echo "=============================="
(cd $SCRIPTPATH/packages/docker-eosio-nodeos && ./remove_eosio_docker.sh)