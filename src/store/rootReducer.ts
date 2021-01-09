import { combineReducers } from '@reduxjs/toolkit'
import usersDisplaySlice from './usersSlice'
const rootReducer = combineReducers({
  usersDisplay: usersDisplaySlice.reducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer