import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "../redux/courses/courseSlice";
import studentReducer from "../redux/students/studentSlice";

export const store = configureStore({
    reducer:{
        courses:courseReducer,
        student:studentReducer,
    }
})