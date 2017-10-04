// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Ping from '../components/Ping/Ping';
import * as pingActions from '../actions/pingActions';

function mapStateToProps(state) {
  return {
    preferredServer: state.settings.local.general.preferredServer,
    display: state.ping.display,
    completed: state.ping.completed
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(pingActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Ping);
