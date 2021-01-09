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
  flex-direction:row;
  justify-content: space-around;
  align-items:top;
  width: 80%;
  margin: 0 auto;
  @media (max-width: 600px) {
   content: {
   }
  }
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
      <button onClick={goBackHandler}> back </button>
      <img src={user.avatar_url} alt=""/>
      
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