import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import pingGraph from './pingGraph';
import * as pingActions from '../../actions/pingActions';

function mapStateToProps(state) {
  return {
    pingsArray: state.ping.pingsArray,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(pingActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(pingGraph);
