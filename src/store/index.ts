import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';
import rootReducer from './rootReducer';
import usersSlice from './usersSlice';


const store = configureStore({
  reducer: rootReducer,
});


export type AppDispatch = typeof store.dispatch

export default store;