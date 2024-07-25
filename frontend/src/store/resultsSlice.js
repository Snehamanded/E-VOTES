import { createSlice } from '@reduxjs/toolkit';

const resultsSlice = createSlice({
    name: 'results',
    initialState: {
        winner: '',
        totalVotes: '',
    },
    reducers: {
        declareResults: (state, action) => {
            state.winner = action.payload.winner;
            state.totalVotes = action.payload.totalVotes;
        },
    },
});

export const { declareResults } = resultsSlice.actions;
export default resultsSlice.reducer;