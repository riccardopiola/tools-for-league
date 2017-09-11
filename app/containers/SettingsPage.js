import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Settings from '../components/Settings/Settings';
import * as appActions from '../actions/appActions';
import * as settingsActions from '../actions/settingsActions';

function mapStateToProps(state) {
  return {
    settings: state.settings,
    ...state.app
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...settingsActions, ...appActions },
    dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
