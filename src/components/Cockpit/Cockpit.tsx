// react modules
import React, {useEffect, useState} from 'react';

// components 
import Searchbar from '../Searchbar/Searchbar';
import Users from '../Users/Users';
import Loader from '../Loader/Loader'
import Pagination from '../Pagination/Pagination'
import UserProfile from '../UserProfile/UserProfile'
import store from '../../store/index'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../../store/rootReducer'
import usersDisplaySlice, {fetchUsers} from '../../store/usersSlice'
import {useIsMount} from '../../hooks/useIsMount'

const Cockpit = () => {
  
  // local state
  const [queryState, setQueryState] = useState({inputQuery:'', lastTriggeredQuery: ''})
  const [fromPaginationState, setFromPaginationState] = useState({fromPagination: false})
  const [isLoadingState, setIsLoadingState] = useState({isLoading: false})
  const [isTriggeredState, setIsTriggeredState] = useState({isTriggered: false})
  
  // redux state and utilities
  const dispatch = useDispatch()
  const {pageNum, displayedUsers, lastTriggeredQuery} = useSelector(
    (state: RootState) => state.usersDisplay
  )

  const {setCurrentPage, setLastTriggeredQuery} = usersDisplaySlice.actions

  // functions triggered by cockpit or contained components
  const setQuery = (e: any) => {
    setQueryState({
      inputQuery: e.target.value,
      lastTriggeredQuery: queryState.lastTriggeredQuery,
    })
  }

  const isMount = useIsMount()
  useEffect(() => {
    if (isMount) {
      return
    } else {
     ( async function ()  {
       setIsLoadingState({isLoading: true})
       let p = pageNum === -1 ? 1 : pageNum
       console.log("p in the async", p)
        await Promise.all([
          dispatch(setCurrentPage(p)),
          dispatch(fetchUsers(encodeURIComponent(lastTriggeredQuery), p))
        ])
      })().finally(() => {

        setIsLoadingState({isLoading: false})
        setIsTriggeredState({isTriggered: false})
      });
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isTriggeredState.isTriggered])


  const triggerSearchHandler = async (query: string, pageNum: number, fromPagination: boolean) => {
    // the "useEffect" is listening to this triggered state, then unsets it 
    // not sure if this is best practices
    
    if (fromPagination) {
      setFromPaginationState({fromPagination: true})
      dispatch(setCurrentPage(pageNum));
    } else {
      setFromPaginationState({fromPagination: false})
      dispatch(setCurrentPage(1));
    }
  
    dispatch(setLastTriggeredQuery(query))
    setIsTriggeredState({isTriggered: true});
    // setUsersState({users: data.items})    
    // setIsLoadingState({isLoading: false})
    
  }
  
  let getNextResults = () => {
    triggerSearchHandler(lastTriggeredQuery, pageNum + 1, true)
  }

  let getLastResults = () => {
    triggerSearchHandler(lastTriggeredQuery, pageNum - 1, true)
  }
  return (
    <React.Fragment>
      <Searchbar 
      value={queryState.inputQuery} 
      setQuery={setQuery} 
      triggerSearch={() => triggerSearchHandler(queryState.inputQuery, pageNum, false)}/>
      { isLoadingState.isLoading 
        ? 
          <Loader/>
        : <React.Fragment>
            <Users users={displayedUsers}/>
            <Pagination 
            currentPage={pageNum} 
            nextClicked={getNextResults}
            backClicked={getLastResults} /> 
          </React.Fragment> 
      }
    </React.Fragment>
  )
}

export default Cockpit;