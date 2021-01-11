// react modules
import React, {useEffect, useState, useCallback} from 'react';

// components 
import Searchbar from '../Searchbar/Searchbar';
import Users from '../Users/Users';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../store/rootReducer';
import usersDisplaySlice, {fetchUsers} from '../../store/usersSlice';
import {useIsMount} from '../../hooks/useIsMount';
import debounce from 'lodash.debounce';


const Cockpit = () => {
  
  // local state
  const [queryState, setShownQueryState] = useState({inputQuery:''})
  // const [fromPaginationState, setFromPaginationState] = useState({fromPagination: false})
  const [isLoadingState, setIsLoadingState] = useState({isLoading: false})
  
  // redux state and utilities
  const dispatch = useDispatch()
  const {pageNum, displayedUsers, lastTriggeredQuery, totalUsers} = useSelector(
    (state: RootState) => state.usersDisplay
  )

  const {setCurrentPage, setLastTriggeredQuery} = usersDisplaySlice.actions

  // functions triggered by cockpit or contained components

  const setQuery = (e: any) => {
    // two-way binding
    let query = e.target.value;
    setShownQueryState({
      inputQuery: query
    })

    debounceOnChange(query)
  }

    const search = (query: string) => {
    dispatch(setCurrentPage(1));
    dispatch(setLastTriggeredQuery(query))
  }

  const debouncedSearch = debounce(search, 5000)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceOnChange = useCallback(debouncedSearch, [])

  const isMount = useIsMount()
  useEffect(() => { 
    if (isMount || lastTriggeredQuery === '') {
      return
    } else {
     ( async function ()  {
       setIsLoadingState({isLoading: true})
       let p = pageNum === -1 ? 1 : pageNum;
        await Promise.all([
          dispatch(setCurrentPage(p)),
          dispatch(fetchUsers(encodeURIComponent(lastTriggeredQuery), p))
        ])
      })().finally(() => {
        setIsLoadingState({isLoading: false})
        console.log(totalUsers)
      });
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