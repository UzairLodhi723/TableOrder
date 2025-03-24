import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import { setupListeners } from "@reduxjs/toolkit/query";
import { tableOder } from "./rtk";
import  storage  from "redux-persist/lib/storage";

const initialState = {
  token: null,
};
const persistConfig = {
  key: 'root',
  storage
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addtoken: (state, action) => {
      return {
        ...state,
        token: action.payload.token,
      };
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  [tableOder.reducerPath]: tableOder.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer as any);
export const { addtoken, clearToken } = authSlice.actions;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(tableOder.middleware as any)
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);


