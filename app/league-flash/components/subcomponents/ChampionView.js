// @flow
import React from 'react';
import type { ActiveChampionObj } from '../../reducers/gameReducer';
import type { SpellsEnum } from '../../reducers/timerReducer';
import Timer from './Timer';

import styles from '../../styles/Game.css';

type Props = {
  info: ActiveChampionObj,
  toggleTimer: (summonerName: string, spellEnum: 'spell1' | 'spell2') => void,
  currentPatch: string,
  index: number,
  chTimers: Map<SpellsEnum, number>
}

const ChampionView = (props: Props) => {
  const { info, chTimers } = props;
  const baseURL = `http://ddragon.leagueoflegends.com/cdn/${props.currentPatch}/img`;
  return (
    <div className={styles.championViewContainer}>
      <img
        src={`${baseURL}/champion/${info.championId}.png`}
        alt={info.championName}
        className={styles.championImage}
      />
      <div className={styles.summonerSpells}>
        <div className={styles.summonerSpellLine}>
          <img
            src={`${baseURL}/spell/${info.spell1.spellId}.png`}
            alt={info.spell1.spellName}
            onClick={() => props.toggleTimer(info.summonerName, 'spell1')}
          />
          {
            (chTimers.has('spell1')) ?
              // $FlowFixMe
              <Timer
                timeout={chTimers.get('spell1')}
                spellColor={info.spell1.spellColor}
              /> : null
          }
        </div>
        <div className={styles.summonerSpellLine}>
          <img
            src={`${baseURL}/spell/${info.spell2.spellId}.png`}
            alt={info.spell2.spellName}
            onClick={() => props.toggleTimer(info.summonerName, 'spell2')}
          />
          {
            (chTimers.has('spell2')) ?
              // $FlowFixMe
              <Timer
                timeout={chTimers.get('spell2')}
                spellColor={info.spell2.spellColor}
              /> : null
          }
        </div>
      </div>
    </div>
  );
};

export default ChampionView;
