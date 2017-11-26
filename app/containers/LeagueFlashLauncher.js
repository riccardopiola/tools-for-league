// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LeagueFlash from '../components/LeagueFlash/LeagueFlash';
import * as configActions from '../actions/configActions';

function mapStateToProps(state) {
  return {
    leagueFlashSettings: state.settings.local.leagueFlash,
    generalSettings: state.settings.local.general
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(configActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LeagueFlash);
