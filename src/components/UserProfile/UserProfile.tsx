import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import callGithubAPI from '../../utils/call-github-api'
declare module RoutedUser {
  export interface User {
      login: string;
      id: number;
      node_id: string;
      avatar_url: string;
      gravatar_id: string;
      url: string;
      html_url: string;
      followers_url: string;
      following_url: string;
      gists_url: string;
      starred_url: string;
      subscriptions_url: string;
      organizations_url: string;
      repos_url: string;
      events_url: string;
      received_events_url: string;
      type: string;
      site_admin: boolean;
      score: number;
  }

  export interface State {
      user: User;
  }

  export interface Location {
      pathname: string;
      state: State;
      search: string;
      hash: string;
      key: string;
  }

  export interface History {
      length: number;
      action: string;
      location: Location;
      goBack: Function
  }

  export interface Params {
      login: string;
  }

  export interface Match {
      path: string;
      url: string;
      isExact: boolean;
      params: Params;
  }

  export interface RootObject {
      history: History;
      location: Location;
      match: Match;
  }
}

type User = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  score: number;
}

type UserFromRouter = RoutedUser.User;
type RouterRoot = RoutedUser.RootObject
const getUser = async (login: string, pageNum: number) => {
  let res = await callGithubAPI(login, pageNum)
  let data = await res.json()
  return data[0]
}
const UserProfile = (props: any) => {
  let dummyUser = {
    login: "string",
    id: 222,
    node_id: "string",
    avatar_url: "string",
    gravatar_id: "string",
    url: "string",
    html_url: "string",
    followers_url: "string",
    following_url: "string",
    gists_url: "string",
    starred_url: "string",
    subscriptions_url: "string",
    organizations_url: "string",
    repos_url: "string",
    events_url: "string",
    received_events_url: "string",
    type: "string",
    site_admin: false,
    score: 2}
  let [currentUserState, setCurrentUserState] = useState<{currentUser: UserFromRouter}>({currentUser: dummyUser})
  let {login} = useParams<{login: string}>()
  useEffect(() => {
    if (props?.location?.state?.user) {
       setCurrentUserState({currentUser: props.location.state.user})
    } else {
      (async () => {
        let user = await getUser(login, 1)
        setCurrentUserState({currentUser: user})
      })()
    }
  }, [])
  /**
   * TODO
   * [] make requests to the user repositories api, folowers api, and following api
   * [] make it look pretty
   * [x] add a back button
   * [] make sure the historyAPI is working(?)
   * [] create a check that, if the route is accessed without being "navigated" 
   * to from within the app, that it will fetch the correct data anyways
   */

   const goBackHandler = () => {
     props.history.goBack()
   }

  return(
    <React.Fragment>
      <button onClick={goBackHandler}> back </button>
      <img src={currentUserState?.currentUser?.avatar_url} alt=""/>
      <a href={currentUserState?.currentUser?.followers_url}>Followers</a>
      <a href={currentUserState?.currentUser?.following_url}>Following</a>
    </React.Fragment>
  )
}

export default UserProfile