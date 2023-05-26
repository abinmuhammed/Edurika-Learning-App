import { configureStore } from "@reduxjs/toolkit";
import userReducer from './wList'
export const store= configureStore({
    reducer:{
        list:userReducer
    }
})