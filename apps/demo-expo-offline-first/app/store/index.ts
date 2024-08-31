import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reducer as networkReducer } from 'react-native-offline';

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
