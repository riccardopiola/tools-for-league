import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import App from '../components/App';
import * as AppActions from '../actions/appActions';

function mapStateToProps(state) {
  return {
    appState: state.app
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AppActions, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
