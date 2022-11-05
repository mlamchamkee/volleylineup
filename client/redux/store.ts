import { useDispatch, useSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import type { TypedUseSelectorHook } from 'react-redux';
import appReducer from './reducer';

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ['app/getLineup/pending', 'app/getLineup/fulfilled', 'app/updateLineup', 'app/setPlayerCount'],
      // Ignore these field paths in all actions
      ignoredActionPaths: ['app/getLineup/pending', 'app/getLineup/fulfilled', 'app/updateLineup', 'app/setPlayerCount'],
      // Ignore these paths in the state
      // ignoredPaths: ['items.dates'],
      ignoredPaths: ['app/getLineup/pending', 'app/getLineup/fulfilled', 'app/updateLineup', 'app/setPlayerCount'],
    },
  }),
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
