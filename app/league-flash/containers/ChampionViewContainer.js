import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ChampionView from '../components/subcomponents/ChampionView';
import * as GameActions from '../actions/gameActions';
import * as TimerActions from '../actions/timerActions';

function mapStateToProps(state, ownProps) {
  return {
    currentPatch: state.data.currentPatch,
    chTimers: state.timers[ownProps.info.summonerName]
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...GameActions, ...TimerActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChampionView);
