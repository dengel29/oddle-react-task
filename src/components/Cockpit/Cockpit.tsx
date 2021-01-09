// react modules
import React, {useState} from 'react';

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
import usersDisplaySlice from '../../store/usersSlice'


const Cockpit = () => {
  
  // local state
  const [queryState, setQueryState] = useState({inputQuery:'', lastTriggeredQuery: ''})
  const [isLoadingState, setIsLoadingState] = useState({isLoading: false})
  const [resultsCountState, setResultsCountState] = useState({count: 0})
  // refactoring for redux
  // const [currentPageState, setCurrentPageState] = useState({currentPage: 0})
  
  const [usersState, setUsersState] = useState({users: []})
  const dispatch = useDispatch()
  const {pageNum} = useSelector(
    (state: RootState) => state.usersDisplay
  )

  const {setCurrentPage} = usersDisplaySlice.actions

  // functions triggered by cockpit or contained components
  const setQuery = (e: any) => {
    setQueryState({
      inputQuery: e.target.value,
      lastTriggeredQuery: queryState.lastTriggeredQuery
    })
  }

  const triggerSearchHandler = async (query: string, pageNum = 1) => {
    setIsLoadingState({isLoading: true})
    query = encodeURIComponent(queryState.inputQuery)
    let response = await callGithubAPI(query, pageNum)
    let data = await response.json();
    
    setUsersState({users: data.items})
    
    setResultsCountState({count: data.total_count})
    setIsLoadingState({isLoading: false})

    // setCurrentPageState({currentPage: pageNum});
    dispatch(setCurrentPage(pageNum))
  }

  let currentPageNum = store.getState().usersDisplay.pageNum
  let getNextResults = () => {

    triggerSearchHandler(queryState.lastTriggeredQuery, store.getState().usersDisplay.pageNum + 1)
  }

  let getLastResults = () => {
    triggerSearchHandler(queryState.lastTriggeredQuery, store.getState().usersDisplay.pageNum - 1)
  }
  return (
    <React.Fragment>
      <Searchbar 
      value={queryState.inputQuery} 
      setQuery={setQuery} 
      triggerSearch={() => triggerSearchHandler(queryState.inputQuery)}/>
      { isLoadingState.isLoading 
        ? 
          <Loader/>
        : <React.Fragment>
            <Users users={usersState.users}/>
            <Pagination 
            currentPage={currentPageNum} 
            resultsCount={resultsCountState.count} 
            nextClicked={getNextResults}
            backClicked={getLastResults} /> 
          </React.Fragment> 
      }
    </React.Fragment>
  )
}

export default Cockpit;