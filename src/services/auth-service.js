import axios from "axios";
//const BASE_URL = process.env.REACT_APP_BASE_URL

let runLocal = true
//uncomment to before deploying to aws
//runLocal = false
let BASE_URL;

if (runLocal == true) {
    BASE_URL='http://localhost:4000'
}
else {
    BASE_URL= "http://lecture-1-env.eba-mncqj36t.us-east-1.elasticbeanstalk.com"
}

let clientUserName;
let clientPassword

const AUTH_API = `${BASE_URL}/api/auth`
axios.defaults.withCredentials = true;
const api = axios.create({
    withCredentials: true,
});

export const signup = async (user) => {
    const res = await api.post(`${AUTH_API}/signup`, user);
    return res.data
}

export const profile = async () => {
    const res = await api.post(`${AUTH_API}/profile`, )
    return res.data
}

export const logout = async () => {
    const res = await api.post(`${AUTH_API}/logout`)
    return res.data
}

export const login = async (credentials) => {
    const res = await api.post(`${AUTH_API}/login`, credentials)
    console.log(res)
    return res.data
}





