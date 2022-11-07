import axios from "axios";

//Point to MY aws server
const BASE_URL = "http://lecture-1-env.eba-mncqj36t.us-east-1.elasticbeanstalk.com"
//const BASE_URL = "http://my-node-express-project-env.eba-hxq4pgvm.us-east-1.elasticbeanstalk.com"
const TUITS_API = `${BASE_URL}/api/tuits`;
const USERS_API = `${BASE_URL}/api/users`;

export const findAllTuits = async () => {
    // axios.get(TUITS_API)
    //     .then(response => response.data);
    const res = await axios.get(TUITS_API)
    return res.data
}

export const findTuitById = async (tid) => {
    // axios.get(`${TUITS_API}/${tid}`)
    //     .then(response => response.data);
    const targetUrl = TUITS_API + "/" + tid
    const res = await axios.get(targetUrl)
    return res.data
}

export const findTuitByUser = async (uid) => {
    // axios.get(`${USERS_API}/${uid}/tuits`)
    //     .then(response => response.data);

    // pass in uid
    const targetUrl = BASE_URL + `/api/users/${uid}/tuits`
    const res = await axios.get(targetUrl)
    return res.data
}

export const createTuit = async (uid, tuit) => {
    // axios.post(`${USERS_API}/${uid}/tuits`, tuit)
    //     .then(response => response.data);
    const targetUrl = `${USERS_API}/${uid}/tuits`
    // post the tuit, body should have a json with tuit property
    const resp = await axios.post(targetUrl, tuit)
    return resp.data
}

export const updateTuit = (tid, tuit) => {
    axios.post(`${TUITS_API}/${tid}`, tuit)
        .then(response => response.data);
}

export const deleteTuit = async (tid) => {
    // axios.delete(`${TUITS_API}/${tid}`)
    //     .then(response => response.data);

    const targetUrl = `${TUITS_API}/${tid}`
    const resp = await axios.delete(targetUrl)
    return resp.data
}
