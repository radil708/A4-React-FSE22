import axios from "axios";
//Point to MY aws server
const BASE_URL = "http://lecture-1-env.eba-mncqj36t.us-east-1.elasticbeanstalk.com"
//const BASE_URL = "http://my-node-express-project-env.eba-hxq4pgvm.us-east-1.elasticbeanstalk.com";
// const BASE_URL = "https://software-engineering-node-fa22.herokuapp.com/api";
// const BASE_URL = "http://localhost:4000/api";

const LOGIN_API = `${BASE_URL}/api/login`;
const USERS_API = `${BASE_URL}/api/users`;

//TODO ask why not async to start with
export const createUser = async (user) => {
  // console.log(USERS_API)
  // fetch()
  // axios.post(`${USERS_API}`, user).then(response => {
  //   console.log("post response")
  //   console.log(response.data)
  //   response.data});
  const res = await axios.post(USERS_API, user)
  return res.data

}

export const findAllUsers = async () => {
  // axios.get(USERS_API)
  //     .then(response => response.data);
  const res = await axios.get(USERS_API)
  return res.data
 }

export const findUserById = async (uid) => {
  const targetUrl = `${USERS_API}/${uid}`
  const res = await axios.get(targetUrl)
  return res.data
  // axios.get(`${USERS_API}/${uid}`)
  //     .then(response => response.data);
}

export const deleteUser = async (uid) => {
  const res = await axios.delete(`${USERS_API}/${uid}`)
  return res.data
  // axios.delete(`${USERS_API}/${uid}`)
  //     .then(response => response.data);
}

export const deleteUsersByUsername = async (username) => {
  const targetUrl = `${USERS_API}/username/${username}/delete`
  const resp = await axios.delete(targetUrl)
  const usersDeletedResp = resp.data.usersDeleted;
  return usersDeletedResp
  // axios.get(`${USERS_API}/username/${username}/delete`)
  //     .then(response => response.data);
}

export const findUserByCredentials = async (credentials) => {
  const resp = await axios.post(`${LOGIN_API}`, credentials);
  return resp.data
}

const service = {
  findAllUsers
}

export default service;