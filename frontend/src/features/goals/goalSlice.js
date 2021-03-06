import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import goalService from './goalService'

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Create new Goal
export const createGoal = createAsyncThunk('goals/create', async (goalData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await goalService.createGoal(goalData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Get user goals
export const getGoals = createAsyncThunk('goals/getGoals', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await goalService.getGoals(token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Get single goal
export const getSingleGoal = createAsyncThunk('goals/getSingleGoal', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await goalService.getSingleGoal(id, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Delete user Goal
export const deleteGoal = createAsyncThunk('goals/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await goalService.deleteGoal(id, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Update user Goal
export const updateGoal = createAsyncThunk('goals/update', async (goalData, thunkAPI) => {
  const { id, text } = goalData
  try {
    const token = thunkAPI.getState().auth.user.token
    return await goalService.updateGoal(id, { text: text }, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})



export const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    resetGoals: (state) => {
      state.goals = []
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Goal
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals.push(action.payload)
        state.message = `Goal ${action.payload} created`
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        // state.message = action.error.payload
      })

      // Get Goals
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true
        // state.message = ''
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = action.payload
        state.message = ''
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        // state.message = action.error.payload
      })

      // Get single Goal
      .addCase(getSingleGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSingleGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = action.payload
        state.message = ''
      })
      .addCase(getSingleGoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        // state.message = action.error.payload
      })

      // Delete Goal
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload.id
        )
        state.message = `Goal ${action.payload.id} deleted`
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        // state.message = action.error.message
      })

      // Update Goal
      .addCase(updateGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = state.goals.map(
          goal => goal._id === action.payload._id ? { ...goal, text: action.payload.text } : goal
        )
        state.message = state.message = ''
      })
      .addCase(updateGoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        // state.message = action.error.message
      })
  }
})

export const { resetGoals } = goalSlice.actions
export default goalSlice.reducer