// @flow
import fse from 'fs-extra';
/**
 * Returns true if the folder contains the subfolders:
 *  - Config
 *  - RADS
 *  - Config/PersistedSettings.json
 * Else it throws an error
 * @param {string} path path of the selected folder
 */
export async function lolFolder(path: string) {
  const RadsExists = fse.pathExists(`${path}/RADS`);
  const ConfigExists = fse.pathExists(`${path}/Config`);
  const PersistedSettingsExists = fse.pathExists(`${path}/Config/PersistedSettings.json`);
  const responsesArray = await Promise.all([RadsExists, ConfigExists, PersistedSettingsExists]);
  if (responsesArray.some((val: boolean) => !val))
    throw new Error('You did not select the correct folder');
  return true;
}
// WIP
export function intervalPing(value: string):boolean {
  if (Number.isNaN(Number.parseInt(value, 10)))
    throw new Error('Insert a number');
  if (Number.parseInt(value, 10) < 150)
    throw new Error('Min 150ms');
  return true;
}
