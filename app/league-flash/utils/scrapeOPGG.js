/* eslint no-underscore-dangle: "off" */
console.log('file injected');
window.__scraper = {};
window.__devtron = { require, process };

/**
 * __scraper.dataObj = {
 * 
 *  enemyTeam: 'Team-100' | 'Team-200',
 *  timestamp: TIMESTAMP(seconds accurate),
 *  enemies: Array<{
 *     championName: string,
 *     name: string::username,
 *     spell1: string::SummonerFlash,
 *     spell2: string,
 *   }>
 * }
 * 
 * Application steps:
 * __scraper.ipc.on('did-finish-load')
 * __scraper.scrapContents()
 * __scraper.Generator => __scraper.iterateGenerator()
 * __scraper.wrapAll()
 */
__scraper.ipc = require('electron').ipcRenderer;

__scraper.eventFire = (el, etype) => {
  if (el.fireEvent) {
    el.fireEvent(`on${etype}`);
  } else {
    const evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
};

// I need this stupid generator for asyncronous workloads
// because async/await are not yet implemented in Chromium
// Wait, if I can run node maybe I can run async/await too?
// Probably not but maybe it'll be worth giving it a try
__scraper.Generator = function* (teamClass) {
  let counter = 0;
  for (const userNode of document.querySelectorAll(`table.Table.${teamClass} > tbody > tr`)) {
    // Get the champion
    const spriteNode = userNode.children[0].children[0];
    __scraper.eventFire(spriteNode, 'mouseover'); // Show tooltip
    __scraper.interval = setInterval(() => {
      const tooltipNode = document.querySelector('div.tpd-content-relative-padder > div');      
      if (tooltipNode) {
        clearInterval(__scraper.interval);
        __scraper.eventFire(spriteNode, 'mouseout'); // Remove tooltip
        __scraper.iterateGenerator(tooltipNode.innerHTML, counter);
      }
    }, 100);
    yield;
    counter += 1;
  }
  __scraper.wrapAll();
};

__scraper.wrapAll = () => {
  console.log(__scraper.dataObj);
  __scraper.ipc.sendSync('finished-scraping-data', 'ok', JSON.stringify(__scraper.dataObj));
};

__scraper.iterateGenerator = (championName, counter) => {
  __scraper.dataObj.enemies[counter].championName = championName;
  __scraper.gen.next();
};

__scraper.scrapContents = () => {
  const dataObj = {
    enemies: []
  };
  // Find the enemy team className ('Team-100' || 'Team-200')
  const actualSummonerName = document.querySelector('body > div.l-wrap.l-wrap--summoner > div.l-container > div.SummonerLayoutWrap > div > div.Header > div.Profile > div.Information > span').innerHTML;
  document.querySelectorAll('table.Table > tbody > tr').forEach(node => {
    if (node.childNodes[7].childNodes[1].innerHTML === actualSummonerName) {
      const isTeamOne = node.parentNode.parentNode.classList.contains('Team-100');
      dataObj.enemyTeam = (isTeamOne) ? 'Team-200' : 'Team-100';
    }
  });
  // Get the start of the game
  dataObj.timestamp = document.querySelector('#SummonerLayoutContent > div.tabItem.Content.SummonerLayoutContent.summonerLayout-spectator > div.SpectateSummoner > div > div.Title > small.Time > span')
    .attributes[1].nodeValue;
  // Main loop where we extract all the syncronous values
  document.querySelectorAll(`table.Table.${dataObj.enemyTeam} > tbody > tr`).forEach(userNode => {
    const userObject = {};
    // Get the summoner Name
    userObject.name = userNode.children[3].children[0].innerHTML;
    // Get the summoner spells
    const spell1SRC = userNode.children[1].children[0].children[0].src;
    userObject.spell1 = /spell\/(\w+)./.exec(spell1SRC)[1];
    const spell2SRC = userNode.children[1].children[1].children[0].src;
    userObject.spell2 = /spell\/(\w+)./.exec(spell2SRC)[1];
    // Save this profile's data
    dataObj.enemies.push(userObject);
  });
  __scraper.dataObj = dataObj;
  __scraper.gen = __scraper.Generator(dataObj.enemyTeam);
  __scraper.gen.next(); // Kick off the generator
  /* End of this function's life, continues in generator => iterateGenerator */
};

__scraper.ipc.on('did-finish-load', () => {
  debugger;
  console.log('ready');
  // See if the user is in a game
  const anchorElement = document.querySelector('body > div.l-wrap.l-wrap--summoner > div.l-container > div.SummonerLayoutWrap > div > div.Menu > dl > dd.Item.tabHeader.inGame > a');
  if (!anchorElement) {
    __scraper.ipc.sendSync('finished-scraping-data', 'not-found');
    return;
  }
  const isActive = anchorElement.classList.contains('SpectateTabButtonActive');
  if (isActive)
    __scraper.eventFire(anchorElement, 'click');
  else {
    __scraper.ipc.sendSync('finished-scraping-data', 'not-playing');
    return;
  }
  __scraper.interval = setInterval(() => {
    const test = document.querySelector('#SummonerLayoutContent > div.tabItem.Content.SummonerLayoutContent.summonerLayout-spectator > div.SpectateSummoner > div > div.Content > table.Table.Team-100 > thead > tr > th:nth-child(4)');
    if (test) {
      clearInterval(__scraper.interval);
      __scraper.scrapContents();
    }
  }, 300);
});
