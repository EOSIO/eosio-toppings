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