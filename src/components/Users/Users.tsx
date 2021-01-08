import styled from 'styled-components'
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

let UsersListContainer = styled.div`
  margin-top:1.6em;
  display:grid;
  grid-template-columns: minmax(min-content, 12em) repeat(auto-fill, 10em);
  grid-gap: 0.8em 0.8em;
  padding: 0em 0.8em 0em 0.8em
`

const Users = (props: UsersProps) => {

  return <UsersListContainer> {
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
    
  }</UsersListContainer>
}

export default Users;
