import axios from "axios";

const BASE_URL = "http://localhost:4000" // this only works for local testing
const POLLS_API ="/api/polls"
const USERS_API = `${BASE_URL}/api/users`;

export const createPoll = async(userid, pollObject) => {
    let targetUrl = BASE_URL + POLLS_API + "/users/" + userid
    const res = await axios.post(targetUrl, pollObject)
    return res.data;
}

export const findAllPolls = async() => {
    const res = await axios.get(BASE_URL + POLLS_API)
    return res.data
}

export const deletePoll = async(pollId) => {
    let targetUrl = BASE_URL + POLLS_API + "/" + pollId
    const res = await axios.delete(targetUrl)
    return res.data
}

export const findPoll = async(pollId) => {
    let targetUrl = BASE_URL + POLLS_API + "/" + pollId
    const res = await axios.get(targetUrl)
    return res.data
}

export const voteOnPoll = async(pollId, userId, answerJson) => {
    let targetUrl = BASE_URL + POLLS_API + "/vote/" + pollId + "/users/" + userId
    const res = await axios.put(targetUrl,answerJson)
    return res.data
}

export const unvoteOnPoll = async(pollId, userId, answerJson) => {
    let targetUrl = BASE_URL + POLLS_API + "/unvote/" + pollId + "/users/" + userId
    const res = await axios.put(targetUrl,answerJson)
    return res.data
}