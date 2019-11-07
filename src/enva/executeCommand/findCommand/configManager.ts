import fs from 'fs';
import {
  execSync
} from 'child_process';
import path from 'path';

const CONFIG_FILE_CONFIGS = {
  '.envarc': 'json',
  '.envarc.js': 'js',
  'envarc.yml': 'yml'
}

export function findGlobalConfig(){
  const globalPath = execSync('npm root').toString().trim();
  return findConfig(globalPath)
}

export function findConfig(directory){
  for(const configFileName of Object.keys(CONFIG_FILE_CONFIGS)){
    const configFileAddress = path.resolve(directory, configFileName)
    if(fs.existsSync(configFileAddress)) {
      return {
        data: fs.readFileSync(configFileAddress, 'utf-8'),
        type: CONFIG_FILE_CONFIGS[configFileAddress],
      }
    }
  }
  return false;
}

export function parseConfig({ data, type }){
  return JSON.parse(data);
}