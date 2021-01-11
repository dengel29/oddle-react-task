import styled from 'styled-components'
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
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
  padding: 0em 0.8em 0em 0.8em;
  
  a {
    text-decoration:none;
    color:black;
    h3 {
      font-size: 1rem;
      font-weight: 700;
      color:black;
      text-decoration
    }
    &:focus {
      border: 4px solid aqua;
      background-color: black;
      h3 {
        color: white;
      }
    }
  }
`

const Users = (props: UsersProps) => {
  const [selectedUserState, setSelectedUserState] = useState<{selectedUserId: null | number}>({selectedUserId: null})
  
  const userSelectedHandler = (id: number) => {
    setSelectedUserState({selectedUserId: id})
  }
  return <UsersListContainer> { 
    props.users.map( (user, id) => {
      return (
        <Link 
          to={
            {
            pathname: '/' + user.login,
            state: {user: user}
            }
          } 
          
          key={user.id}>
          <User
            login={user.login}
            id={user.id}
            repos_url={user.repos_url}
            avatar_url={user.avatar_url}
            gravatar_url={user.gravatar_url}
            selected={() => userSelectedHandler(user.id)}
            ></User>
        </Link>
      )
    })
  }</UsersListContainer>
}

export default Users;
