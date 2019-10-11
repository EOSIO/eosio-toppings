'use strict';

const express = require('express');
const Router = express.Router();
const { exec } = require('child_process');
const fs = require('fs');
const copy = require('recursive-copy');
const del = require('del');
const path = require('path');
const Helper = require('./helpers');
const { Api, JsonRpc, Serialize } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');
const { TextEncoder, TextDecoder } = require('util'); 
const fetch = require('node-fetch'); 

const LOG_DEST = path.resolve("./docker-eosio-cdt/stdout.txt");
const ERR_DEST = path.resolve("./docker-eosio-cdt/stderr.txt");
const DEL_TARGETS = ["./docker-eosio-cdt/contracts/**", "!./docker-eosio-cdt/contracts"];
const DEST = path.resolve("./docker-eosio-cdt/contracts");
const CWD = path.resolve('./docker-eosio-cdt');

const OPTIONS = {
  overwrite: true,
  junk: false,
  dot: false,
  filter: [
    '**/*.cpp',
    '**/*.hpp',
    '**/*.c',
    '**/*.h',
    '**/*.yml',
    '**/*.yaml',
    '**/*.md'
  ]
};

/**
 * How to test:
 * localhost:8081/api/eosio/deploy
 * POST request
 * 1. <source> - Absolute source file path
 * 2. <endpoint> - Blockchain endpoint
 * 3. <account_name> - account name on which the smart contract would be deployed
 * 4. <private_key> - private key of account to sign the transaction
 * 5. <abiSource> - Optional path to supply as replacement ABI in case we imported
 */
Router.post("/deploy", async (req, res) => {
  const { body } = req;

    try {
        const deletedFiles = await del(DEL_TARGETS);
        let results = null;
        let resolvedPath = Helper.resolveHomePath(body["source"]);
        let compileTarget = path.basename(resolvedPath);
        let endpoint = path.basename(body["endpoint"]);
        let account_name = path.basename(body["account_name"]);
        let private_key = path.basename(body["private_key"]);
        let permission = body["permission"];
        let COMPILE_SCRIPT = "";

        const directories = Helper.parseDirectoriesToInclude(path.dirname(resolvedPath));
        results = await copy(path.dirname(resolvedPath), DEST, OPTIONS);
        COMPILE_SCRIPT = "./setup_eosio_cdt_docker.sh "+compileTarget+" "+directories.join(' ');

    console.log("Deleted files:\n", deletedFiles.join('\n'));
    results.forEach((file) => console.log("Copied file: ", file["src"]));
    console.log("Target entry file: ", compileTarget);

        if(fs.lstatSync(resolvedPath).isDirectory()) 
            throw new Error(`${resolvedPath} is a directory, not a valid entry file!`);

    if(body["account_name"] === 'eosio')
      throw new Error(
        `Chosen account name is ${account_name}, which owns the system contract used
          for authorizing new accounts. Aborting contract deployment...`
      );

        exec(COMPILE_SCRIPT, {
            cwd: CWD
        }, (err, stdout, stderr) => {
          console.log('compile script ran');
            let parsedStdOut = Helper.parseLog(Helper.getFile(LOG_DEST));
            let parsedStdErr = Helper.parseLog(Helper.getFile(ERR_DEST));
            if (err) {
                let message = (err.message) ? err.message : message;
                res.send({
                    compiled: false,
                    errors: [
                      message
                    ],
                    stdout: parsedStdOut,
                    stderr: parsedStdErr
                });
            } else {
                const COMPILED_CONTRACTS = path.resolve(
                    "./docker-eosio-cdt/compiled_contracts/" + 
                    path.basename(compileTarget, '.cpp')
                );
                const { wasmPath, abiPath, abiContents = {}, programErrors } = Helper.fetchDeployableFilesFromDirectory(COMPILED_CONTRACTS);
                if (programErrors.length > 0) {
                    res.send({
                        compiled: false,
                        errors: programErrors,
                        stdout: parsedStdOut,
                        stderr: parsedStdErr
                    })
                } else {
                    console.log(`stdout: ${stdout}`);
                    let abi = (body["abiSource"] && body["abiSource"] != "null") ? body["abiSource"] : abiPath;
                    let _abiContents = (body["abiSource"] && body["abiSource"] != "null") ? fs.readFileSync(body["abiSource"], 'utf-8') : abiContents;
                    console.log(body["abiSource"], abiPath, abi, typeof body["abiSource"]);
                    deployContract(endpoint, account_name, private_key, permission, wasmPath, abi)
                    .then(result => {
                      console.log("Contract deployed successfully ", result);
                      res.send({
                        compiled: true,
                        wasmLocation: wasmPath,
                        abi: abi,
                        deployed: true,
                        abiContents: _abiContents,
                        errors: [],
                        output: result,
                        stdout: parsedStdOut,
                        stderr: parsedStdErr
                      });
                    })
                    .catch((err) => {
                      let message = (err.message) ? err.message : err;
                      console.log("Caught error: ", err, message);
                      res.send({
                        compiled: true,
                        wasmLocation: wasmPath,
                        abi: abi,
                        abiContents: _abiContents,
                        deployed: false,
                        errors: [
                          message
                        ],
                        stdout: parsedStdOut,
                        stderr: parsedStdErr
                      });
                    });
                }
            }
        });
      
  } catch (ex) {
    let err = ex;

    if (typeof ex === 'object') {
      err = ex.message;
    }

    res.send({
      compiled: false,
      stderr: err,
      errors: [
          ex.message
      ]
    })
  }
});

/**
 * How to test:
 * localhost:8081/api/eosio/compile
 * POST request
 * 1. <source> - Absolute source file path
 */
