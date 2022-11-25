import {createUser} from "../services/users-service";
import axios from "axios";

const BASE_URL = "http://localhost:4000" // this only works for local testing
const POLLS_API ="/api/polls"
const USERS_API = `${BASE_URL}/api/users`;

test ("Create and delete poll, valid inputs", async => {
    const user = {
        username: 'pollTestUser',
        password: 'testing',
        email: 'testing@test.com'
    };
    beforeAll(async () => {
        // create test user
        const res = await axios.post(USERS_API, user)
        user._id = res.data._id.toString()
    })

    test ("create a poll", async () => {
        const createPollUrl = BASE_URL + POLLS_API + "/" + user._id
        const testPoll = {
            question : "What is your favorite color?",
            options : ["Red","Green","Blue"] }
    })
})