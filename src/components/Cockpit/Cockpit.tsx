// react modules
import React, {useEffect, useState} from 'react';

// components 
import Searchbar from '../Searchbar/Searchbar';
import Users from '../Users/Users';
import Loader from '../Loader/Loader'
import Pagination from '../Pagination/Pagination'
import UserProfile from '../UserProfile/UserProfile'
import store from '../../store/index'
import callGithubAPI from '../../utils/call-github-api'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../../store/rootReducer'
import usersDisplaySlice, {fetchUsers} from '../../store/usersSlice'
import {useIsMount} from '../../hooks/useIsMount'

const Cockpit = () => {
  
  // local state
  const [queryState, setQueryState] = useState({inputQuery:'', lastTriggeredQuery: ''})
  const [isLoadingState, setIsLoadingState] = useState({isLoading: false})
  const [isTriggeredState, setIsTriggeredState] = useState({isTriggered: false})
  const [resultsCountState, setResultsCountState] = useState({count: 0})
  
  // const [usersState, setUsersState] = useState({users: []})
  const dispatch = useDispatch()
  const {pageNum} = useSelector(
    (state: RootState) => state.usersDisplay
  )
  const {displayedUsers} = useSelector((state: RootState) => state.usersDisplay)

  const {setCurrentPage} = usersDisplaySlice.actions

  // functions triggered by cockpit or contained components
  const setQuery = (e: any) => {
    setQueryState({
      inputQuery: e.target.value,
      lastTriggeredQuery: queryState.lastTriggeredQuery
    })
  }

  const isMount = useIsMount()
  useEffect(() => {
    if (isMount) {
      return
    } else {
     ( async function () {
        setIsLoadingState({isLoading: true})
        let p = pageNum === -1 ? 1 : pageNum
        console.log("p in the async", )
        await Promise.all([
          dispatch(setCurrentPage(p)),
          dispatch(fetchUsers(encodeURIComponent(queryState.inputQuery), p))
        ])
      })().finally(() => {
        setIsLoadingState({isLoading: false})
        setIsTriggeredState({isTriggered: false})
      });
      
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isTriggeredState.isTriggered])


  const triggerSearchHandler = async (query: string, pageNum: number) => {
    setIsTriggeredState({isTriggered: true})
    // setIsLoadingState({isLoading: true})

    // query = encodeURIComponent(queryState.inputQuery)
    // let response = await callGithubAPI(query, pageNum)
    // let data = await response.json();
    // setUsersState({users: data.items})
    
    
    // setResultsCountState({count: data.total_count})
    // setIsLoadingState({isLoading: false})

    dispatch(setCurrentPage(pageNum));

  }
  
  let users = displayedUsers
  let getNextResults = () => {

    triggerSearchHandler(queryState.lastTriggeredQuery, pageNum + 1)
  }

  let getLastResults = () => {
    triggerSearchHandler(queryState.lastTriggeredQuery, pageNum - 1)
  }
  return (
    <React.Fragment>
      <Searchbar 
      value={queryState.inputQuery} 
      setQuery={setQuery} 
      triggerSearch={() => triggerSearchHandler(queryState.inputQuery, pageNum)}/>
      { isLoadingState.isLoading 
        ? 
          <Loader/>
        : <React.Fragment>
            <Users users={users}/>
            <Pagination 
            currentPage={pageNum} 
            resultsCount={resultsCountState.count} 
            nextClicked={getNextResults}
            backClicked={getLastResults} /> 
          </React.Fragment> 
      }
    </React.Fragment>
  )
}

export default Cockpit;