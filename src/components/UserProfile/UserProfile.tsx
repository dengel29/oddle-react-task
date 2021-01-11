import React, { useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import styled from 'styled-components';
import Loader from '../Loader/Loader';

import {callGithubUserReposAPI, callGithubFollowersAPI, callGithubFollowingAPI, callGithubUserAPI} from '../../utils/github-user-call';
import callGithubAPI from '../../utils/call-github-api';
import { nextTick } from 'process';

type User = UserFromRouterState | UserFromDirectURL

type UserFromRouterState = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string | JSX.Element;
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
  score?: number;
}

type UserFromDirectURL = {
  name: string;
  company?: any;
  blog: string;
  location: string;
  email: string;
  hireable?: any;
  bio?: any;
  twitter_username?: any;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: Date;
  updated_at: Date;
} & UserFromRouterState

const getUser = async (login: string) => {
  let res = await callGithubUserAPI(login)
  let user: UserFromDirectURL = await res.json()
  return user
}

const HorizontalSpacingDiv = styled.div`
  display:flex;
  height:40vh;
  flex-direction:row;
  justify-content: space-between;
  text-align:center;
  align-items:top;
  width: 60%;
  margin: 0 auto;
  border-bottom: 5px dotted #483d8b59;
  @media (max-width: 600px) {
    flex-direction:column;
    height: unset;
    border-bottom: 0px dotted white;
  }
  div {
    height: inherit;
    overflow-y: scroll;
    text-align:center;
    margin:0 auto;
    padding: 0px 5px 0px 5px;
    margin-bottom: 2em;
    scroll-behavior: smooth;
    text-overflow: clip;
    overflow-x: hidden;
    width: 30%;
    @media (max-width: 600px) {
      height: 12em;
      width:70%;
      border-bottom: 5px dotted #483d8b59;
    }
  }

  div h3 {
    position: sticky;
    top: 0em;
    background: darkslateblue;
    padding-top: unset;
    margin-top: unset;
    color: white;
    border-radius: 5px;
    margin-bottom: 0em;
  }
  div p {
    margin: 0 auto;
    line-height:2em;
    max-width: 14chch;
    @media (max-width: 600px) {
      max-width:70%
    }
  }

`

const BackButton = styled.button`
  border: none;
  outline: none;
  height: 3em;
  width: 5em;
  border-radius: 5px;
  background: #483d8b12;
  top: 50%;
  position: sticky;
  font-weight:600;
`

const UserAvatar = styled.img`
  margin-bottom: 1em;
  display: flex;
  margin: 0 auto;
  height:7em;
  width:7em;
  border-radius:50%;
`

const UserLogin = styled.h2`
  text-align:center;
`

let isUserFromDirectURL = (obj: any) => {
  return obj === undefined || obj.created !== undefined
} 

const UserProfile = (props: any) => {

  let history = useHistory()
  let goBackHandler;
  if (props?.history?.history?.state?.user) {
       goBackHandler = () => {
         console.log("we're in here", props)
         props.history.goBack()
       }
    } else {
      goBackHandler = () => {
        console.log('did the other go  back handler')
        history.push('/')
      }
    }

  let dummyUser = {
  login: "finding user...",
  id: 2,
  node_id: "string",
  avatar_url: <Loader/>,
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
  score: 1,
  }
  const [reposState, setReposState] = useState<{repos: any[]}>({repos: []})
  const [followersState, setFollowersState] = useState<{followers: any[]}>({followers: []})
  const [followingState, setFollowingState] = useState<{following: any[]}>({following: []})
  const [isLoadingState, setIsLoadingState] = useState<{isLoading: boolean}>({isLoading: true})
  const [userState, setUserState] = useState<{user: User}>({user: dummyUser})
  let {login} = useParams<{login: string}>()
  let user: User;
  useEffect(() => {
    (async function() {
      if (props?.location?.state?.user) {
        user = props?.location?.state?.user
        setUserState({user: props.location.state.user})
      } else {
        user = await getUser(login);
        setUserState({user: user})
      }
    })()
  },[])
    
  // let user = props?.location?.state?.user 
  useEffect(() => {
    setIsLoadingState({isLoading: true});
    (async function () {
      // user = await getUser(login)
      if (!isUserFromDirectURL(user)) {
        user = await getUser(login);
        setUserState({user: user})
      }
      console.log("inside mounted")
      let reposResponse = await callGithubUserReposAPI(login)
      let repos = await reposResponse.json();
      setReposState({repos: repos})

      let followersResponse = await callGithubFollowersAPI(login)
      let followers= await followersResponse.json()
      
      setFollowersState({followers: followers})

      let followingResponse = await callGithubFollowingAPI(login)
      let following = await followingResponse.json()
      
      setFollowingState({following: following})
    })().finally(() => setIsLoadingState({isLoading: false}))
  },[login])
  /**
   * TODO
   * [] make requests to the user repositories api, folowers api, and following api
   * [] make it look pretty
   * [x] add a back button
   * [] make sure the historyAPI is working(?)
   * [] create a check that, if the route is accessed without being "navigated" 
   * to from within the app, that it will fetch the correct data anyways
   */
  // console.log('repostate', reposState.repos)
  // const repos = reposState.repos
  // const followers = followersState.followers
  // const following = followingState.following
   
   let repos = () => {
     if (reposState.repos.length === 0) {
      return (
        <div>
          <h3>Repos</h3>
          <br/>
          <em>No repos. Guess {login} uses Gitlab.</em>
        </div>
      )
    }
     return ( 
     <div>
      <h3>Repos</h3>
          {
          reposState.repos.map( (repo, id) => {
            
            return (
              <p key={id}>{repo.name}</p> 
              )
            })
          }
      </div>)}

    
  let followers = () => {
    if (followersState.followers.length === 0) {
      return (
        <div>
          <h3>Followers</h3>
          <br/>
          <em>Looks like {login} has no followers. </em>
        </div>
      )
    }
    return (
      <div>
        <h3>Followers</h3>
        {
        followersState.followers.map( (follower, id) => {
          return (
            <p key={id}>{follower.login}</p> 
            )
          })
        }
      </div>)
  }

  let following = () => {
    if (followingState.following.length === 0) {
      return (
        <div>
          <h3>Following</h3>
          <br/>
          <em>Hmm, {login} isn't following anyone</em>
        </div>
      )
    }
    return (
      <div>
        <h3>Following</h3>
        {

          followingState.following.map( (follow, id) => {
            
            return (
              <p key={id}>{follow.login}</p> 
              )
            })
        }
      </div>
    )
  }

  return(
    <React.Fragment>
      <BackButton onClick={goBackHandler}> back </BackButton>
      { typeof(userState.user.avatar_url) === 'string' ?
        <UserAvatar src={userState.user.avatar_url} alt=""/> :
        userState.user.avatar_url  
       }
      <UserLogin>{userState.user.login}</UserLogin>
      { isLoadingState.isLoading ? <Loader/> :
      <HorizontalSpacingDiv>
        {repos()}
        {followers()}
        {following()}
      </HorizontalSpacingDiv>}
      {/* <a href={currentUserState?.currentUser?.followers_url}>Followers</a>
      <a href={currentUserState?.currentUser?.following_url}>Following</a> */}
    </React.Fragment>
  )
}

export default UserProfile