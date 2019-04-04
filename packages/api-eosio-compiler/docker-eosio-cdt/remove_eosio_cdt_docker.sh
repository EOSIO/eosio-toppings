#!/usr/bin/env bash
set -o errexit

echo "removing eosio cdt docker"
docker rm -fv eosio_gui_nodeos_cdt_container
