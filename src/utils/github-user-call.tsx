// config
import config from './../environment';

export const callGithubUserReposAPI = async (login: string) => {
  return await fetch(`https://api.github.com/users/${login}/repos`, {
    method: "GET",
    headers: {
      Authorization: `token ${config.token}`,
      Accept: `application/json`
    }
  })  
}

export const callGithubFollowersAPI = async (login: string) => {
  return await fetch(`https://api.github.com/users/${login}/followers`, {
    method: "GET",
    headers: {
      Authorization: `token ${config.token}`,
      Accept: `application/json`
    }
  })  
}

export const callGithubFollowingAPI = async (login: string) => {
  return await fetch(`https://api.github.com/users/${login}/following`, {
    method: "GET",
    headers: {
      Authorization: `token ${config.token}`,
      Accept: `application/json`
    }
  })  
}



