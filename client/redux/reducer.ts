import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DEFAULT_PLAYER_COUNT, DEFAULT_LINEUP } from '../../constants';
import { AppStateType, LineupType } from '../../types';

const initialState: AppStateType = {
  playerCount: DEFAULT_PLAYER_COUNT,
  lineup: DEFAULT_LINEUP,
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
    },
    setLineup: (
      state: AppStateType,
      action: PayloadAction<LineupType>,
    ) => {
      state.lineup = action.payload;
    },
  },
});

export const {
  setPlayerCount,
  setLineup,
} = appSlice.actions;

export default appSlice.reducer;
