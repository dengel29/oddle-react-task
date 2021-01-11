import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import callGithubAPI from '../utils/callGithubAPI';
import callGithubAPI from '../utils/callGithubAPI'
import {AppThunk} from './index'

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
  lastTriggeredQuery: string
  totalUsers: number,
  navigatedToUser: boolean
} & DisplayedUsers

let initialState = {
  pageNum: -1,
  lastTriggeredQuery: '',
  displayedUsers: [],
  totalUsers: -1,
  navigatedToUser: true
} as CurrentDisplayState


const usersDisplaySlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.pageNum = action.payload
    },
    setDisplayedUsers(state, action: PayloadAction<DisplayedUsers>) {
      state.displayedUsers = action.payload.displayedUsers
    },
    setLastTriggeredQuery(state, action: PayloadAction<string>) {
      // console.log(action.payload)
      state.lastTriggeredQuery = action.payload
    },
    setTotalUsers(state, action: PayloadAction<number>) {
      state.totalUsers = action.payload
    },
    setNavigatedToUser(state, action: PayloadAction<boolean>) {
      state.navigatedToUser = action.payload
    }
  }
})


const {setDisplayedUsers, setTotalUsers} = usersDisplaySlice.actions

export const fetchUsers = (query: string, pageNum: number): AppThunk => async dispatch => {
  try {
    const response = await callGithubAPI(query, pageNum)
    const data = await response.json()
    let users = data.items;
    let totalCount = data.total_count
    dispatch(setTotalUsers(totalCount))
    dispatch(setDisplayedUsers({displayedUsers: users}))
  } catch(error) {
    console.log(error)
    alert(JSON.stringify(error))
  }
}

export default usersDisplaySlice