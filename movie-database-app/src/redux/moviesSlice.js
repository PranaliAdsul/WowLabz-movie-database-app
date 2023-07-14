import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedMovie: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    selectMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
  },
});

export const { selectMovie, clearSelectedMovie } = moviesSlice.actions;

export default moviesSlice.reducer;