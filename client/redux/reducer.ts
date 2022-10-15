import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DEFAULT_PLAYER_COUNT, DEFAULT_LINEUP } from '../../constants';
import { appStateType, LineupType } from '../../types';

const initialState: appStateType = {
  playerCount: DEFAULT_PLAYER_COUNT,
  lineup: DEFAULT_LINEUP,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setPlayerCount: (
      state: appStateType,
      action: PayloadAction<number>
    ) => {
      state.playerCount = action.payload;
    },
    setLineup: (
      state: appStateType,
      action: PayloadAction<LineupType>
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
