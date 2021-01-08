import styled from 'styled-components';

type UserProps = {
  login: string,
  id:number,
  repos_url: string,
  avatar_url: string,
  gravatar_url?: string
}

const UserContainer = styled.div`
  text-align:left;
  margin: 16px auto;
  border: 1px solid #eee;
  box-shadow: 0 2px 3px #ccc;
  text-align: center;
  border-radius: 4px;
  background-color: #483d8b2e;
  height:min-content;
  max-height:14em;

  img {
    width:100%;
    box-shadow: 1px 3px 3px darkslateblue;
    object-fit:cover;
    height:10em;
  }

  h3 {
    font-size: 1rem;
    font-weight: 700;
  }

  a {

  }
`

const User = (props: UserProps) => {
  return(
    <UserContainer>
      <img src={props.avatar_url} alt=""/>
      <h3>{props.login}</h3>
    </UserContainer>
  )
}

export default User;