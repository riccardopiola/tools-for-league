// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Settings from '../components/Settings/API/Wrapper';
import * as appActions from '../actions/appActions';
import * as settingsActions from '../actions/settingsActions';

function mapStateToProps(state) {
  return {
    wannaGoTo: state.app.wannaGoTo,
    settings: state.settings.local,
    stagedChanges: state.settings.stagedChanges,
    permissionToExit: state.app.permissionToExit,
    openExitDialog: state.settings.openExitDialog,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...settingsActions, ...appActions },
    dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
