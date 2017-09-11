import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Ping from '../components/Ping/Ping';
import * as pingActions from '../actions/pingActions';

function mapStateToProps(state) {
  return {
    completed: state.ping.completed,
    ping: state.ping.ping,
    ready: state.ping.ready,
    preferredServer: state.settings.general.preferredServer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(pingActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Ping);
