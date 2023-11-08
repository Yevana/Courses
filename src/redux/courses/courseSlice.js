import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    courseLists: [],
    detailCourse: null,
    loading: false,
    error: null
};

export const courseListFetch = createAsyncThunk('courses/courseList',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get('http://localhost:5000/courses');
            return res?.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
)

export const getCourseFetch = createAsyncThunk('courses/getCourseList',
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`http://localhost:5000/courses/${id}`);
            return res?.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
)

const courseReducer = createSlice({
    name:'courses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(courseListFetch.pending,(state) => {
            state.loading = true;
        })
        .addCase(courseListFetch.fulfilled,(state,action) => {
            state.loading = false;
            state.courseLists = action.payload;
        })
        .addCase(courseListFetch.rejected,(state,action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(getCourseFetch.pending,(state) => {
            state.loading = true;
        })
        .addCase(getCourseFetch.fulfilled,(state,action) => {
            state.loading = false;
            state.detailCourse = action.payload;
        })
        .addCase(getCourseFetch.rejected,(state,action) => {
            state.loading = false;
            state.error = action.error.message;
        })

    }

})

export const { serachCourse } = courseReducer.actions;

export default courseReducer.reducer;