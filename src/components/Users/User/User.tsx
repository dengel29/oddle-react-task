type UserProps = {
  login: string,
  id:number,
  repos_url: string,
  avatar_url: string,
  gravatar_url?: string
}

const User = (props: UserProps) => {
  return(
    <div>
      <img src={props.avatar_url} alt=""/>
      <p>User: {props.login}!</p>
      <a href={props.repos_url}>Repos</a>
      
    </div>
  )
}

export default User;