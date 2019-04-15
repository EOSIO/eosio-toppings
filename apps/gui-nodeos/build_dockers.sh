#!/usr/bin/env bash
set -o errexit

NC='\033[0m' # No Color
GREEN='\033[0;32m'

EXECPATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOTPATH="../.."
SCRIPTPATH="$( pwd -P )"
if find "$ROOTPATH/packages/docker-eosio-nodeos" -mindepth 1 -print -quit 2>/dev/null | grep -q .; then
  SCRIPTPATH="../.."
fi

echo " "
echo "=============================="
echo "BUILDING EOSIO DOCKER"
echo "=============================="
(cd ${SCRIPTPATH}/packages/ && exec docker-eosio-nodeos/build_eosio_docker.sh && printf "${GREEN}done${NC}")

echo " "
echo "=============================="
echo "BUILDING EOSIO CDT DOCKER"
echo "=============================="
(cd ${SCRIPTPATH}/packages/ && exec api-eosio-compiler/docker-eosio-cdt/build_eosio_cdt_docker.sh && printf "${GREEN}done${NC}")
