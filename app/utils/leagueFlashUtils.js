import sizeOf from 'image-size';
import type { SelectorsStore } from '../editor/types';

export function getImageSize(imgURI: string): Promise<{ width: number, height: number}> {
  return new Promise((resolve, reject) => {
    sizeOf(imgURI, (err, dimensions) => {
      if (err)
        reject(err);
      else
        resolve(dimensions);
    });
  });
}

export function generateMapping(dimensions: { width: number, height: number}): SelectorsStore {
  const ids = [
    'left:summoner1:spell1',
    'left:summoner1:spell2',
    'left:summoner2:spell1',
    'left:summoner3:spell1',
    'left:summoner4:spell1',
    'left:summoner5:spell1',
    'right:summoner1:spell1'
  ];
  const store = {};
  const leftSummoner1Y = Math.round(dimensions.height * 0.297);
  const leftSummoner1X = Math.round(dimensions.width * 0.219);
  const summonerSizeX = Math.round(dimensions.width * 0.014);
  const summonerSizeY = Math.round(dimensions.height * 0.025);
  const distanceSpells = Math.round(dimensions.height * 0.027);
  const distancePlayers = Math.round(dimensions.height * 0.069);
  const rightSummoner1X = Math.round(dimensions.width * 0.51);
  ids.forEach((id: string) => {
    store[id] = {
      x: leftSummoner1X,
      y: leftSummoner1Y,
      height: summonerSizeY,
      width: summonerSizeX
    };
  });
  // store['left:summoner1:spell1'] OK
  store['left:summoner1:spell2'].y = leftSummoner1Y + distanceSpells;
  store['left:summoner2:spell1'].y = leftSummoner1Y + distancePlayers;
  store['left:summoner3:spell1'].y = leftSummoner1Y + (distancePlayers * 2);
  store['left:summoner4:spell1'].y = leftSummoner1Y + (distancePlayers * 3);
  store['left:summoner5:spell1'].y = leftSummoner1Y + (distancePlayers * 4);
  store['right:summoner1:spell1'].x = rightSummoner1X;
  return store;
}
