// @flow
import fse from 'fs-extra';
import type { GameData } from '../reducers/dataReducer';

async function composeChampionsArray(gameData: GameData, currentPatch: string, dataPath: string) {
  const baseURI = `${dataPath}/ddragon/${currentPatch}`;
  const championsData = await fse.readJson(`${baseURI}/champion.json`);
  const spellsData = await fse.readJson(`${baseURI}/spells.json`);
  const spellsColorData = await fse.readJson(`${baseURI}/spellsColors.json`);
  const activeChampions = gameData.enemies.map((user) => {
    return {
      summonerName: user.name,
      championName: user.championName,
      championId: calculateChampionId(user.championName, championsData),
      spell1: {
        spellId: user.spell1,
        spellName: spellsData[user.spell1].name,
        spellColor: getSpellColor(spellsColorData, spellsData[user.spell1].name),
        cooldown: Number.parseInt(spellsData[user.spell1].cooldownBurn, 10),
        endAt: null
      },
      spell2: {
        spellId: user.spell2,
        spellName: spellsData[user.spell2].name,
        spellColor: getSpellColor(spellsColorData, spellsData[user.spell2].name),
        cooldown: Number.parseInt(spellsData[user.spell2].cooldownBurn, 10),
        endAt: null
      }
    };
  });
  // if (firebaseExists) Integrate changes with firebase
  return activeChampions;
}

function calculateChampionId(championName, championsData) {
  const id = Object.keys(championsData).find(championId => {
    return championsData[championId].name === championName;
  });
  if (id)
    return id;
  throw new Error(`Can't recognize the champion ${championName}`);
}

function getSpellColor(spellColorData, spellName: string) {
  if (spellColorData[spellName])
    return spellColorData[spellName];
  return spellColorData.DEFAULT;
}

export default composeChampionsArray;
