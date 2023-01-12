import axios from 'axios';
import Cookies from 'js-cookie';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DEFAULT_LINEUP, DEFAULT_PLAYER_COUNT } from '../../utils/constants';
import { AppStateType, PostLineupPayload, RowType } from '../../utils/types';
import player from './dataStructure';

const initialState: AppStateType = {
  playerCount: Number(sessionStorage.getItem('playerCount')) || DEFAULT_PLAYER_COUNT,
  lineup: DEFAULT_LINEUP,
  cacheLineup: JSON.parse(sessionStorage.getItem('lineup')),
  currentLineup: DEFAULT_LINEUP,
  showLogin: false,
  showCreateAccount: false,
  showSavePopover: false,
  isLoggedIn: Boolean(Cookies.get('isLoggedIn')),

  email: Cookies.get('email'),
  picture: Cookies.get('picture'),
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    cacheLineup: (state: AppStateType) => {
      sessionStorage.setItem('playerCount', String(state.playerCount));
      sessionStorage.setItem('lineup', JSON.stringify(state.lineup));
    },
    clearCacheLineup: (state: AppStateType) => {
      state.cacheLineup = null;
    },
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
      const newPlayer = player(Number(newRow.num), newRow.name, newRow.position);
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
    clearCookies: () => {
      Cookies.remove('isLoggedIn');
      Cookies.remove('picture');
      Cookies.remove('email');
    },
    syncCookies: (
      state: AppStateType,
    ) => {
      state.isLoggedIn = Boolean(Cookies.get('isLoggedIn'));
      state.email = Cookies.get('email');
      state.picture = Cookies.get('picture');
    },
    toggleSavePopover: (
      state: AppStateType,
    ) => {
      state.showSavePopover = !state.showSavePopover;
    },
    toggleCreateAccount: (
      state: AppStateType,
    ) => {
      state.showCreateAccount = !state.showCreateAccount;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postLineup.fulfilled, (state: AppStateType) => {
      state.showSavePopover = true;
    });
    builder.addCase(getLineup.fulfilled, (state: AppStateType, action: any) => {
      if (action.payload) state.lineup = action.payload;
    });
  },
});

const thunks = {
  postLineup: createAsyncThunk(
    'app/postLineup',
    async (payload: PostLineupPayload) => {
      let response;
      try {
        response = await axios.post(
          '/api/lineup/',
          { playerCount: payload.playerCount, lineup: JSON.stringify(payload.lineup) },
        );
      } catch (error) {
        console.log('app/postLineup', error);
      }
      return response?.data[0];
    },
  ),
  getLineup: createAsyncThunk(
    'app/getLineup',
    async (playerCount: number) => {
      let response;
      let lineup;
      try {
        response = await axios.get(
          `/api/lineup/${playerCount}`,
        );
      } catch (error) {
        console.log('app/getLineup', error);
      }
      if (response?.data.lineup) lineup = JSON.parse(response?.data.lineup);
      return lineup;
    },
  ),
};

export const {
  cacheLineup,
  clearCacheLineup,
  setPlayerCount,
  updateLineup,
  rotate,
  toggleLogin,
  clearCookies,
  syncCookies,
  toggleSavePopover,
  toggleCreateAccount,
} = appSlice.actions;

export const { postLineup, getLineup } = thunks;

export default appSlice.reducer;
