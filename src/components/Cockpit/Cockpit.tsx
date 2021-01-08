import {useState} from 'react';
import Searchbar from '../Searchbar/Searchbar'
import config from '../../environment'
const Cockpit = () => {
  
  // local state
  const [queryState, setQueryState] = useState({inputQuery:'', lastTriggeredQuery: ''})
  const [isLoadingState, setIsLoadingState] = useState({isLoading: false})
  const [usersState, setUsersState] = useState({users: []})
  
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
    setIsLoadingState({isLoading: false})
  }
  return (
    <Searchbar 
    value={queryState.inputQuery} 
    setQuery={setQuery} 
    triggerSearch={() => triggerSearchHandler(queryState.inputQuery)}/>
  )
}

export default Cockpit;