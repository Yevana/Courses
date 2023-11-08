import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    studentDetail: null,
    loading: false,
    error: null
};

export const studentDetailsFetach = createAsyncThunk('students/studentDeatil',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get('http://localhost:5000/courses');
            const allEnrolledCourses = res.data.map((course) => {
                const enrolledStudent = course.students.find((student) => student.email === 'grace@example.com');
                if (enrolledStudent) {
                    return {
                        ...course,
                        students: [enrolledStudent],
                    };
                } else {
                    return null;
                }
            }).filter((course) => course !== null);
            return allEnrolledCourses;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
)

export const updateCourseStatus = createAsyncThunk('students/courseStatu',
    async (data, { dispatch, rejectWithValue }) => {

        const updateCourse = {
            "students": [
                {
                    id: data.courseDetails.students[0].id,
                    name: data.courseDetails.students[0].name,
                    email: data.courseDetails.students[0].email,
                    completed: data.completed
                }
            ]
        };

        const id = data.courseDetails.id;

        const url = `http://localhost:5000/courses/${id}`;

        try {
            const res = await axios.patch(url, updateCourse);
            if (res.status === 200) {
                dispatch(studentDetailsFetach());
            }
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
})

const studentReducer = createSlice({
    name: 'students',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(studentDetailsFetach.pending, (state) => {
                state.loading = true;
            })
            .addCase(studentDetailsFetach.fulfilled, (state, action) => {
                state.loading = false;
                state.studentDetail = action.payload;
            })
            .addCase(studentDetailsFetach.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            })
            .addCase(updateCourseStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCourseStatus.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(updateCourseStatus.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            })
    }
})

export default studentReducer.reducer;