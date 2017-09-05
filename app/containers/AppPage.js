import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
