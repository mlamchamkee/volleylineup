import axios from 'axios';
import Cookies from 'js-cookie';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DEFAULT_LINEUP, DEFAULT_PLAYER_COUNT } from '../../utils/constants';
import { AppStateType, PostLineupPayload, RowType } from '../../utils/types';
import Player from './dataStructure';

const initialState: AppStateType = {
  playerCount: DEFAULT_PLAYER_COUNT,
  lineup: DEFAULT_LINEUP,
  currentLineup: DEFAULT_LINEUP,
  showLogin: false,
  showSaveDialog: false,
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
  extraReducers: (builder) => {
    builder.addCase(postLineup.fulfilled, (state: AppStateType) => {
      console.log('Lineup Saved');
      state.showSaveDialog = true;
    });
  },
});

const thunks = {
  postLineup: createAsyncThunk(
    'app/saveLineup',
    async (payload: PostLineupPayload) => {
      let response;
      try {
        response = await axios.post(
          '/api/lineup/',
          { playerCount: payload.playerCount, lineup: JSON.stringify(payload.lineup) },
        );
      } catch (error) {
        console.log('app/saveLineup', error);
      }
      return response;
    },
  ),
};

export const {
  setPlayerCount,
  updateLineup,
  rotate,
  toggleLogin,
  clearCookies,
  syncCookies,
} = appSlice.actions;

export const { postLineup } = thunks;

export default appSlice.reducer;
