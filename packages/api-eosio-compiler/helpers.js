const path = require('path');
const stripAnsi = require('strip-ansi');
const fileManip = require('file');
const fs = require('fs');

const resolveHomePath = (filepath) => {
    if (filepath[0] === '~') {
        // '~' is bash only, therefore we must detect it in the file path and replace it with process.env.HOME
        return path.join(process.env.HOME, filepath.slice(1));
    } else if (!path.isAbsolute(filepath) && filepath[0] !== '/') {
        // We expect absolute file path so we prepend "/" if it doesn't already exist.
        return "/"+filepath;
    }
    
    // Return filepath as is if there are no issues
    return filepath;
}

const getStringDiff = (sourcePath, path) => path.split(sourcePath).join('').substring(1);

const abiIsEmpty = (abi) => {
  const abiProps = [
      'structs', 'types', 'actions',
      'tables', 'ricardian_clauses', 'variants',
      'abi_extensions'
  ];
  let jsonFormattedAbi = JSON.parse(abi);

  let isEmptyAbi = true;
  abiProps.forEach(prop => {
      let coll = jsonFormattedAbi[prop];
      if (coll && coll.length > 0) isEmptyAbi = false;
  });

  return isEmptyAbi;
}

const fetchDeployableFilesFromDirectory = (directory) => {
  let response = {
      wasmPath: "",
      abiPath: "",
      programErrors: [],
  }

  try {
      
      const directoryContents = fs.readdirSync(directory);
      const wasmFileName = directoryContents.find(filePath => filePath.match(/.*\.(wasm)$/gi));
      const abiFileName = directoryContents.find(filePath => filePath.match(/.*\.(abi)$/gi));
  
      response["wasmPath"] = (!wasmFileName) ? "" : path.join(directory, wasmFileName);
      response["abiPath"] = (!abiFileName) ? "" : path.join(directory, abiFileName);
  
      if (!wasmFileName) 
          response["programErrors"].push(`Cannot find '.wasm' file in ${directory}`);
  
      if (!abiFileName)
          response["programErrors"].push(`Cannot find '.abi' file in ${directory}`);
      else {
          if (abiIsEmpty(fs.readFileSync(path.join(directory, abiFileName)), 'utf-8')) {
              response["programErrors"].push(`Warning: Unfortunately, the contract structure is too complex for --abigen to generate correct ABI file`);
              response["programErrors"].push(`Warning: That's normal for complex projects. ABI should be created manually. Please refer to https://developers.eos.io/eosio-home/docs/the-abi`);
          } else {
              response["abiContents"] = fs.readFileSync(path.join(directory, abiFileName), "utf-8");
          }
      }
  
      return response;

  } catch (ex) {
      throw new Error(ex.message);
  }

}

const filterHeaderFiles = (fileName) => (fileName.includes('.hpp'));

const parseDirectoriesToInclude = (sourcePath) => {
  let directories = [];
  let i = 0;

  try {
      fileManip.walkSync(sourcePath, (ds, dirPath, dirs, files) => {
          const sourceFiles = (dirs) ? dirs.filter(filterHeaderFiles) : [];
          if (sourceFiles.length > 0 && sourcePath !== ds) {
              let fileDiff = getStringDiff(sourcePath, ds);
              if (fileDiff[0] == '/') fileDiff = fileDiff.substring(1);
              directories.push(
                  "/opt/eosio/bin/contracts/"+fileDiff
              );
          }
      });

      return directories;
  } catch (ex) {
      throw new Error(ex.message);
  }

}

const parseLog = (logContent) => {
  let strippedContent = stripAnsi(logContent);
  let output = strippedContent.split('\n');

  output.pop();

  return output;
}

const getFile = (filePath) => {
  if(!fs.existsSync(filePath)) {
    fs.closeSync(fs.openSync(filePath, 'a'));
  }
  return fs.readFileSync(filePath, 'utf-8');
}

module.exports = {
  resolveHomePath: resolveHomePath,
  getStringDiff: getStringDiff,
  fetchDeployableFilesFromDirectory: fetchDeployableFilesFromDirectory,
  parseDirectoriesToInclude: parseDirectoriesToInclude,
  parseLog: parseLog,
  getFile: getFile
}
