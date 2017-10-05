// @flow
import fs from 'fs';
import fse from 'fs-extra';
import type { ThunkAction, Dispatch, GetState } from './Actions.flow';

export function refreshConfigurations(): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    let savedConfigs = [];
    let tempConfigs = [];
    fs.readdir(`${getState().settings.local.general.dataPath}/savedConfigurations`, (err, savedArray) => {
      if (err)
        savedConfigs = [];
      else
        savedConfigs = savedArray.map(str => str.split('.')[0]);
      dispatch({
        type: 'REFRESH_SAVED_CONFIGS',
        value: savedConfigs
      });
    });
    fs.readdir(`${getState().settings.local.general.dataPath}/temporaryConfigurations`, (err, tempArray) => {
      if (err)
        tempConfigs = [];
      else
        tempConfigs = tempArray.map(str => str.split('.')[0]);
      dispatch({
        type: 'REFRESH_TEMP_CONFIGS',
        value: tempConfigs
      });
    });
  };
}

export function saveConfiguration(name: string): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    fse.copy(`${getState().settings.local.general.lolFolder}/Config/PersistedSettings.json`,
      `${getState().settings.local.general.dataPath}/savedConfigurations/${name}.json`, (err) => {
        if (err)
          console.log(err);
        else
          dispatch(refreshConfigurations());
      });
  };
}

export function eliminateConfiguration(name: string): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    if (!name || name === '')
      return;
    const isSaved = getState().config.savedConfigurations.includes(name);
    const thePath = (isSaved) ? '/savedConfigurations/' : '/temporaryConfigurations/';
    fse.remove(`${getState().settings.local.general.dataPath}/${thePath}/${name}.json`, (err) => {
      if (err)
        console.log(err);
      else
        dispatch(refreshConfigurations());
    });
  };
}

export function injectConfiguration(name: any, temp: boolean, tempName: string): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    if (!name || name === '')
      return;
    const isSaved = getState().config.savedConfigurations.includes(name);
    const thePath = (isSaved) ? '/savedConfigurations/' : '/temporaryConfigurations/';
    if (temp && tempName !== '') {
      fse.copySync(`${getState().settings.local.general.lolFolder}/Config/PersistedSettings.json`,
        `${getState().settings.local.general.dataPath}/temporaryConfigurations/${tempName}.json`);
    }
    fse.copy(`${getState().settings.local.general.dataPath}/${thePath}/${name}.json`,
      `${getState().settings.local.general.lolFolder}/Config/PersistedSettings.json`, (err) => {
        if (err)
          console.log(err);
        else if (!isSaved)
          dispatch(eliminateConfiguration(name));
        else
          dispatch(refreshConfigurations());
      });
  };
}
