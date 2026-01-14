import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaginationState {
  page: number;
  limit: number;
}

const initialState: PaginationState = {
  page: 1,
  limit: 10,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },

    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
      state.page = 1;
    },

    resetPagination() {
      return initialState;
    },
  },
});

export const {
  setPage,
  setLimit,
  resetPagination,
} = paginationSlice.actions;

export default paginationSlice.reducer;
