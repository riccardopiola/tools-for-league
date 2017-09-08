import calculatePingNode from '../node/nodePing';

export const NEW_PING = 'NEW_PING';
export const REFRESHING_PING = 'REFRESHING_PING';
export const END_LOADING = 'END_LOADING';
export const CHANGE_READY_STATE = 'CHANGE_READY_STATE';
export const RESET_PING = 'RESET_PING';

let intervalReference;

export function startLoading(max) {
  return (dispatch, getState) => {
    intervalReference = setInterval(() => {
      if (getState().ping.completed < max + 1000)
        dispatch({ type: REFRESHING_PING });
      else {
        dispatch({ type: END_LOADING });
        clearInterval(intervalReference);
      }
    }, 1000);
  };
}

export function resetPing() {
  return {
    type: RESET_PING
  };
}

export function changeReadyState(ready) {
  return {
    type: CHANGE_READY_STATE,
    value: ready
  };
}

export function calculatePing(timeout, server) {
  return dispatch => {
    calculatePingNode(timeout, server)
      .then(data => {
        dispatch({
          type: NEW_PING,
          value: data
        });
      })
      .catch((errorMessage) => {
        console.error(errorMessage);
      });
  };
}
