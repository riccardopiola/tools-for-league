import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ConfigSwapper from '../components/ConfigSwapper/ConfigSwapper';
import * as pingActions from '../actions/pingActions';

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(pingActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigSwapper);