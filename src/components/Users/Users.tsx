import styled from 'styled-components'
import {Link} from 'react-router-dom';
import User from './User/User'
import {ThemeProps} from '../../types';


type UserType = {
  login: string,
  id:number,
  repos_url: string,
  avatar_url: string,
  gravatar_url?: string
}
type UsersProps = { 
  users:UserType[],
  theme: string
}

let UsersListContainer = styled.div<ThemeProps>`
  margin-top:1.6em;
  display:grid;
  grid-template-columns: minmax(min-content, 12em) repeat(auto-fill, 10em);
  grid-gap: 0.8em 0.8em;
  padding: 0em 0.8em 0em 0.8em;
  
  a {
    background-color: ${props => props.theme === "LIGHT" ? '' : 'darkslateblue'};
    text-decoration:none;
    color:black;
    h3 {
      font-size: 1rem;
      font-weight: 700;
      color:${props => props.theme === "LIGHT" ? 'black' : 'white'};
      text-decoration
    }
    &:focus {
      border: 3px solid aqua;
    }
  }
`

const Users = (props: UsersProps) => {
  return <UsersListContainer theme={props.theme}> { 
    props.users.map( (user, id) => {
      return (
        <Link 
          to={
            {
            pathname: '/' + user.login,
            state: {user: user, userAvatarURL: user.avatar_url}
            }
          } 
          
          key={user.id}>
          <User
            login={user.login}
            id={user.id}
            repos_url={user.repos_url}
            avatar_url={user.avatar_url}
            gravatar_url={user.gravatar_url}
            ></User>
        </Link>
      )
    })
  }</UsersListContainer>
}

export default Users;
