import React from 'react';
import User from './User/User'

type UserType = {
  login: string,
  id:number,
  repos_url: string,
  avatar_url: string,
  gravatar_url?: string
}
type UsersProps = { 
  users:UserType[]
}

const Users = (props: UsersProps) => {

  return <div> {
    props.users.map( (user, id) => {
      return (
        <User
          login={user.login}
          id={user.id}
          key={user.id}
          repos_url={user.repos_url}
          avatar_url={user.avatar_url}
          gravatar_url={user.gravatar_url}
         ></User>
      )
    })
    
  }</div>
}

export default Users;
