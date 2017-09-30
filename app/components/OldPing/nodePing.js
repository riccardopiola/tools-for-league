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
          console.log("New round");
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
      console.log(new Date(startDate));
      const session = ping.createSession(options);
      console.log("Session created");
      session.on('error', (error) => {
        console.error("Error", error);
      });
      session.pingHost(serverIP, (error, target, sent, rcvd) => {
        console.log("Callback fired");
        const ms = rcvd - sent;
        console.log(typeof ms, ms);
        if (!ms) debugger;
        if (error) {
          console.error("Error in callback", error);
          session.close();
          gen.throw(error);
        } else {
          const delta = Date.now() - startDate;
          console.log(delta);
          if (delta < 1000) {
            setTimeout(() => {
              session.close();
              console.log("success");
              gen.next(ms);
            }, 1000 - delta);
          } else {
            session.close();
            console.log("success delay");
            gen.next(ms);
          }
        }
      });
    }
  });
}
