type Player = {
  num: number,
  name: string,
  position: PositionType,
};
export type GlobalError = {
  log: string;
  status: number;
  message: { err: string };
};

export type PositionType = 'S' | 'MB' | 'OH' | 'OPP' | 'UTL' | 'LIB' | 'DS';

export type PositionFullType = 'Setter' | 'Middle Blocker' | 'Outside Hitter' | 'Opposite' | 'Utility' | 'Libero' | 'Defensive Sepcialist';

export type LineupType = Array<Player>;

export type RowType = {
  id: number,
  num: number,
  name: string,
  position: PositionType,
};

export type AppStateType = {
  playerCount: number,
  lineup: LineupType,
  cacheLineup: LineupType | null,
  currentLineup: LineupType,
  showLogin: boolean,
  showSavePopover: boolean,
  isLoggedIn: boolean | undefined,
  email: string | undefined,
  picture: string | undefined,
};

export type PostLineupPayload = {
  playerCount: number,
  lineup: Array<Player>,
};
