
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUser: null,
    loading: false,
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) =>{
            state.loading = true;
            state.error = null;
        },
        signInFailure: (state, action) =>{
            state.loading = false;
            state.error = action.payload;
        },
        signInSuccess: (state, action) =>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateStart: (state) =>{
            state.loading = true;
            state.error = null;
        },
        updateFailure: (state, action) =>{
            state.loading = false;
            state.error = action.payload;
        },
        updateSuccess: (state, action) =>{
            state.loading = false;
            state.error = null;
            state.currentUser = action.payload;
        },
    },
});

export const { signInStart, signInFailure, signInSuccess, updateStart, updateFailure, updateSuccess } = userSlice.actions

export default userSlice.reducer