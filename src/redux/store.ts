import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

import userInfoReducer from './features//user-slice'
import paginationReducer from './features/pagination-slice'

export const store = configureStore({
  reducer: {
    userInfoReducer,
    paginationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
