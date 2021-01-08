// react modules
import React, {useState} from 'react';


// config
import config from '../../environment';

// components 
import Searchbar from '../Searchbar/Searchbar';
import Users from '../Users/Users';
import Loader from '../Loader/Loader'
import Pagination from '../Pagination/Pagination'


const Cockpit = () => {
  
  // local state
  const [queryState, setQueryState] = useState({inputQuery:'', lastTriggeredQuery: ''})
  const [isLoadingState, setIsLoadingState] = useState({isLoading: false})
  const [usersState, setUsersState] = useState({users: []})
  const [resultsCountState, setResultsCountState] = useState({count: 0})
  const [currentPageState, setCurrentPageState] = useState({currentPage: 0})
  
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
    let response = await fetch(`https://api.github.com/search/users?q=${query}&page=${pageNum}`, {
      method: "GET",
      headers: {
        Authorization: `token ${config.token}`,
        Accept: `application/vnd.github.v3+json`
      }
    })
    let data = await response.json();
    console.log("USERS:", data.items)
    
    setUsersState({users: data.items})
    setResultsCountState({count: data.total_count})
    setCurrentPageState({currentPage: pageNum});
    setIsLoadingState({isLoading: false})
  }

  let getNextResults = () => {
    triggerSearchHandler(queryState.lastTriggeredQuery, currentPageState.currentPage + 1)
  }

  let getLastResults = () => {
    triggerSearchHandler(queryState.lastTriggeredQuery, currentPageState.currentPage - 1)
  }
  return (
    <div>
      <Searchbar 
      value={queryState.inputQuery} 
      setQuery={setQuery} 
      triggerSearch={() => triggerSearchHandler(queryState.inputQuery)}/>
      { isLoadingState.isLoading ? 
      <Loader/>
      : <React.Fragment>
      <Users users={usersState.users}/>
      <Pagination 
      currentPage={currentPageState.currentPage} 
      resultsCount={resultsCountState.count} 
      nextClicked={getNextResults}
      backClicked={getLastResults} /> </React.Fragment> }
     
    </div>
  )
}

export default Cockpit;