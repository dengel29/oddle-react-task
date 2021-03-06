// react modules
import React, {useEffect, useState, useCallback} from 'react';

// components 
import Searchbar from '../Searchbar/Searchbar';
import Users from '../Users/Users';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import Navbar from '../Navbar';

// from redux and store
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import usersDisplaySlice, {fetchUsers} from '../../store/usersSlice';

// utilities
import debounce from 'lodash.debounce';
import {useIsMount} from '../../hooks/useIsMount';


const Cockpit = (props: any) => {
  
  // local state
  const [queryState, setShownQueryState] = useState({inputQuery:''})
  const [isLoadingState, setIsLoadingState] = useState({isLoading: false})
  
  // initialize redux state and utilities
  const dispatch = useDispatch()
  const {pageNum, displayedUsers, lastTriggeredQuery, totalUsers, theme} = useSelector(
    (state: RootState) => state.usersDisplay
  )
  const {setCurrentPage, setLastTriggeredQuery} = usersDisplaySlice.actions
  const isMount = useIsMount()


  const setQuery = (e: any) => {
    let query = e.target.value;
    setShownQueryState({
      inputQuery: query
    })

    debounceOnChange(query)
  }

  const search = (query: string) => {
    dispatch(setLastTriggeredQuery(query))
    dispatch(setCurrentPage(1));
  }
  const debouncedSearch = debounce(search, 1250)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceOnChange = useCallback(debouncedSearch, [])

  const fetchFilteredUsers = async () =>  {
    setIsLoadingState({isLoading: true})
    try {
      let p = pageNum === -1 ? 1 : pageNum;
       await Promise.all([
         dispatch(setCurrentPage(p)),
         dispatch(fetchUsers(encodeURIComponent(lastTriggeredQuery), p))
       ])
     } catch(error) {
      alert(JSON.stringify(error))
     }
    setIsLoadingState({isLoading: false})
  }

  useEffect(() => { 
    if (isMount && lastTriggeredQuery === '')  {
      return
    } else {
      fetchFilteredUsers();
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[lastTriggeredQuery, pageNum])


  const triggerSearchHandler = async (query: string, pageNum: number, fromPagination: boolean) => {
    if (fromPagination) {
      dispatch(setCurrentPage(pageNum));
    } else {
      debouncedSearch.cancel();
      dispatch(setLastTriggeredQuery(query));
      dispatch(setCurrentPage(1));
    }
  }
  
  let getNextResults = () => {
    triggerSearchHandler(lastTriggeredQuery, pageNum + 1, true)
  }

  let getLastResults = () => {
    triggerSearchHandler(lastTriggeredQuery, pageNum - 1, true)
  }
  
  return (
    <React.Fragment>
      <Navbar theme={theme}></Navbar>
      <Searchbar 
        theme={theme}
        value={queryState.inputQuery} 
        setQuery={setQuery} 
        triggerSearch={() => triggerSearchHandler(queryState.inputQuery, pageNum, false)}/>
      { isLoadingState.isLoading 
        ? 
          <Loader/>
        : <React.Fragment>
            <Users 
              theme={theme}
              users={displayedUsers}/>
            <Pagination 
              usersOnPageCount={displayedUsers.length}
              totalUsers={totalUsers}
              currentPage={pageNum} 
              nextClicked={getNextResults}
              backClicked={getLastResults} /> 
          </React.Fragment> 
      }
    </React.Fragment>
  )
}

export default Cockpit;