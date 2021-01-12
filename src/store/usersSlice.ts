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
  navigatedToUser: boolean,
  theme: string
} & DisplayedUsers

let initialState = {
  pageNum: -1,
  lastTriggeredQuery: '',
  displayedUsers: [],
  totalUsers: -1,
  navigatedToUser: true,
  theme: "LIGHT"
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
    },
    toggleTheme(state) {
      state.theme = state.theme === "LIGHT" ? "DARK" : "LIGHT"
    }
  }
})



const {setDisplayedUsers, setTotalUsers} = usersDisplaySlice.actions

export const fetchUsers = (query: string, pageNum: number): AppThunk => async dispatch => {
  try {
    if (query === '') {
      return
    }
    const response = await callGithubAPI(query, pageNum)
    const data = await response.json()
    let users = data.items;
    if (users.length === 0) {
      throw new Error('No users returned, please search a different user name')
    }
    let totalCount = data.total_count
    dispatch(setTotalUsers(totalCount))
    dispatch(setDisplayedUsers({displayedUsers: users}))
  } catch(error) {
    console.log(error)
  }
}

export default usersDisplaySlice