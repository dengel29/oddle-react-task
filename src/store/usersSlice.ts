import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {AppThunk} from './index'
import callGithubAPI from '../utils/call-github-api';

type UserType = {
  login: string,
  id:number,
  repos_url: string,
  avatar_url: string,
  gravatar_url?: string
}
type DisplayedUsers = { 
  displayedUsers:UserType[]
}

type CurrentDisplayState = {
  pageNum: number,
  triggeredQuery: string
} & DisplayedUsers

let initialState = {
  pageNum: -1,
  triggeredQuery: '',
  displayedUsers: []
} as CurrentDisplayState


const usersDisplaySlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      console.log("action payload",action.payload)
      state.pageNum = action.payload
    },
    setDisplayedUsers(state, action: PayloadAction<DisplayedUsers>) {
      // const Users: UsersType = action.payload
      state.displayedUsers = action.payload.displayedUsers
    },
    // toggleTodo(state, action) {
    //   const todo = state.find(todo => todo.id === action.payload)
    //   if (todo) {
    //     todo.completed = !todo.completed
    //   }
    // }
  }
})
const {setDisplayedUsers} = usersDisplaySlice.actions

export const fetchUsers = (query: string, pageNum: number): AppThunk => async dispatch => {
  try {
    const response = await callGithubAPI(query, pageNum)
    const data = await response.json()
    let users = data.items;

    dispatch(setDisplayedUsers({displayedUsers: users}))
  } catch(e) {
    console.log(e)
  }
}

export default usersDisplaySlice