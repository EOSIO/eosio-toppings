#!/usr/bin/env bash
set -o errexit

CONTRACTFILE=$(basename -- "$1")
EXTENSION="${CONTRACTFILE##*.}"
CONTRACTNAME="${CONTRACTFILE%.*}"
FULLFILEPATH=$1

# Verify everything is clean and setup properly
echo "building eosio cdt docker"
./build_eosio_cdt_docker.sh

# Checks if the Docker container is already running. If it is, then compile the contract as normal.
if [ "$(docker ps -q -f name=eosio_gui_nodeos_cdt_container)" ]; then
    if [ "$(docker ps -aq -f status=running -f name=eosio_gui_nodeos_cdt_container)" ]; then
        echo "eosio cdt docker is currently running"
    fi
fi

# If the Docker container is not running, then spin it up and compile.
# We can leave it running and destroy it later on.
if [ ! "$(docker ps -q -f name=eosio_gui_nodeos_cdt_container)" ]; then
    if [ "$(docker ps -aq -f status=exited -f name=eosio_gui_nodeos_cdt_container)" ]; then
        # Guard against exited container that somehow still exists in docker ps listing.
        # Cleanup.
        echo "cleaning eosio cdt docker"
        docker rm -fv eosio_gui_nodeos_cdt_container
    fi
    echo "cleaning compiled contracts cache"
    # clean out the previous compiled contracts
    rm -rf compiled_contracts
    mkdir compiled_contracts

    ./start_eosio_cdt_docker.sh

    echo "starting compilation of smart contract"
    shift 1
    echo "$@"
    docker exec -i eosio_gui_nodeos_cdt_container ./scripts/compile_contract.sh "$FULLFILEPATH" "$@" \
        > stdout.txt 2> stderr.txt \
        && echo "compilation successful" || echo "compilation failed"

    echo "check log.txt for piped file"

    echo "copying compiled smart contract"
    docker cp eosio_gui_nodeos_cdt_container:/opt/eosio/bin/compiled_contracts/$CONTRACTNAME "$(pwd)"/compiled_contracts
fi

