import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type UserType = {
  login: string,
  id:number,
  repos_url: string,
  avatar_url: string,
  gravatar_url?: string
}
type DisplayedUsers = { 
  users:UserType[]
}

type CurrentDisplayState = {
  pageNum: number,
  triggeredQuery: string
} & DisplayedUsers

let initialState = {
  pageNum: 0,
  triggeredQuery: '',
  users: []
} as CurrentDisplayState

const usersDisplaySlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      console.log("action payload",action.payload)
      state.pageNum = action.payload
    }
    // addUsers(state, action) {
    //   // const Users: UsersType = action.payload
    //   state.concat(action.payload)
    // },
    // toggleTodo(state, action) {
    //   const todo = state.find(todo => todo.id === action.payload)
    //   if (todo) {
    //     todo.completed = !todo.completed
    //   }
    // }
  }
})

export default usersDisplaySlice