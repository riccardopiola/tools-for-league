import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ConfigSwapper from '../components/ConfigSwapper/ConfigSwapper';
import * as configActions from '../actions/configActions';

function mapStateToProps(state) {
  return {
    savedConfigurations: state.config.savedConfigurations,
    tempConfigurations: state.config.tempConfigurations
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(configActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigSwapper);
