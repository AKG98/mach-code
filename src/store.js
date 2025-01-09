import { configureStore } from "@reduxjs/toolkit";
import counterSlice  from "./redux/CounterSlice";

export const store = configureStore({
    reducer:{
        counter:counterSlice
    },
})