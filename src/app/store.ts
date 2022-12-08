import { configureStore, Store } from '@reduxjs/toolkit'
import tasklistsReducer from './tasklists/tasklistsSlice';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
/*   stateReconciler: autoMergeLevel1, */
}

const persistedReducer = persistReducer(persistConfig, tasklistsReducer);

export const store =  configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export let persistor = persistStore(store)