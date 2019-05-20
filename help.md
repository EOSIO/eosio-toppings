# EOSIO Labs™: EOSIO Toppings

A monorepo with tools working on top of nodeos

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Make sure you have installed all of the following prerequisites on your development machine:
* Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* Yarn - [Download & Install Yarn](https://yarnpkg.com/lang/en/docs/install/)
* Docker - [Download & Install Docker](https://download.docker.com/)
* Typescript - [Download & Install typescript](https://www.typescriptlang.org/#download-links)

### Cloning The GitHub Repository
The recommended way to get eosio-toppings is to use git to directly clone the eosio-toppings repository:

```bash
$ git clone https://github.com/EOSIO/eosio-toppings/ eosio-toppings
```

This will clone the latest version of the eosio-toppings repository to a **eosio-toppings** folder.

### Downloading The Repository Zip File
Another way to use the eosio-toppings is to download a zip copy from the [master branch on GitHub](https://github.com/EOSIO/eosio-toppings/archive/master.zip). You can also do this using the `wget` command:

```bash
$ wget https://github.com/EOSIO/eosio-toppings/archive/master.zip -O eosio-toppings.zip; unzip eosio-toppings.zip; rm eosio-toppings.zip
```


## Project structure
```bash
eosio-toppings # project directory
├── LICENSE
├── README.md
├── help.md
├── lerna.json
├── package.json
├── packages # Each folder in packages reperesent a service runs on top of EOSIO blockchain or as a helper for other services in this same folde
│   ├── README.md
│   ├── api-eosio-compiler # Service to compile and deploy contract
│   │   ├── README.md
│   │   ├── compiler.log
│   │   ├── docker-eosio-cdt
│   │   │   ├── Dockerfile
│   │   │   ├── build_eosio_cdt_docker.sh
│   │   │   ├── contracts
│   │   │   │   └── hiworld.cpp
│   │   │   ├── error.txt
│   │   │   ├── remove_eosio_cdt_docker.sh
│   │   │   ├── scripts
│   │   │   │   └── compile_contract.sh
│   │   │   ├── setup_eosio_cdt_docker.sh
│   │   │   ├── start_eosio_cdt_docker.sh
│   │   │   ├── stderr.txt
│   │   │   └── stdout.txt
│   │   ├── helpers.js
│   │   ├── local-service.js
│   │   ├── package.json
│   │   └── service-logic.js
│   ├── api-mongodb-plugin # APIs to fetch details from MongoDB
│   │   ├── README.md
│   │   ├── package.json
│   │   ├── src
│   │   │   ├── api
│   │   │   │   ├── get_abi.ts
│   │   │   │   ├── get_account_details.ts
│   │   │   │   ├── get_action_details.ts
│   │   │   │   ├── get_actions.ts
│   │   │   │   ├── get_all_permissions.ts
│   │   │   │   ├── get_block_details.ts
│   │   │   │   ├── get_blocks.ts
│   │   │   │   ├── get_transaction_details.ts
│   │   │   │   ├── get_transactions.ts
│   │   │   │   └── index.ts
│   │   │   ├── config
│   │   │   │   └── mongo.ts
│   │   │   ├── index.ts
│   │   │   ├── models
│   │   │   │   ├── account.ts
│   │   │   │   ├── account_details.ts
│   │   │   │   ├── actions.ts
│   │   │   │   ├── block.ts
│   │   │   │   ├── permissions.ts
│   │   │   │   ├── transaction_traces.ts
│   │   │   │   └── transactions.ts
│   │   │   └── run.ts
│   │   └── tsconfig.json
│   ├── api-rpc # APIs to fetch details from EOSIO blockchain
│   │   ├── README.md
│   │   ├── package.json
│   │   ├── src
│   │   │   ├── api
│   │   │   │   ├── create_account.ts
│   │   │   │   ├── get_account_details.ts
│   │   │   │   ├── get_info.ts
│   │   │   │   ├── get_table_rows.ts
│   │   │   │   └── push_action.ts
│   │   │   └── index.ts
│   │   └── tsconfig.json
│   ├── *docker-eosio-nodeos # EOSIO docker
│   │   ├── Dockerfile
│   │   ├── README.md
│   │   ├── build_eosio_docker.sh
│   │   ├── contracts # dummy contracts
│   │   │   ├── byeworld
│   │   │   │   ├── byeworld.abi
│   │   │   │   ├── byeworld.cpp
│   │   │   │   └── byeworld.wasm
│   │   │   ├── helloworld
│   │   │   │   └── helloworld.cpp
│   │   │   ├── hiworld
│   │   │   │   ├── hiworld.abi
│   │   │   │   ├── hiworld.cpp
│   │   │   │   └── hiworld.wasm
│   │   │   ├── tataworld
│   │   │   │   ├── tataworld.abi
│   │   │   │   ├── tataworld.cpp
│   │   │   │   └── tataworld.wasm
│   │   │   └── testnote
│   │   │       └── testnote.cpp
│   │   ├── remove_eosio_docker.sh # remove eosio docker and its content
│   │   ├── scripts # Scripts for docker containers
│   │   │   ├── accounts.json # list of sample account
│   │   │   ├── continue_blockchain.sh # resume blockchain
│   │   │   ├── create_accounts.sh # create dummy accounts
│   │   │   ├── deploy_contract.sh # deploy contract
│   │   │   └── init_blockchain.sh # initialize blockchain
│   │   └── start_eosio_docker.sh # start eosio docker
│   ├── *docker-mongodb # Mongodb Docker
│   │   ├── README.md
│   │   ├── remove_mongodb_docker.sh
│   │   └── start_mongodb_docker.sh
└── yarn.lock

* means the directory will be mounted to the docker container. Whenever the file changes on the local machine, it will be automatically reflected in the docker environment.
```

## Contributing

Interested in contributing? That's awesome! Please view the following links for more information on contributing to the project.

[Contribution Guidelines](./CONTRIBUTING.md)

## License

[MIT](./LICENSE)

## Important

See LICENSE for copyright and license terms.  Block.one makes its contribution on a voluntary basis as a member of the EOSIO community and is not responsible for ensuring the overall performance of the software or any related applications.  We make no representation, warranty, guarantee or undertaking in respect of the software or any related documentation, whether expressed or implied, including but not limited to the warranties or merchantability, fitness for a particular purpose and noninfringement. In no event shall we be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or documentation or the use or other dealings in the software or documentation.  Any test results or performance figures are indicative and will not reflect performance under all conditions.  Any reference to any third party or third-party product, service or other resource is not an endorsement or recommendation by Block.one.  We are not responsible, and disclaim any and all responsibility and liability, for your use of or reliance on any of these resources. Third-party resources may be updated, changed or terminated at any time, so the information here may be out of date or inaccurate.
