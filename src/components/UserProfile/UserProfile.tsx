import React, { useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import styled from 'styled-components';
import Loader from '../Loader/Loader';

import {callGithubUserReposAPI, callGithubFollowersAPI, callGithubFollowingAPI, callGithubUserAPI} from '../../utils/githubUserCall';
import callGithubAPI from '../../utils/callGithubAPI';

type UserFromRouterState = {
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
  score?: number;
}

type User = {
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
  created_at?: Date;
  updated_at?: Date;
} & UserFromRouterState

const getFullUser = async (login: string) => {
  let res = await callGithubUserAPI(login)
  let user: User = await res.json()
  return user
}

interface HSDProps {
  border: boolean
}

const HorizontalSpacingDiv = styled.div<HSDProps>`
  display:flex;
  height:40vh;
  flex-direction:row;
  padding-bottom: 0.8em;
  justify-content: space-between;
  text-align:center;
  align-items:top;
  width: 60%;
  margin: 0 auto;
  margin-top: 1em;
  border-bottom: ${props => props.border ? '4px dotted darkslateblue' : ''};
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
  pre {
    text-align:initial
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


const UserProfile = (props: any) => {
  
  let history = useHistory()
  let {login} = useParams<{login: string}>()
  let goBackHandler: React.MouseEventHandler;
  if (props?.history?.state?.user) {
       goBackHandler = () => {
         props.history.goBack()
       }
    } else {
      goBackHandler = () => {
        console.log('did the other go  back handler')
        history.push('/')
      }
    }
  let dummyUser: User = {
  login: login,
  id: 2,
  node_id: "string",
  avatar_url: "",
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
  name: "string",
  company: "none",
  blog: "string",
  location: "string",
  email: "string",
  hireable: "no",
  public_repos: 10,
  public_gists: 10,
  followers: 10,
  following: 10,
  created_at: undefined,
  updated_at: undefined
  }
  const [reposState, setReposState] = useState<{repos: any[]}>({repos: []})
  const [followersState, setFollowersState] = useState<{followers: any[]}>({followers: []})
  const [followingState, setFollowingState] = useState<{following: any[]}>({following: []})
  const [isLoadingState, setIsLoadingState] = useState<{isLoading: boolean}>({isLoading: true})
  const [userState, setUserState] = useState<{user: User}>({user: dummyUser})
  let user: User;

  const getUserFromStateOrHistory = async () => {
    setIsLoadingState({isLoading: true});
    // if (props?.history?.state?.user) {
    //   user = props.location.state.user
    //   setUserState({user: user})
    // } else {
    //   user = await getFullUser(login);
    //   setUserState({user: user})
    // }
      user = await getFullUser(login);
      setUserState({user: user})
    await getUserCollections()
    setIsLoadingState({isLoading: false});
  }

  useEffect(() => {
    getUserFromStateOrHistory()
  },[])
    
  const getRepos = async () => {
    const reposResponse = await callGithubUserReposAPI(login)
    const repos = await reposResponse.json();
    setReposState({repos: repos})
  }

  const getFollowers = async () => {
    const followersResponse = await callGithubFollowersAPI(login)
    const followers= await followersResponse.json()
    setFollowersState({followers: followers})
  }

  const getFollowing = async () => {
    const followingResponse = await callGithubFollowingAPI(login)
    const following = await followingResponse.json()
    setFollowingState({following: following})
  }
  const getUserCollections = async () => {
    Promise.all([
      getRepos(),
      getFollowers(),
      getFollowing(),
    ])
  }

   let repos = () => {
     if (reposState.repos.length === 0 && !isLoadingState.isLoading) {
      return (
        <div>
          <h3>Repos ({userState.user.public_repos})</h3>
          <br/>
          <em>No repos. Guess {login} uses Gitlab.</em>
        </div>
      )
    }
     return ( 
     <div>
      <h3>Repos ({userState.user.public_repos})</h3>
          {
          reposState.repos.map( (repo, id) => {
            
            return (
              <p key={id}>{repo.name}</p> 
              )
            })
          }
      </div>)}

    
  let followers = () => {
    if (followersState.followers.length === 0 && !isLoadingState.isLoading) {
      return (
        <div>
          <h3>Followers ({userState.user.followers})</h3>
          <br/>
          <em>Looks like {login} has no followers. </em>
        </div>
      )
    }
    return (
      <div>
        <h3>Followers ({userState.user.followers})</h3>
        {
        followersState.followers.map( (follower, id) => {
          return (
            <p key={id}>{follower.login}</p> 
            )
          })
        }
      </div>)
  }

  let userCollections = () => {
    return (
      <React.Fragment>
        {repos()}
        {followers()}
        {following()}
      </React.Fragment>
    )
  }

  let following = () => {
    if (followingState.following.length === 0 && !isLoadingState.isLoading) {
      return (
        <div>
          <h3>Following ({userState.user.following})</h3>
          <br/>
          <em>Hmm, {login} isn't following anyone</em>
        </div>
      )
    }
    return (
      <div>
        <h3>Following ({userState.user.following})</h3>
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
  let RenderAvatar = () => {
    if (userState?.user) {
      return (
        <React.Fragment>
        <UserAvatar src={userState.user.avatar_url} alt=""/>
        <UserLogin>{userState.user.login}</UserLogin>
        </React.Fragment>
      )
    } else {
      return (
        <Loader/>
      )
    }
  }

  return(
    <React.Fragment>
      <BackButton onClick={goBackHandler}> back </BackButton>
      {RenderAvatar()}
      {isLoadingState.isLoading ? <Loader/> : 
      <HorizontalSpacingDiv border={true}>
      { 
        !userState?.user ? <Loader/> :
        userCollections()
      }
      </HorizontalSpacingDiv>}
      {/* <a href={currentUserState?.currentUser?.followers_url}>Followers</a>
      <a href={currentUserState?.currentUser?.following_url}>Following</a> */}
      <HorizontalSpacingDiv border={false}>
      <details><summary>Full User JSON Payload </summary> 
      <pre>
      {JSON.stringify(userState.user, undefined, 2)}
      </pre> 
      </details>
      </HorizontalSpacingDiv>
    </React.Fragment>
  )
}

export default UserProfile