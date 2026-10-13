import { createSlice } from "@reduxjs/toolkit";


const toogleSlice = createSlice({
    name : "toogleSlice",
    initialState : {
        searchBarToogle : false,
        loginToggle : false,
    },
    reducers : {
        // actions
       toogleSearchBar : (state) => {
        // just false ko true bana dena hai
        state.searchBarToogle = !state.searchBarToogle
       },
       toggleLogin : (state) => {
        state.loginToggle = !state.loginToggle
       }
    }
})

export const {toogleSearchBar, toggleLogin} = toogleSlice.actions;
export default toogleSlice.reducer;