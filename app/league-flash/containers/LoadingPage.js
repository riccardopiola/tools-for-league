import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loading from '../components/Loading';
import * as DataActions from '../actions/dataActions';
import { changeRoute } from '../actions/appActions';
import { initiateActiveChampionsArray } from '../actions/gameActions';
import { initiateTimers } from '../actions/timerActions';
import { uploadGameData } from '../actions/firebaseActions';

function mapStateToProps(state) {
  return {
    settings: state.app.settings,
    progressbar: state.data.progressbar,
    activeChampions: state.game.activeChampions
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...DataActions,
    initiateActiveChampionsArray,
    initiateTimers,
    changeRoute,
    uploadGameData
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
