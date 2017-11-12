// @flow
import ping from 'net-ping';
import type { Action, ThunkAction, Dispatch, GetState } from './Actions.flow';

export function startPing(): Action {
  return {
    type: 'START_PING'
  };
}

export function resetPing(): Action {
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

export function getPings(max: number, server: string): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    const pingInterval = getState().settings.local.ping.interval;
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
      if (typeof error === 'object')
        dispatch({
          type: 'NEW_PING',
          value: error
        });
      else
        console.error(error);
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
      if (error) {
        if ((Date.now() - timestamp) > pingInterval)
          reject({ error, index: i, timestamp });
        else {
          setTimeout(() => {
            reject({ error, index: i, timestamp });
          }, pingInterval - ms);
        }
      } else if (ms > pingInterval) {
        resolve({ ms, index: i, timestamp });
      } else {
        setTimeout(() => {
          resolve({ ms, index: i, timestamp });
        }, pingInterval - ms);
      }
    });
  });
}
