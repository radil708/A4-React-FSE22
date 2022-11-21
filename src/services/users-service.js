import axios from "axios";

//on local server to save money on server costs
let testLocal = false

let BASE_URL

//TODO comment line below to allow aws remote testing
testLocal = true // set to true for local server testing

if (testLocal) {
  // local server testing
  console.log("Running Local Server User Service")
  BASE_URL = "http://localhost:4000"
}
else {
  // remote server testing
  console.log("Running Remote AWS Server Testing")
  BASE_URL = "http://lecture-1-env.eba-mncqj36t.us-east-1.elasticbeanstalk.com"
}

//const BASE_URL = "http://my-node-express-project-env.eba-hxq4pgvm.us-east-1.elasticbeanstalk.com";
// const BASE_URL = "https://software-engineering-node-fa22.herokuapp.com/api";
// const BASE_URL = "http://localhost:4000/api";

const LOGIN_API = `${BASE_URL}/api/login`;
const USERS_API = `${BASE_URL}/api/users`;

//TODO ask why not async in starter code??
export const createUser = async (user) => {
  const res = await axios.post(USERS_API, user)
  return await res.data

}

export const findAllUsers = async () => {
  const res = await axios.get(USERS_API)
  return res.data
 }

export const findUserById = async (uid) => {
  const targetUrl = `${USERS_API}/${uid}`
  const res = await axios.get(targetUrl)
  return res.data
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
  if (resp == undefined || resp == null) {
    return 0;
  }
  const usersDeletedResp = resp.data.usersDeleted;
  return usersDeletedResp
}

export const findUserByCredentials = async (credentials) => {
  const resp = await axios.post(`${LOGIN_API}`, credentials);
  return resp.data
}

const service = {
  findAllUsers
}

export default service;