# Changelog

## api-eosio-compiler v0.3.7 (2019-07-16)

#### Bug Fix
* `api-eosio-compiler`
  * [#97](https://github.com/EOSIO/eosio-toppings/pull/97) Roll back changes from erroneous release ([@jcardenas9x](https://github.com/jcardenas9x))
* `api-eosio-compiler`
  * [#98](https://github.com/EOSIO/eosio-toppings/pull/98) Follow up from #97 ([@jcardenas9x](https://github.com/jcardenas9x))

#### Committers: 1
- Jonathan Cardenas ([@jcardenas9x](https://github.com/jcardenas9x))

## api-eosio-compiler v0.3.6 (2019-07-16)

#### Bug Fix
* `api-eosio-compiler`
  * [#96](https://github.com/EOSIO/eosio-toppings/pull/96) Fixed ricardian contracts not properly importing ([@jcardenas9x](https://github.com/jcardenas9x))

#### Committers: 1
- Jonathan Cardenas ([@jcardenas9x](https://github.com/jcardenas9x))

## docker-eosio-nodeos v0.3.6 (2019-07-16)

#### Update
* `docker-eosio-nodeos`
  * Reverted back to using fixed genesis block for local test blockchain.

#### Committers: 1
- [@varshajnagaraja](https://github.com/varshajnagaraja)

## api-eosio-compiler, docker-eosio-nodeos v0.3.5 (2019-07-15)

#### Enhancement
* `api-eosio-compiler`, `docker-eosio-nodeos`
  * [#95](https://github.com/EOSIO/eosio-toppings/pull/95) Bump up eosio.cdt version from 1.6.1 to 1.6.2 ([@jcardenas9x](https://github.com/jcardenas9x))

#### Committers: 1
- Jonathan Cardenas ([@jcardenas9x](https://github.com/jcardenas9x))

## docker-eosio-nodeos v0.3.4 (2019-07-10)

#### Enhancement
* `docker-eosio-nodeos`
  * [#92](https://github.com/EOSIO/eosio-toppings/pull/92) update eos to 1.8.1 ([@matharuajay](https://github.com/matharuajay))

#### Committers: 1
- Ajay Matharu ([@matharuajay](https://github.com/matharuajay))

## docker-eosio-nodeos v0.3.3 (2019-07-05)

#### Enhancement
* `docker-eosio-nodeos`
  * [#91](https://github.com/EOSIO/eosio-toppings/pull/91) Upgrade eos version to 1.8 ([@varshajnagaraja](https://github.com/varshajnagaraja))

#### Committers: 1
- [@varshajnagaraja](https://github.com/varshajnagaraja)


## api-rpc, docker-eosio-nodeos, api-mongodb-plugin v0.3.2-alpha.0 (2019-06-27)

#### Enhancement
* `api-rpc`, `docker-eosio-nodeos`
  * [#89](https://github.com/EOSIO/eosio-toppings/pull/89) Update api-rpc updateAuth to accept any permissions ([@varshajnagaraja](https://github.com/varshajnagaraja))
* `docker-eosio-nodeos`
  * [#88](https://github.com/EOSIO/eosio-toppings/pull/88) push eosio account in MongoDB ([@varshajnagaraja](https://github.com/varshajnagaraja))
* `api-mongodb-plugin`
  * [#86](https://github.com/EOSIO/eosio-toppings/pull/86) Add extra columns in get_actions and get_transactions api ([@varshajnagaraja](https://github.com/varshajnagaraja))
  * [#85](https://github.com/EOSIO/eosio-toppings/pull/85) Fogbugz 3434 - Update timestamp colums ([@matharuajay](https://github.com/matharuajay))

#### Committers: 2
- Ajay Matharu ([@matharuajay](https://github.com/matharuajay))
- [@varshajnagaraja](https://github.com/varshajnagaraja)

## All packages v0.3.1-alpha.0 (2019-05-24)

#### Enhancement
* `api-eosio-compiler`, `api-mongodb-plugin`, `api-rpc`, `docker-eosio-nodeos`, `docker-mongodb`
  * [#84](https://github.com/EOSIO/eosio-toppings/pull/84) Tidying up files for publishing to npm ([@terrylks](https://github.com/terrylks))
* `docker-eosio-nodeos`, `docker-mongodb`
  * [#83](https://github.com/EOSIO/eosio-toppings/pull/83) Fogbugz 3442 - Handle docker volumes after restart  ([@matharuajay](https://github.com/matharuajay))

#### Bug Fix
* `docker-eosio-nodeos`, `docker-mongodb`
  * [#83](https://github.com/EOSIO/eosio-toppings/pull/83) Fogbugz 3442 - Handle docker volumes after restart  ([@matharuajay](https://github.com/matharuajay))

#### Documentation
* `api-eosio-compiler`, `api-mongodb-plugin`, `api-rpc`, `docker-eosio-nodeos`, `docker-mongodb`
  * [#84](https://github.com/EOSIO/eosio-toppings/pull/84) Tidying up files for publishing to npm ([@terrylks](https://github.com/terrylks))

#### Committers: 2
- Ajay Matharu ([@matharuajay](https://github.com/matharuajay))
- Terry Leung ([@terrylks](https://github.com/terrylks))

## All packages v0.3.0 (2019-05-21)

#### Documentation
* [#82](https://github.com/EOSIO/eosio-toppings/pull/82) adds wallet legal rider ([@terrylks](https://github.com/terrylks))

#### Internal
* `api-eosio-compiler`, `api-mongodb-plugin`, `api-rpc`, `docker-eosio-nodeos`, `docker-mongodb`
  * [#81](https://github.com/EOSIO/eosio-toppings/pull/81) Pre-release v0.3.0 and release to public. ([@terrylks](https://github.com/terrylks))

#### Committers: 1
- Terry Leung ([@terrylks](https://github.com/terrylks))

## docker-eosio-nodeos v0.3.0-alpha.0 (2019-05-20)

#### Bug Fix
* `docker-eosio-nodeos`
  * [#80](https://github.com/EOSIO/eosio-toppings/pull/80) Remove -p 9876:9876 from docker initialization of nodeos ([@jcardenas9x](https://github.com/jcardenas9x))

#### Committers: 1
- Jonathan Cardenas ([@jcardenas9x](https://github.com/jcardenas9x))

## All packages v0.3.0-alpha (2019-05-17)

#### Enhancement
* `api-eosio-compiler`
  * [#71](https://github.com/EOSIO/eosio-toppings/pull/71) Compile service fix ([@jcardenas9x](https://github.com/jcardenas9x))

#### Bug Fix
* `api-rpc`
  * [#76](https://github.com/EOSIO/eosio-toppings/pull/76) Fogbugz 3386 - Add update_auth rpc api call ([@matharuajay](https://github.com/matharuajay))
* `api-mongodb-plugin`
  * [#77](https://github.com/EOSIO/eosio-toppings/pull/77) Fogbugz 3401 - Filter failed actions ([@matharuajay](https://github.com/matharuajay))
* `api-eosio-compiler`
  * [#73](https://github.com/EOSIO/eosio-toppings/pull/73) Deploy changes for ubuntu ([@matharuajay](https://github.com/matharuajay))
  * [#71](https://github.com/EOSIO/eosio-toppings/pull/71) Compile service fix ([@jcardenas9x](https://github.com/jcardenas9x))

#### Documentation
* `api-eosio-compiler`, `api-mongodb-plugin`, `api-rpc`, `docker-eosio-nodeos`, `docker-mongodb`
  * [#78](https://github.com/EOSIO/eosio-toppings/pull/78) Documents / package.json review and update ([@terrylks](https://github.com/terrylks))
* Other
  * [#72](https://github.com/EOSIO/eosio-toppings/pull/72) Added EOSIO Labs badge and writeup ([@jcardenas9x](https://github.com/jcardenas9x))

#### Committers: 4
- Ajay Matharu ([@matharuajay](https://github.com/matharuajay))
- Jonathan Cardenas ([@jcardenas9x](https://github.com/jcardenas9x))
- [@terrylks](https://github.com/terrylks)
- [@varshajnagaraja](https://github.com/varshajnagaraja)

## api-mongodb-plugin v0.2.2, api-rpc v0.2.2 (2019-05-08)

#### Documentation
* `api-mongodb-plugin`, `api-rpc`
  * [#70](https://github.com/EOSIO/eosio-toppings/pull/70) Rewrite and update documentation ([@jcardenas9x](https://github.com/jcardenas9x))

#### Committers: 1
- Jonathan Cardenas ([@jcardenas9x](https://github.com/jcardenas9x))

## api-eosio-compiler v0.2.2, docker-eosio-nodeos v0.2.2 (2019-05-07)

# Depenpendcies update

Update eosio nodeos to latest stable version ( v1.7.3 ).

Update eosio-cdt to latest stable version ( v1.6.1 ).

#### Documentation
* `api-eosio-compiler`, `docker-eosio-nodeos`
  * [#67](https://github.com/EOSIO/eosio-toppings/pull/67)  Updates images to latest stable version. nodeos to v1.7.3 cdt to v1.6.1 ([@terrylks](https://github.com/terrylks))

#### Internal
* [#68](https://github.com/EOSIO/eosio-toppings/pull/68) Internal: gitignore .vscode folder and remove files. ([@terrylks](https://github.com/terrylks))

#### Committers: 1
- [@terrylks](https://github.com/terrylks)
