export type TooltipSettings = {
  position: 'left' | 'right',
  locked: boolean,
  mode: 'position' | 'size'
}

export type SelectorsStore = {
  'left:summoner1:spell1': SelectorObj,
  'left:summoner1:spell2': SelectorObj,
  'left:summoner2:spell1': SelectorObj,
  'left:summoner3:spell1': SelectorObj,
  'left:summoner4:spell1': SelectorObj,
  'left:summoner5:spell1': SelectorObj,
  'right:summoner1:spell1': SelectorObj
};

export type SelectorObj = {
  x: number,
  y: number,
  height: number,
  width: number
}
