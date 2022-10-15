import {Player} from '../client/redux/dataStructure'

export type GlobalError = {
  log: string;
  status: number;
  message: { err: string };
};

export type PositionType = 'S' | 'MB' | 'OH' | 'OPP' | 'UTL' | 'LIB' | 'DS'

export type PositionFullType = 'Setter' | 'Middle Blocker' | 'Outside Hitter' | 'Opposite' | 'Utility' | 'Libero' | 'Defensive Sepcialist'

export type LineupType = Array<Player>

export type appStateType = {
  playerCount: number,
  lineup: LineupType,
}

