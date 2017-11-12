// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PingGraph from './PingGraph';
import * as pingActions from '../../actions/pingActions';

function mapStateToProps(state) {
  return {
    pingsArray: state.ping.pingsArray,
    pingInterval: state.settings.local.ping.interval
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(pingActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PingGraph);
