<p align="center">
  <img width="200" height="200" src="./public/eos_spinning_logo.gif" alt="EOSIO Logo">
</p>

<h1 align="center">EOSIO Toppings</h1>

<p align="center">
  <img alt="EOSIO Labs badge" src="https://img.shields.io/badge/EOSIO-Labs-5cb3ff.svg">
</p>

This is a monorepo composed of the various packages which work together to create a web-based development tool to help users create applications on the EOSIO blockchain. Users will be able to perform various actions related to smart contract and application development using this tool.

## Overview

EOSIO Toppings is a monorepo which consists of the various services and tools needed for the [EOSIO Explorer](https://github.com/EOSIO/eosio-explorer) to run properly. In order to decouple the tool from the reusable parts of the system, the monorepo was created. This also allows the possibility of development work to take place on many parts of the tool system concurrently and makes it easier for users interested in contributing to find out how the entire toolchain works. 

The monorepo contains two categories of packages:

1. :zap: API Services - Services which directly interface with the EOSIO Blockchain, either with the RPC API or through a data store
2. :computer: Docker-based Services - Responsible for Docker containers which independently run instances of services which the EOSIO Explorer interfaces with

### About EOSIO Labs

 EOSIO Labs repositories are experimental.  Developers in the community are encouraged to use EOSIO Labs repositories as the basis for code and concepts to incorporate into their applications. Community members are also welcome to contribute and further develop these repositories. Since these repositories are not supported by Block.one, we may not provide responses to issue reports, pull requests, updates to functionality, or other requests from the community, and we encourage the community to take responsibility for these.

### Package Index

* API Services:
    * [EOSIO Compiler / Deployment Service <img alt="NPM Version" src="https://img.shields.io/npm/v/EOSIO/api-eosio-compiler.svg">](./packages/api-eosio-compiler): Node.JS/Express API server for compiling and deploying smart contracts to a `nodeos` instance. Spins up a Docker container under the hood for contract compilation.
    * [MongoDB Plugin API <img alt="NPM Version" src="https://img.shields.io/npm/v/EOSIO/api-mongodb-plugin.svg">](./packages/api-mongodb-plugin): TypeScript API service for interacting with the blockchain MongoDB (`nodeos` run with the MongoDB plugin)
    * [RPC API <img alt="NPM Version" src="https://img.shields.io/npm/v/EOSIO/api-rpc.svg">](./packages/api-rpc): TypeScript API service wrapper around the EOSIO RPC API
* Docker-based Services:
    * [EOSIO nodeos Docker Container <img alt="NPM Version" src="https://img.shields.io/npm/v/EOSIO/docker-eosio-nodeos.svg">](./packages/docker-eosio-nodeos): Dockerfile and build scripts for the Docker container running a local `nodeos` instance
    * [MongoDB Docker Container <img alt="NPM Version" src="https://img.shields.io/npm/v/EOSIO/docker-mongodb.svg">](./packages/docker-mongodb): Dockerfile and build scripts for the Docker container running a local MongoDB service

### Platform Support

* Amazon Linux 2
* CentOS 7
* Ubuntu 16.04
* Ubuntu 18.04
* MacOS 10.14 (Mojave) 

### Required Tools

* [Yarn](https://yarnpkg.com/lang/en/) with support at `^1.15.2` (latest stable)
* [Docker](https://www.docker.com/) with support at Docker Engine `18.09.2` (latest stable)
* [Node.JS](https://nodejs.org/en/) with support at `^10.15.3` LTS (latest stable)

## Installation

```bash
git clone https://github.com/EOSIO/eosio-toppings.git
yarn install
```

### Default Ports

The following ports need to be opened in your local machine by default:

* `3000` [ UI - Create react app dev service ( only used for development of this tools)]
* `5111` [ UI - Frontend app service ]
* `8081` [ EOSIO compiler/deployment service ]
* `8888` [ Nodeos RPC Api service ] ( not configurable in config file )
* `9876` [ Nodeos Net Plugin service ] ( not configurable in config file )
* `27788` [ MongoDB Api service ]

## License

[MIT](./LICENSE)

## Important

See LICENSE for copyright and license terms.  Block.one makes its contribution on a voluntary basis as a member of the EOSIO community and is not responsible for ensuring the overall performance of the software or any related applications.  We make no representation, warranty, guarantee or undertaking in respect of the software or any related documentation, whether expressed or implied, including but not limited to the warranties or merchantability, fitness for a particular purpose and noninfringement. In no event shall we be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or documentation or the use or other dealings in the software or documentation.  Any test results or performance figures are indicative and will not reflect performance under all conditions.  Any reference to any third party or third-party product, service or other resource is not an endorsement or recommendation by Block.one.  We are not responsible, and disclaim any and all responsibility and liability, for your use of or reliance on any of these resources. Third-party resources may be updated, changed or terminated at any time, so the information here may be out of date or inaccurate.
