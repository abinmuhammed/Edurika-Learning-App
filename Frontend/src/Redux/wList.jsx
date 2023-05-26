import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE={
    isLoggedIn:false,
    userData:null

}

const userSlice=createSlice({
name:"user",
initialState:INITIAL_STATE,
reducers:{
   login:(state,action)=>{
    state.isLoggedIn=true;
    state.userData=action.payload
   },
   logout:(state,action)=>{
    state.isLoggedIn=false
    state.userData=null
   }
}
})


export const{login,logout}=userSlice.actions
export default userSlice.reducer