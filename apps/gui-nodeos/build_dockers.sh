#!/usr/bin/env bash
set -o errexit

EXECPATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOTPATH="../.."
SCRIPTPATH="$( pwd -P )"
if find "$ROOTPATH/packages/docker-eosio-nodeos" -mindepth 1 -print -quit 2>/dev/null | grep -q .; then
  SCRIPTPATH="../.."
fi

echo "please run this only for first time setup"

echo "building eosio docker"
(cd ${SCRIPTPATH}/packages/ && exec docker-eosio-nodeos/build_eosio_docker.sh)

echo "building eosio cdt docker"
(cd ${SCRIPTPATH}/packages/ && exec api-eosio-compiler/docker-eosio-cdt/build_eosio_cdt_docker.sh)

echo "build finished"