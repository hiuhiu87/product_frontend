import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    userInfor: null,
    success: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {},
})

export default authSlice.reducer;

