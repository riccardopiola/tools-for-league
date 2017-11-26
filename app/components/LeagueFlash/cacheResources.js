// @flow
import fse from 'fs-extra';

export default function cacheResources(patch: string, dataPath: string) : Promise<*> {
  const championsData = fetchDDragon(
    'champion',
    `http://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/champion.json`);
  const spellsData = fetchDDragon(
    'spells',
    `http://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/summoner.json`);
  const spellsColors = fetchContent(
    'spellsColors',
    'https://firebasestorage.googleapis.com/v0/b/league-flash.appspot.com/o/spellsColors.json?alt=media&token=4428df7a-f774-4827-9e1c-45afdd6031a2');
  // if (firebaseExists) Integrate changes with firebase
  return Promise.all([championsData, spellsData, spellsColors])
    .then((arr) => {
      return checkFolders(patch).then(() => arr);
    })
    .then(arr => {
      return Promise.all(arr.map(file => {
        return saveData(file.name, file.data, patch, dataPath);
      }));
    });
}

/**
 * Function that creates a new folder for the patch and deletes old ones
 * (keeps one for good measure)
 * @param {string} patch
 */
function checkFolders(patch: string): Promise<*> {
  const baseURI = `${process.cwd()}/resources/ddragon`;
  return fse.pathExists(`${baseURI}/${patch}`)
    .then(exists => {
      if (exists)
        return fse.emptyDir(`${baseURI}/${patch}`);
      return fse.mkdir(`${baseURI}/${patch}`);
    })
    .then(() => {
      return fse.readdir(baseURI);
    })
    .then(contents => { // Eliminate old directories
      const dirs = contents.filter(content => /\d+.\d+.\d+/.test(content));
      let promises = [];
      if (dirs.length > 2) {
        promises = dirs
          .sort((a, b) => {
            if (Number.parseFloat(a) > Number.parseFloat(b)) return 1;
            else if (Number.parseFloat(a) < Number.parseFloat(b)) return -1;
            return 0;
          })
          .slice(0, dirs.length - 2)
          .map(dir => {
            return fse.remove(`${baseURI}/${dir}`);
          });
      }
      return Promise.all(promises);
    });
}

function fetchDDragon(fileName: string, url: string) {
  return fetch(url)
    .then(response => {
      if (response.ok)
        return response.json();
      throw new Error('Couldn\'t connect to update data');
    })
    .then(json => json.data)
    .then(data => {
      return {
        name: fileName,
        data
      };
    });
}

function fetchContent(fileName: string, url: string) {
  return fetch(url)
    .then(response => {
      if (response.ok)
        return response.json();
      throw new Error('Couldn\'t connect to update data');
    })
    .then(data => {
      return {
        name: fileName,
        data
      };
    });
}

function saveData(fileName: string, data: Object, patch: string, dataPath: string) {
  return fse.ensureDir(`${dataPath}/ddragon/${patch}`)
    .then(() => {
      return fse.writeJson(`${dataPath}/ddragon/${patch}/${fileName}.json`, data);
    });
}
