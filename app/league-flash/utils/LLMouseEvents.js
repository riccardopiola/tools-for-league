// @flow
import { spawn } from 'child_process';
import path from 'path';
import { getPathToResources } from './utils';

class LLMouseEvents {
  constructor() {
    spawn('MouseKeyboardHooks', {
      cwd: path.join(getPathToResources(), 'extraResources')
    });
  }
}
