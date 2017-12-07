// @flow
import { spawn } from 'child_process';
import path from 'path';
import fse from 'fs-extra';
import { getPathToResources } from './utils';
import { toggleTimer, toggleEnableClick } from '../actions/gameActions';

export default class LLHookManager {
  // public variables
  dispatch: any;
  mapping: any;
  enemyTeam: 'Team-100'|'Team-200';
  child: any
  // Private variables
  _x: number;
  _xInterval: number;
  constructor(dispatch, enemyTeam: 'Team-100'|'Team-200', dataPath) {
    this.dispatch = dispatch;
    this.enemyTeam = (enemyTeam === 'Team-100') ? 'left' : 'right';
    this.mapping = generateCompleteMapping(dataPath);
    // eliminate line
    fse.writeJson('C:/Users/Ricca/Desktop/file.json', this.mapping);
    // Useful for quick matching
    this._x = this.mapping[`${this.enemyTeam}:summoner1:spell1`].x;
    this._xInterval = this.mapping[`${this.enemyTeam}:summoner1:spell1`].width;
  }
  /**
   * Starts MouseKeyboardHooks.exe and sets up listeners for mouse events
   */
  start() {
    try {
      this.child = spawn('MouseKeyboardHooks.exe', {
        cwd: path.join(getPathToResources(), 'extraResources')
      });
    } catch (e) {
      console.error(e);
    }
    this.child.stdout.on('data', this.handleEvent.bind(this));
  }
  end() {
    this.child.stdout.removeListener('data', this.handleEvent.bind(this));
    this.child.kill();
  }
  /**
   * Function that handles new mouse clicks
   * @param {Buffer} buffer The buffer from the command line
   */
  handleEvent(buffer) {
    const line = buffer.toString();
    const x = Number.parseInt(/x:\s(\d+)/.exec(line)[1], 10);
    const y = Number.parseInt(/y:\s(\d+)/.exec(line)[1], 10);

    // Check if it's the lock icon
    if (x < 19 && y < 19)
      return this.dispatch(toggleEnableClick());

    // Check if its a summoner spell
    if (x < this._x || x > (this._x + this._xInterval))
      return;
    const foundIdentifier = Object.keys(this.mapping).find((identifier: string) => {
      // If we're not talking about enemy team skip
      if (!identifier.startsWith(this.enemyTeam))
        return false;
      const map = this.mapping[identifier];
      if (y >= map.y && y <= (map.y + map.height))
        return true;
      return false;
    });
    if (!foundIdentifier)
      return;
    this.dispatch((dispatch, getState) => {
      const summonerIndex = Number.parseInt(/summoner(\d)/.exec(foundIdentifier)[1], 10);
      const summonerSpell = foundIdentifier.substr(-6);
      const { summonerName } = getState().game.activeChampions[summonerIndex - 1];
      dispatch(toggleTimer(summonerName, summonerSpell));
    });
  }
}

function generateCompleteMapping(dataPath) {
  const baseMappings = fse.readJsonSync(path.join(dataPath, 'mapping.json'));
  // generate useful variables
  const distanceBetweenSpells = baseMappings['left:summoner1:spell2'].y - baseMappings['left:summoner1:spell1'].y;
  // compose the object
  return {
    ...baseMappings,
    'left:summoner2:spell2': {
      x: baseMappings['left:summoner1:spell1'].x,
      y: baseMappings['left:summoner2:spell1'].y + distanceBetweenSpells,
      height: baseMappings['left:summoner2:spell1'].height,
      width: baseMappings['left:summoner2:spell1'].width
    },
    'left:summoner3:spell2': {
      x: baseMappings['left:summoner1:spell1'].x,
      y: baseMappings['left:summoner3:spell1'].y + distanceBetweenSpells,
      height: baseMappings['left:summoner3:spell1'].height,
      width: baseMappings['left:summoner3:spell1'].width
    },
    'left:summoner4:spell2': {
      x: baseMappings['left:summoner1:spell1'].x,
      y: baseMappings['left:summoner4:spell1'].y + distanceBetweenSpells,
      height: baseMappings['left:summoner4:spell1'].height,
      width: baseMappings['left:summoner4:spell1'].width
    },
    'left:summoner5:spell2': {
      x: baseMappings['left:summoner1:spell1'].x,
      y: baseMappings['left:summoner5:spell1'].y + distanceBetweenSpells,
      height: baseMappings['left:summoner5:spell1'].height,
      width: baseMappings['left:summoner5:spell1'].width
    },
    'right:summoner1:spell2': {
      x: baseMappings['right:summoner1:spell1'].x,
      y: baseMappings['left:summoner1:spell1'].y + distanceBetweenSpells,
      height: baseMappings['right:summoner1:spell1'].height,
      width: baseMappings['right:summoner1:spell1'].width
    },
    'right:summoner2:spell1': {
      x: baseMappings['right:summoner1:spell1'].x,
      y: baseMappings['left:summoner2:spell1'].y,
      height: baseMappings['left:summoner2:spell1'].height,
      width: baseMappings['right:summoner1:spell1'].width
    },
    'right:summoner2:spell2': {
      x: baseMappings['right:summoner1:spell1'].x,
      y: baseMappings['left:summoner2:spell1'].y + distanceBetweenSpells,
      height: baseMappings['left:summoner2:spell1'].height,
      width: baseMappings['right:summoner1:spell1'].width
    },
    'right:summoner3:spell1': {
      x: baseMappings['right:summoner1:spell1'].x,
      y: baseMappings['left:summoner3:spell1'].y,
      height: baseMappings['left:summoner3:spell1'].height,
      width: baseMappings['right:summoner1:spell1'].width
    },
    'right:summoner3:spell2': {
      x: baseMappings['right:summoner1:spell1'].x,
      y: baseMappings['left:summoner3:spell1'].y + distanceBetweenSpells,
      height: baseMappings['left:summoner3:spell1'].height,
      width: baseMappings['right:summoner1:spell1'].width
    },
    'right:summoner4:spell1': {
      x: baseMappings['right:summoner1:spell1'].x,
      y: baseMappings['left:summoner4:spell1'].y,
      height: baseMappings['left:summoner4:spell1'].height,
      width: baseMappings['right:summoner1:spell1'].width
    },
    'right:summoner4:spell2': {
      x: baseMappings['right:summoner1:spell1'].x,
      y: baseMappings['left:summoner4:spell1'].y + distanceBetweenSpells,
      height: baseMappings['left:summoner4:spell1'].height,
      width: baseMappings['right:summoner1:spell1'].width
    },
    'right:summoner5:spell1': {
      x: baseMappings['right:summoner1:spell1'].x,
      y: baseMappings['left:summoner5:spell1'].y,
      height: baseMappings['left:summoner5:spell1'].height,
      width: baseMappings['right:summoner1:spell1'].width
    },
    'right:summoner5:spell2': {
      x: baseMappings['right:summoner1:spell1'].x,
      y: baseMappings['left:summoner5:spell1'].y + distanceBetweenSpells,
      height: baseMappings['left:summoner5:spell1'].height,
      width: baseMappings['right:summoner1:spell1'].width
    },
  }
}
