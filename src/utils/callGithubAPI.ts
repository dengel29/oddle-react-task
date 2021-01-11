// config
import config from '../environment';

const callGithubAPI = async (query: string, pageNum: number) => {
  return fetch(`https://api.github.com/search/users?q=${query}&page=${pageNum}`, {
    method: "GET",
    headers: {
      Authorization: `token ${config.token}`,
      Accept: `application/vnd.github.v3+json`
    }
  })  
}

export default callGithubAPI;