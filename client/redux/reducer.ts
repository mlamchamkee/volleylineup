import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DEFAULT_PLAYER_COUNT, DEFAULT_LINEUP } from '../../utils/constants';
import { AppStateType, RowType } from '../../utils/types';
import { Player } from './dataStructure';

const initialState: AppStateType = {
  playerCount: DEFAULT_PLAYER_COUNT,
  lineup: DEFAULT_LINEUP,
  currentLineup: DEFAULT_LINEUP,
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
  },
});

export const {
  setPlayerCount,
  updateLineup,
  rotate,
} = appSlice.actions;

export default appSlice.reducer;
