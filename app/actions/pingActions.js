import calculatePingNode from '../node/nodePing';

export const NEW_PING = 'NEW_PING';
export const REFRESHING_PING = 'REFRESHING_PING';
export const RESET_PING = 'RESET_PING';

let intervalReference;

export function startLoading() {
  return dispatch => {
    dispatch({ type: RESET_PING });
    intervalReference = setInterval(() => {
      dispatch({ type: REFRESHING_PING });
    }, 1000);
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
        clearInterval(intervalReference);
      })
      .catch((errorMessage) => {
        console.error(errorMessage);
        clearInterval(intervalReference);
      });
  };
}
