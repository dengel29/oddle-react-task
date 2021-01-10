import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import {callGithubUserReposAPI, callGithubFollowersAPI, callGithubFollowingAPI} from '../../utils/github-user-call';
import callGithubAPI from '../../utils/call-github-api';

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

const getUser = async (login: string, pageNum: number) => {
  let res = await callGithubAPI(login, pageNum)
  let data = await res.json()
  return data[0]
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

const UserProfile = (props: any) => {
  let {login} = useParams<{login: string}>()
  let user = props.location.state.user
  let loaded = false;
  
  const [reposState, setReposState] = useState<{repos: any[]}>({repos: []})
  const [followersState, setFollowersState] = useState<{followers: any[]}>({followers: []})
  const [followingState, setFollowingState] = useState<{following: any[]}>({following: []})
  useEffect(() => {
    (async function () {
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
    })()
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
   const goBackHandler = () => {
     props.history.goBack()
   }

  return(
    <React.Fragment>
      <BackButton onClick={goBackHandler}> back </BackButton>
      <UserAvatar src={user.avatar_url} alt=""/>
      <UserLogin>{user.login}</UserLogin>
      <HorizontalSpacingDiv>
        <div>
          <h3>Repos</h3>
      {
        reposState.repos.map( (repo, id) => {
          
          return (
            <p key={id}>{repo.name}</p> 
            )
          })
        }
        </div>

        <div>
          <h3>Followers</h3>
      {
        followersState.followers.map( (follower, id) => {
          console.log(follower);
          return (
            <p key={id}>{follower.login}</p> 
            )
          })
        }
        </div>

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
      </HorizontalSpacingDiv>
      {/* <a href={currentUserState?.currentUser?.followers_url}>Followers</a>
      <a href={currentUserState?.currentUser?.following_url}>Following</a> */}
    </React.Fragment>
  )
}

export default UserProfile