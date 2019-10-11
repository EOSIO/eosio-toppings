# docker-ship <a href="https://www.npmjs.com/package/@eosio-toppings/docker-ship"><img alt="NPM Version" src="https://img.shields.io/npm/v/@eosio-toppings/docker-ship.svg"></a>
`docker-ship` is responsible for creating a 2 docker containers: one that runs a PostgresDB service and the other one runs history-tools(fill-pg) (https://github.com/EOSIO/history-tools)repository to fill PostgresDB by listening to SHiP plugin.

`eosio-postgres-container` is started using official postgres image.
`eosio-nodeos-ship` container is started using the eosio/explorer:fill-pg-1.1 image hosted in docker hub

* Run `build_ship_docker.sh` script file to pull the image from docker hub to your local machine
* Run `start_ship_docker.sh` script to start the docker containers
* Run `remove_ship_docker.sh` script if you wish to stop and remove docker containers and clean up the PostgresDB data
