import { createSlice, createAsyncThunk } from 'react-redux'


const initialState = {
    goals: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}

const goalSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        reset: (state) => initialState
    }
})


export const { reset } = goalSlice.actions
export default goalSlice.reducer 