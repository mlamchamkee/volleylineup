import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DEFAULT_PLAYER_COUNT, DEFAULT_LINEUP } from '../../utils/constants';
import { AppStateType, RowType } from '../../utils/types';
import { Player } from './dataStructure';

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
    updateLineup: (
      state: AppStateType,
      action: PayloadAction<RowType>,
    ) => {
      const newRow = action.payload;
      state.lineup[action.payload.id] = new Player(Number(newRow.num), newRow.name, newRow.position);
    },
  },
});

export const {
  setPlayerCount,
  updateLineup,
} = appSlice.actions;

export default appSlice.reducer;
