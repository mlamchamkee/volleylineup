import {Player} from '../client/redux/dataStructure'

export const MAIN_THEME = {
  color: '#1B1A17',
  fontColor: '#FFFFFF',
  fontColorSecondary: '#F0A500',
}

export const DEFAULT_LINEUP = [
  new Player(1, 'Matt Anderson', 'OPP'),
  new Player(2, 'Micah Christenson', 'S')
]

export const DEFAULT_PLAYER_COUNT = 8;