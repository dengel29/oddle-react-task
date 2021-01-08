import React from 'react';

const UserProfile = (props: any) => {
  console.log(props)
  let user = props.location.state.user

  return(
    <React.Fragment>
      <img src={user.avatar_url} alt=""/>
      <a href={user.followers_url}>Followers</a>
      <a href={user.following_url}>Following</a>
    </React.Fragment>
  )
}

export default UserProfile