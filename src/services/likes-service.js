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

const LIKES_API = `${BASE_URL}/api/likes`;
const TUITS_API = `${BASE_URL}/api/tuits`;
const USERS_API = `${BASE_URL}/api/users`;
const AUTH_API = `${BASE_URL}/api/auth`;

export const createLike = async (userIdIn, tuitIdIn) => {
    let url = LIKES_API + `/tuits/${tuitIdIn}/user/${userIdIn}`
    const res = await axios.post(url)
    return res.data
}

export const deleteLike = async(likeIdIn) => {
    let url = LIKES_API + `/${likeIdIn}`
    const res = await axios.delete(url)
    return res.data
}

export const findLikeByUserAndId = async(userIdIn, tuitIdIn) => {
    let url = LIKES_API + `/users/${userIdIn}/tuits/${tuitIdIn}`
    const res = await axios.get(url)
    return res.data
}

export const toggleLikes = async(userIdIn, tuitIdIn) => {
    let url = LIKES_API + `/users/${userIdIn}/tuits/${tuitIdIn}`
    const res = await axios.put(url)
    return res.data
}


export const countLikes = async(tuitIdIn) => {
    let url = LIKES_API + `/tuits/${tuitIdIn}`
    const res = await axios.get(url)
    return (res.data).length
}

export const findTuitsLikedByUser = async(userId) => {
    let url = LIKES_API + `/users/${userId}`
    const res = await axios.get(url)
    return res.data
}