#!/bin/bash
set -o errexit

echo "deploying data"

# set PATH
PATH="$PATH:/opt/eosio/bin"

# change to script directory
cd "$(dirname "$0")"

echo "creating accounts in blockchain"

# download jq for json reader, we use jq here for reading the json file ( accounts.json )
mkdir -p ~/bin && curl -sSL -o ~/bin/jq https://github.com/stedolan/jq/releases/download/jq-1.5/jq-linux64 && chmod +x ~/bin/jq && export PATH=$PATH:~/bin

# loop through the array in the json file, import keys and create accounts
# these pre-created accounts will be used for saving / erasing notes
# we hardcoded each account name, public and private key in the json.
# NEVER store the private key in any source code in your real life developmemnt
# This is just for demo purpose

jq -c '.[]' accounts.json | while read i; do
  name=$(jq -r '.name' <<< "$i")
  priv=$(jq -r '.privateKey' <<< "$i")  
  pub=$(jq -r '.publicKey' <<< "$i")
  wallet=$(jq -r '.wallet' <<< "$i")
  
  cleos wallet import -n $wallet --private-key $priv

  # to simplify, we use the same key for owner and active key of each account
  cleos create account eosio $name $pub $pub

done
