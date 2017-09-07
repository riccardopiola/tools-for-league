const ping = require('net-ping');

const servers = {
  EUW: '104.160.141.3',
  EUNE: '104.160.142.3',
  NA: '104.160.131.3',
  OCE: '104.160.156.1',
  LAN: '104.160.136.3'
};

const options = {
  retries: 3,
  timeout: 1500
};

export default function calculatePingNode(duration, server) {
  return new Promise((resolve, reject) => {
    const serverIP = servers[server];
    const gen = pingGenerator(duration, serverIP, resolve, reject);
    gen.next();
    function* pingGenerator() {
      const pingsArray = [];
      let pinging = true;
      const timeoutReference = setTimeout(() => {
        clearTimeout(timeoutReference);
        pinging = false;
      }, duration);
      do {
        try {
          const onePing = yield singlePing(serverIP, this);
          pingsArray.push(onePing);
        } catch (e) {
          console.error(e);
        }
      } while (pinging);
      const sum = pingsArray.reduce((prev, value) => {
        return prev + value;
      }, 0);
      resolve(Math.round(sum / pingsArray.length));
    }
    function singlePing() {
      const startDate = Date.now();
      const session = ping.createSession(options);
      session.on('error', (error) => {
        console.trace(error.toString());
      });
      session.pingHost(serverIP, (error, target, sent, rcvd) => {
        const ms = rcvd - sent;
        if (error) {
          gen.throw(error);
        } else {
          const delta = Date.now() - startDate;
          if (delta < 1000) {
            setTimeout(() => {
              gen.next(ms);
            }, 1000 - delta);
          } else {
            gen.next(ms);
          }
        }
      });
    }
  });
}
