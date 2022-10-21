import { Player } from '../client/redux/dataStructure';

export const MAIN_THEME = {
  color: '#1B1A17',
  fontColor: '#FFFFFF',
  fontColorSecondary: '#F0A500',
  backgroundGrey: '#B8C2CC',
};

export const DEFAULT_LINEUP = [
  new Player(1, 'Micah Christenson', 'S'),
  new Player(2, 'Thomas Jaeschke', 'OH'),
  new Player(3, 'Tyler Mitchem', 'MB'),
  new Player(4, 'Matt Anderson', 'OPP'),
  new Player(5, 'Cody Kessel', 'OH'),
  new Player(6, 'Max Holt', 'MB'),
  new Player(7, '7', 'MB'),
  new Player(8, '8', 'MB'),

];

export const DEFAULT_PLAYER_COUNT = 8;
