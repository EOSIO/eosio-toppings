#!/usr/bin/env bash
set -e

echo "creating blockchain accounts and deploying smart contract"

# set PATH
PATH="$PATH:/opt/eosio/bin:/opt/eosio/bin/scripts"

# sourcing variable from config file
source ./scripts/config.file

# override config if there are any local config changes
if [ -f "./scripts/config.file.local" ]; then
  source ./scripts/config.file.local
fi

# set contracts path
CONTRACTSPATH="$( pwd -P )/contracts"

# start nodeos ( local node of blockchain )
# run it in a background job such that docker run could continue
nodeos -e -p eosio -d /mnt/dev/data \
  --signature-provider EOS5GnobZ231eekYUJHGTcmy2qve1K23r5jSFQbMfwWTtPB7mFZ1L=KEY:5Jr65kdYmn33C3UabzhmWDm2PuqbRfPuDStts3ZFNSBLM7TqaiL \
  --config-dir /mnt/dev/config \
  --plugin eosio::mongo_db_plugin -m $MONGODB_PATH  \
  --http-validate-host=false \
  --plugin eosio::producer_plugin \
  --plugin eosio::chain_api_plugin \
  --plugin eosio::http_plugin \
  --http-server-address=0.0.0.0:8888 \
  --access-control-allow-origin=* \
  --contracts-console \
  --max-transaction-time 300 \
  --verbose-http-errors \
  --genesis-json "./scripts/genesis.json" &

# wait for blockchain to start
sleep 1s
until curl localhost:8888/v1/chain/get_info
do
  sleep 1s
done

echo "create wallet: eosio"
# First key import is for eosio system account
cleos wallet create -n eosio --to-console | tail -1 | sed -e 's/^"//' -e 's/"$//' > eosio_wallet_password.txt
cleos wallet import -n eosio --private-key 5Jr65kdYmn33C3UabzhmWDm2PuqbRfPuDStts3ZFNSBLM7TqaiL

echo "deploying bios contract"
# deploy bios contract this is required in getABI for system contracts 
deploy_contract.sh eosio.bios eosio eosio $(cat eosio_wallet_password.txt) true

echo "creating wallet: hellowal"
## key for eosio account and export the generated password to a file for unlocking wallet later
cleos wallet create -n hellowal --to-console | tail -1 | sed -e 's/^"//' -e 's/"$//' > hello_wallet_password.txt
## Owner key for hellowal wallet
cleos wallet import -n hellowal --private-key 5JrDP7knfwybgxbVbmWVqmNtexindWpAeVs2divw7WDiLyjkDJU
# # Active key for hellowal wallet
cleos wallet import -n hellowal --private-key 5JEb8Qzy6ZTfs9mGdKKSZL1GB4Lxbj3uPnWFbm652GS9RQQHmHa

# # create account for helloacc with above wallet's public keys
 cleos create account eosio helloacc EOS8mQ4RVYYsNXfpPCiJew4FxEo3viBTEaTgPtdHXKceMdNvqmTzK EOS71ndY36kez1mWzTX4XRf7FK4TpPYKmN9Q1BPW9LBGR9LyKSTb1

 echo "creating wallet: notewal"
## key for eosio account and export the generated password to a file for unlocking wallet later
cleos wallet create -n notewal --to-console | tail -1 | sed -e 's/^"//' -e 's/"$//' > note_wallet_password.txt
## Owner key for notewal wallet
cleos wallet import -n notewal --private-key 5HprNJsGzQajAMGiEzyHmy8rW8M4TMM3to1kEPWexch5vJJNxJX
# # Active key for notewal wallet
cleos wallet import -n notewal --private-key 5HpYaJpP16dJLDgDEeY5n5GFaDjL1TwTVo6KrdWQWSjQpK1a4AT

# # create account for noteacc with above wallet's public keys
 cleos create account eosio noteacc EOS57cp4Joru7pnUzLg8RtHLWYWwjgBza9jPncE3ovbMSGN2MyZGa EOS6pwXEFGVYnX6zmozNAo9MRgkJrfP24x46Pek8dHjpAFGWS7had


echo "deploying smart contract"
# $1 smart contract name
# $2 account holder name of the smart contract
# $3 wallet for unlock the account
# $4 password for unlocking the wallet
# $5 to deploy?
deploy_contract.sh helloworld helloacc hellowal $(cat hello_wallet_password.txt) true
deploy_contract.sh testnote noteacc notewal $(cat note_wallet_password.txt) true

echo "creating user accounts"
# script for create accounts into blockchain
create_accounts.sh

echo "deploying smart contract"
# deploy test contracts
deploy_contract.sh hiworld useraaaaaaaa notewal $(cat note_wallet_password.txt) false
deploy_contract.sh byeworld useraaaaaaab notewal $(cat note_wallet_password.txt) false
deploy_contract.sh tataworld useraaaaaaac notewal $(cat note_wallet_password.txt) false

echo "sending test transactions"
# script to create test transactions into blockchain
cleos push action helloacc sendmsg '["msg1"]' -p helloacc@active
sleep 10
cleos push action helloacc sendmsg '["msg2"]' -p helloacc@active
cleos push action helloacc sendmsg '["msg3"]' -p helloacc@active
sleep 10
cleos push action helloacc sendmsg '["msg4"]' -p helloacc@active
cleos push action helloacc sendmsg '["msg5"]' -p helloacc@active
cleos push action helloacc sendmsg '["msg6"]' -p helloacc@active
# * Replace the script with different form of data that you would pushed into the blockchain when you start your own project

echo "sending test transactions with multi index table"
# script to create some more transactions into blockchain
cleos push action noteacc update '["noteacc", "this is test note"]' -p noteacc@active
cleos push action noteacc update '["useraaaaaaaa", "this is from useraaaaaaaa note"]' -p useraaaaaaaa@active
cleos push action noteacc update '["useraaaaaaab", "this is from useraaaaaaab note"]' -p useraaaaaaab@active
cleos push action noteacc update '["useraaaaaaac", "this is from useraaaaaaac note"]' -p useraaaaaaac@active
cleos push action noteacc update '["useraaaaaaad", "this is from useraaaaaaad note"]' -p useraaaaaaad@active


echo "end of setting up blockchain accounts and smart contract"

# create a file to indicate the blockchain has been initialized
touch "/mnt/dev/data/initialized"

# put the background nodeos job to foreground for docker run
fg %1
