// @flow
import ping from 'net-ping';
import {
  typeof dispatch as Dispatch,
  typeof getState as GetState
} from 'redux-thunk';

export function startPing() {
  return {
    type: 'START_PING'
  };
}

export function resetPing() {
  return {
    type: 'RESET_PING'
  };
}

const servers = {
  EUW: '104.160.141.3',
  EUNE: '104.160.142.3',
  NA: '104.160.131.3',
  OCE: '104.160.156.1',
  LAN: '104.160.136.3'
};

export function getPings(max: number, server: string) {
  return (dispatch: Dispatch, getState: GetState) => {
    const pingInterval = getState().settings.ping.interval;
    const tries = max / pingInterval;
    pingAsync(server, tries, dispatch, pingInterval);
  };
}

async function pingAsync(server, tries, dispatch, pingInterval) {
  const options = {
    networkProtocol: ping.NetworkProtocol.IPv4,
    packetSize: 16,
    retries: 1,
    sessionId: (process.pid % 65535),
    timeout: 2000,
    ttl: 128
  };

  const session = ping.createSession(options);
  const target = servers[server];

  for (let i = 0; i < tries; i++) { // eslint-disable-line
    try {
      const pingObj = await singlePing(session, target, i, pingInterval); // eslint-disable-line
      if (i === 0) continue; //eslint-disable-line
      dispatch({
        type: 'NEW_PING',
        value: pingObj
      });
    } catch (error) {
      dispatch({
        type: 'NEW_PING',
        value: { error }
      });
    }
    if (i === 1)
      dispatch({ type: 'DISPLAY_GRAPH' });
  }
  session.close();
  dispatch({ type: 'END_PING' });
}

function singlePing(session, target, i, pingInterval) {
  return new Promise((resolve, reject) => {
    const timestamp = Date.now();
    session.pingHost(target, (error, target2, sent, rcvd) => {
      const ms = rcvd - sent;
      if (error)
        reject(error);
      else
        if (ms > pingInterval)
          resolve({ ms, index: i, timestamp });
        else
          setTimeout(() => {
            resolve({ ms, index: i, timestamp });
          }, pingInterval - ms);
    });
  });
}
