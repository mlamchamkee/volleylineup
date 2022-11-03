import Cookies from 'js-cookie';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DEFAULT_LINEUP, DEFAULT_PLAYER_COUNT } from '../../utils/constants';
import { AppStateType, RowType } from '../../utils/types';
import Player from './dataStructure';

const initialState: AppStateType = {
  playerCount: DEFAULT_PLAYER_COUNT,
  lineup: DEFAULT_LINEUP,
  currentLineup: DEFAULT_LINEUP,
  showLogin: false,
  isLoggedIn: Boolean(Cookies.get('isLoggedIn')),
  email: Cookies.get('email'),
  picture: Cookies.get('picture'),
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setPlayerCount: (
      state: AppStateType,
      action: PayloadAction<number>,
    ) => {
      state.playerCount = action.payload;
      state.currentLineup = state.lineup.filter((el) => el.num < state.playerCount + 1);
    },
    updateLineup: (
      state: AppStateType,
      action: PayloadAction<RowType>,
    ) => {
      const newRow = action.payload;
      const newPlayer = new Player(Number(newRow.num), newRow.name, newRow.position);
      state.lineup[action.payload.id] = newPlayer;

      const arrNum = state.currentLineup.map((el) => el.num);
      const idxUpdate = arrNum.indexOf(action.payload.num);
      state.currentLineup[idxUpdate] = newPlayer;
    },
    rotate: (
      state: AppStateType,
    ) => {
      state.currentLineup.push(state.currentLineup.shift());
    },
    toggleLogin: (
      state: AppStateType,
    ) => {
      state.showLogin = !state.showLogin;
    },
    clearCookies: (
      state: AppStateType,
    ) => {
      Cookies.remove('isLoggedIn');
      Cookies.remove('email');
      Cookies.remove('picture');
    },
    syncCookies: (
      state: AppStateType,
    ) => {
      state.isLoggedIn = Boolean(Cookies.get('isLoggedIn'));
      state.email = Cookies.get('email');
      state.picture = Cookies.get('picture');
    },
  },
});

export const {
  setPlayerCount,
  updateLineup,
  rotate,
  toggleLogin,
  clearCookies,
  syncCookies,
} = appSlice.actions;

export default appSlice.reducer;
