// config
import config from './../environment';

type SearchTypes = "searchUsers" | "getRepos" | "getFollowers" | "getFollowing" | "userDetails"

const headers = {
  Authorization: `token ${config.token}`,
  Accept: `application/vnd.github.v3+json`
}

type HTTPMethod = "GET" | "POST"
// let options = {
//   baseURL: "https://api.github.com/", 
//   searchType: SearchTypes, 
//   method: HTTPMethod, 
//   userName?: string, 
//   query?:string, 
//   pageNum?:string
// }
const queryBuilder = async (baseURL: "https://api.github.com/", searchType: SearchTypes, method: HTTPMethod, userName?: string, query?:string, pageNum?:string) => {
  let path;
   switch (searchType) {
    case "searchUsers":
      path = `search/users?q=${query}&page=${pageNum}`
      break;
    case "getRepos":
      path = `users/${userName}/repos`
      break;
    case "getFollowers":
      path = `users/${userName}/followers`
      break
    case "getFollowing":
      path = `users/${userName}/following`
      break
    case "userDetails":
      path = `users/`
      break;
  }
  return await fetch(path, {
    method: method,
    headers: {
      Authorization: `token ${config.token}`,
      Accept: `application/vnd.github.v3+json`
    }
  })
}



// const githubCall = async (query: string, pageNum: number) => {
//   return await fetch(`https://api.github.com/search/users?q=${query}&page=${pageNum}`, {
//     method: "GET",
//     headers: {
//       Authorization: `token ${config.token}`,
//       Accept: `application/vnd.github.v3+json`
//     }
//   })  
// }

// export default githubCall;

export default queryBuilder