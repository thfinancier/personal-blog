import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import postService from './postService'


const initialState = {
    posts: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}

export const createPost = createAsyncThunk('goals/create', async (postData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await postService.createPost(postData, token)
    } catch (error) {
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// underscore there does not do anything, it is there just to get thunkAPI because 2 params are needed
export const getPosts = createAsyncThunk('goals/get', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await postService.getPosts(token)
    } catch (error) {
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deletePost = createAsyncThunk('goals/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await postService.deletePost(id, token)
    } catch (error) {
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const postSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts.push(action.payload)
            })
            .addCase(createPost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getPosts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = action.payload
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deletePost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                // to remove deleted post from ui right away
                state.posts = state.posts.filter((post) => post._id !== action.payload.id)
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})


export const { reset } = postSlice.actions
export default postSlice.reducer 