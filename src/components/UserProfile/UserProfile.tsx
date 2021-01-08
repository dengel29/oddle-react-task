import React from 'react';

const UserProfile = (props: any) => {
  let user = props.location.state.user
  console.log(props)
  /**
   * TODO
   * [] make requests to the user repositories api, folowers api, and following api
   * [] make it look pretty
   * [] add a back button
   * [] make sure the historyAPI is working(?)
   * [] create a check that, if the route is accessed without being "navigated" 
   * to from within the app, that it will fetch the correct data anyways
   */

  return(
    <React.Fragment>
      <img src={user.avatar_url} alt=""/>
      <a href={user.followers_url}>Followers</a>
      <a href={user.following_url}>Following</a>
    </React.Fragment>
  )
}

export default UserProfile