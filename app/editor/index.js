// @flow
import React from 'react';
import { render } from 'react-dom';
import { ipcRenderer } from 'electron';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { lightModifications } from '../themes';

import Editor from './Editor';

const lightTheme = getMuiTheme(lightBaseTheme, lightModifications);

const Root = (props) => (
  <MuiThemeProvider theme={lightTheme}>
    <Editor settings={JSON.parse(props.settings)} />
  </MuiThemeProvider>
);
ipcRenderer.on('settings', (e, settings) => {
  console.log(JSON.parse(settings));
  render(<Root settings={settings} />, document.getElementById('root'));
});
