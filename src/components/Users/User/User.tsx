import styled from 'styled-components';


type UserProps = {
  login: string,
  id:number,
  repos_url: string,
  avatar_url: string,
  gravatar_url?: string
}

// useEffect(() => {
  
//   return await fetch(`https://api.github.com/search/users?q=${query}&page=${pageNum}`, {
//     method: "GET",
//     headers: {
//       Authorization: `token ${config.token}`,
//       Accept: `application/vnd.github.v3+json`
//     }
//   })  
// })

const UserContainer = styled.div`
  text-align:left;
  border: 1px solid #eee;
  box-shadow: 0 2px 3px #ccc;
  text-align: center;
  border-radius: 4px;
  background-color: #483d8b2e;
  height:min-content;
  max-height:14em;

  &:focus {
    backgorund-color:blue;
    border: 4px solid aqua
  }
  img {
    width:100%;
    box-shadow: 1px 3px 3px darkslateblue;
    object-fit:cover;
    height:10em;
  }
`

const NameContainer = styled.div`
  overflow-wrap: anywhere;;
  max-width:24ch;
  padding: 0em 0.6em 0em 0.6em
`

const User = (props: UserProps) => {
  return(
    <UserContainer>
      <img src={props.avatar_url} alt={`Avatar for ${props.login}`}/>
      <NameContainer>
        <h3>{props.login}</h3>
      </NameContainer>
    </UserContainer>
  )
}

export default User;