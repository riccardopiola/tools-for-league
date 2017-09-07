const exec = require('child_process').exec;

export default function calculatePingNode(timeout, server) {
  return new Promise((resolve, reject) => {
    const serverIP = getServerIP(server, reject);
    exec(`ping ${serverIP}`, { timeout }, (error, stdout, stderr) => {
      if (stderr.length > 0)
        reject(stderr);
      resolve(processData(stdout));
    });
  });
}

function getServerIP(server, reject) {
  switch (server) {
    case 'EUW':
      return '104.160.141.3';
    case 'EUNE':
      return '104.160.142.3';
    case 'NA':
      return '104.160.131.3';
    case 'OCE':
      return '104.160.156.1';
    case 'LAN':
      return '104.160.136.3';
    default:
      reject('Cannot find server IP');
  }
}

// Working for macOS
function processData(stringOfData) {
  const stringArray = stringOfData.split('\n');
  const cutStringArray = stringArray.slice(1, stringArray.length - 1);
  const pingsArray = cutStringArray.map(line => line.slice(52, 58));
  const sum = pingsArray.reduce((prev, valueString) => {
    const valueNumber = Number.parseFloat(valueString);
    return prev + valueNumber;
  }, 0);
  return Math.round(sum / pingsArray.length);
}
