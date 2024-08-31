import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { reducer as networkReducer } from 'react-native-offline';

let AsyncStorage;
if (typeof window !== 'undefined') {
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
} else {
  AsyncStorage = {
    getItem: () => Promise.resolve(null),
    setItem: () => Promise.resolve(),
  };
}

const rootReducer = combineReducers({
  network: networkReducer,
  // your other reducers here
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['yourReducer'], // Specify which reducers to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);