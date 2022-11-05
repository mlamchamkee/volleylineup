import player from '../client/redux/dataStructure';

export const MAIN_THEME = {
  color: '#1B1A17',
  fontColor: '#FFFFFF',
  fontColorSecondary: '#F0A500',
  backgroundGrey: '#B8C2CC',
};

export const LIGHT_THEME = {
  color: '#1B1A17',
  fontColor: '#FFFFFF',
  fontColorSecondary: '#F0A500',
  backgroundGrey: '#B8C2CC',
};

export const DEFAULT_LINEUP = [
  player(1, 'Micah Christenson', 'S'),
  player(2, 'Thomas Jaeschke', 'OH'),
  player(3, 'Tyler Mitchem', 'MB'),
  player(4, 'Matt Anderson', 'OPP'),
  player(5, 'Cody Kessel', 'OH'),
  player(6, 'Max Holt', 'MB'),
  player(7, '7', 'OH'),
  player(8, '8', 'MB'),
  player(9, '9', 'OPP'),
  player(10, '10', 'MB'),

];

export const DEFAULT_PLAYER_COUNT = 8;
