import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/slice";
import { conversationReducer } from "./conversation/slice";
import { configReducer } from "./config/slice";

export const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  conversation: conversationReducer,
  config: configReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
