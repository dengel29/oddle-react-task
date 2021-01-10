// config
import config from './../environment';

export const callGithubUserAPI = async (login:string) => {
  return await fetch(`https://api.github.com/users/${login}`, {
    method: "GET",
    headers: {
      Authorization: `token ${config.token}`,
      Accept: `application/json`
    }
  })  
}

export const callGithubUserReposAPI = async (login: string) => {
  return await fetch(`https://api.github.com/users/${login}/repos?page=1&per_page=100`, {
    method: "GET",
    headers: {
      Authorization: `token ${config.token}`,
      Accept: `application/json`
    }
  })  
}

export const callGithubFollowersAPI = async (login: string) => {
  return await fetch(`https://api.github.com/users/${login}/followers?page=1&per_page=100`, {
    method: "GET",
    headers: {
      Authorization: `token ${config.token}`,
      Accept: `application/json`
    }
  })  
}

export const callGithubFollowingAPI = async (login: string) => {
  return await fetch(`https://api.github.com/users/${login}/following?page=1&per_page=100`, {
    method: "GET",
    headers: {
      Authorization: `token ${config.token}`,
      Accept: `application/json`
    }
  })  
}



