import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {AppThunk} from './index'
import callGithubAPI from '../utils/call-github-api';

let initialState = {
  login: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<string>) {
      state.login = action.payload
    },
    // toggleTodo(state, action) {
    //   const todo = state.find(todo => todo.id === action.payload)
    //   if (todo) {
    //     todo.completed = !todo.completed
    //   }
    // }
  }
})