Router.post("/compile", async (req, res) => {
  const { body } = req;

    try {
      const deletedFiles = await del(DEL_TARGETS);
      let results = null;
      let resolvedPath = Helper.resolveHomePath(body["source"]);
      let compileTarget = path.basename(resolvedPath);
      let COMPILE_SCRIPT = "";
      const directories = Helper.parseDirectoriesToInclude(path.dirname(resolvedPath));
      results = await copy(path.dirname(resolvedPath), DEST, OPTIONS);
      COMPILE_SCRIPT = "./setup_eosio_cdt_docker.sh "+compileTarget+" "+directories.join(' ');

    console.log("Deleted files:\n", deletedFiles.join('\n'));
    results.forEach((file) => console.log("Copied file: ", file["src"]));
    console.log("Target entry file: ", compileTarget);

      if(fs.lstatSync(resolvedPath).isDirectory()) 
          throw new Error(`${resolvedPath} is a directory, not a valid entry file!`);

    exec(COMPILE_SCRIPT, {
      cwd: CWD
    }, (err, stdout, stderr) => {
      if(!fs.existsSync(LOG_DEST)) {
        fs.closeSync(fs.openSync(LOG_DEST, 'aw'))
      }
      let parsedStdOut = Helper.parseLog(Helper.getFile(LOG_DEST));
      let parsedStdErr = Helper.parseLog(Helper.getFile(ERR_DEST));
      if (err) {
        res.send({
          compiled: false,
          errors: Helper.parseLog(err.message),
          stdout: parsedStdOut,
          stderr: parsedStdErr
        });
      } else {
        const COMPILED_CONTRACTS = path.resolve(
          "./docker-eosio-cdt/compiled_contracts/" + 
          path.basename(compileTarget, '.cpp')
      );
        const { wasmPath, abiPath, abiContents = {}, programErrors } = Helper.fetchDeployableFilesFromDirectory(COMPILED_CONTRACTS);
        if (programErrors.length > 0) {
          res.send({
            compiled: false,
            errors: programErrors,
            stdout: parsedStdOut,
            stderr: parsedStdErr
          })
        } else {
          res.send({
            compiled: true,
            wasmLocation: wasmPath,
            abi: abiPath,
            abiContents: abiContents,
            errors: programErrors,
            stdout: parsedStdOut,
            stderr: parsedStdErr
          });
        }
      }
    })
  } catch (ex) {
    let err = ex;

    if (typeof ex === 'object') {
      err = ex.message;
    }

    res.send({
      compiled: false,
      stderr: err,
      errors: [
        ex.message
      ]
    })
  }
});

/****
 * How to test:
 * localhost:8081/api/eosio/import
 * The page should handle this for you.
 * 1. <abiName>
 * 2. <content>
 */
Router.post("/import", async (req, res) => {
  const { body } = req;
  const IMPORT_FOLDER = path.resolve("./docker-eosio-cdt/imported_abi/");
  const DESTINATION = path.resolve("./docker-eosio-cdt/imported_abi/"+body["abiName"]);
  try {

    if (!fs.lstatSync(IMPORT_FOLDER).isDirectory())
      fs.mkdirSync(IMPORT_FOLDER, {recursive:true});
    else {
      const clearImport = await del(["./docker-eosio-cdt/imported_abi/"+body["abiName"]]);
      console.log("Cleared old import: ", clearImport);
    }

    fs.writeFile(DESTINATION, body["content"], (err) => {
      if (err) {
        console.log(err);
        res.send({
          imported: false,
          errors: [
            err.message
          ]
        });
      } else {
        console.log("ABI imported to path: "+DESTINATION);
        res.send({
          imported: true,
          abiPath: DESTINATION.toString(),
          errors: []
        });
      }
    })
  } catch (ex) {
    let err = ex;

    if (typeof ex === 'object') {
      err = ex.message;
    }

    res.send({
      compiled: false,
      stderr: err,
      errors: [
        ex.message
      ]
    })
  }
})

async function deployContract(blockchainUrl, account_name, private_key, permission, wasm_path, abi_path){
  if(blockchainUrl.indexOf("http://") < 0)
  {
    blockchainUrl = "http://" + blockchainUrl;
  }

  const rpc = new JsonRpc(blockchainUrl, { fetch });
  const signatureProvider = new JsSignatureProvider([private_key]);
  const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

  const buffer = new Serialize.SerialBuffer({
    textEncoder: api.textEncoder,
    textDecoder: api.textDecoder,
  });

  const wasm = fs.readFileSync(wasm_path).toString('hex');
  let abi = JSON.parse(fs.readFileSync(abi_path, 'utf8'));

  const abiDefinition = api.abiTypes.get('abi_def');
  // need to make sure abi has every field in abiDefinition.fields
  // otherwise serialize throws error
  abi = abiDefinition.fields.reduce(
      (acc, { name: fieldName }) => Object.assign(acc, { [fieldName]: acc[fieldName] || [] }),
      abi,
  );
  abiDefinition.serialize(buffer, abi);

  try{
    return await api.transact(
      {
        actions: [
          {
            account: 'eosio',
            name: 'setcode',
            authorization: [
              {
                actor: account_name,
                permission: permission,
              },
            ],
            data: {
              account: account_name,
              vmtype: 0,
              vmversion: 0,
              code: wasm,
            },
          },
          {
            account: 'eosio',
            name: 'setabi',
            authorization: [
              {
                actor: account_name,
                permission: permission,
              },
            ],
            data: {
              account: account_name,
              abi: Buffer.from(buffer.asUint8Array()).toString('hex'),
            },
          },
        ],
      },
      {
        blocksBehind: 3,
        expireSeconds: 30,
      }
    );
  }
  catch(err){
    throw("Error while deploying contract - " + err)
  }
}

module.exports = Router;
