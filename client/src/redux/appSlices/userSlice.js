
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
        deleteUserStart: (state) =>{
            state.loading = true;
            state.error = null;
        },
        deleteUserFailure: (state, action) =>{
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserSuccess: (state, action) =>{
            state.loading = false;
            state.error = null;
            state.currentUser = null;
        },
        logoutUserStart: (state)=>{
            state.loading = true;
            state.error = null;
        },
        logoutUserFailure: (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        logoutUserSuccess: (state, action)=>{
            state.loading = false;
            state.error = null;
            state.currentUser = null;
        }
    },
});

export const { signInStart, signInFailure, signInSuccess, 
               updateStart, updateFailure, updateSuccess,
               deleteUserStart, deleteUserFailure, deleteUserSuccess, 
               logoutUserStart, logoutUserFailure, logoutUserSuccess } = userSlice.actions

export default userSlice.reducer