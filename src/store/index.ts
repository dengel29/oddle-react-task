import { configureStore, Action } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import { combineReducers } from 'redux';
import rootReducer, {RootState} from './rootReducer';
import usersSlice from './usersSlice';


const store = configureStore({
  reducer: rootReducer,
});


export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export default store;