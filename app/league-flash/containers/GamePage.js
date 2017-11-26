import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Game from '../components/Game';
import * as GameActions from '../actions/gameActions';
import * as TimerActions from '../actions/timerActions';
import { changeRoute } from '../actions/appActions';

function mapStateToProps(state) {
  return {
    activeChampions: state.game.activeChampions,
    displayAll: state.game.displayAll,
    clickEnabled: state.game.clickEnabled,
    timers: state.timers
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...GameActions, ...TimerActions, changeRoute }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
