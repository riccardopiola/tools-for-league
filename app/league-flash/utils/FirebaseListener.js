// @flow
import { activateTimerFromFirebase, terminateTimerFromFirebase } from '../actions/firebaseActions';

export default class FirebaseListener {
  db: any;
  dispatch: any
  constructor(db: any, dispatch: any, gameId: string) {
    this.db = db;
    this.dispatch = dispatch;
    this.gameId = gameId;
  }
  setupListeners() {
    const timersRef = this.db.ref('leagueFlash').child(this.gameId).child('timers');

    // When a new spell timer is remotely found
    timersRef.on('child_added', snap => {
      const { summonerName, spellName, endAt } = snap.val();
      this.dispatch(activateTimerFromFirebase(summonerName, spellName, endAt));
    });

    // When a spell timer is remotely removed
    timersRef.on('child_removed', snap => {
      const { summonerName, spellName } = snap.val();
      this.dispatch(terminateTimerFromFirebase(summonerName, spellName));
    });
  }
  removeListeners() {
    const timersRef = this.db.ref('leagueFlash').child(this.gameId).child('timers');

    // Remove all listeners
    timersRef.off();
  }
}
