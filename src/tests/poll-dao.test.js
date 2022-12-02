import {createUser, deleteUser, deleteUsersByUsername} from "../services/users-service";
import axios from "axios";
import {createPoll, deletePoll, findAllPolls, findPoll, voteOnPoll} from "../services/polls-service";

const BASE_URL = "http://localhost:4000" // this only works for local testing
const POLLS_API ="/api/polls"
const USERS_API = `${BASE_URL}/api/users`;

describe ("Create and delete poll, valid inputs", () => {
    const testUser = {
        username: 'pollTestUser',
        password: 'testing',
        email: 'testing@test.com'
    };

    let tst

    const testPoll = {
        question : "What is your favorite color?",
        options: ["Red", "Green", "Blue"]
    }
    beforeEach(async () => {
        //delete any existing usernames that are the same
        await deleteUsersByUsername(testUser.username)

        // create test user
        let daoResp = await createUser(testUser)
        testUser._id = daoResp.userId

    })

    afterEach(async () => {
        // delete the poll
        //await deletePoll(testPoll._id)

        // delete user
        await deleteUser(testUser._id)
    })

    test ("create a poll and delete it", async () => {
        // get total entries is polls collection
        // delete the poll
        let allPollsArr = await findAllPolls()

        // create poll by testUser
        let pollDaoResp = await createPoll(testUser._id, testPoll)
        //console.log(pollDaoResp)
        testPoll._id = pollDaoResp._id

        // get new count of entries, should be + 1
        let allPollsArrUpdated = await findAllPolls()

        expect(allPollsArrUpdated.length).toEqual(allPollsArr.length + 1)

    })

    test ("find poll by id ", async () => {
        // create poll by testUser
        let pollDaoResp = await createPoll(testUser._id, testPoll)
        testPoll._id = pollDaoResp._id

        // create second poll
        const second_poll = await createPoll(testUser._id,
            {question : "Whose that pokemon?",
            options: ["Pikachu", "Bulbasaur", "Squirtle"]})

        // find that specific poll
        let daoResp = await findPoll(testPoll._id)
        let daoResp2 = await findPoll(second_poll._id)
        expect(daoResp.question).toEqual(testPoll.question)
        expect(daoResp2.question).toEqual(second_poll.question)
        await deletePoll(second_poll._id)
    })

    test("voting mechanism", async () => {
        // create poll by testUser
        let pollDaoResp = await createPoll(testUser._id, testPoll)
        testPoll._id = pollDaoResp._id

        //await voteOnPoll(testPoll._id,testUser._id,{response : "Red"})

        await voteOnPoll(testPoll._id,testUser._id,{response : "Green"})
        await voteOnPoll(testPoll._id,testUser._id,{response : "Green"})

        //await voteOnPoll(testPoll._id,testUser._id,{response : "Blue"})
        //await voteOnPoll(testPoll._id,testUser._id,{response : "Blue"})
        //await voteOnPoll(testPoll._id,testUser._id,{response : "Blue"})

        let daoResp = await findPoll(testPoll._id)

        //expect(daoResp.answerOptionsCount[0]).toEqual(1)
        expect(daoResp.answerOptionsCount[1]).toEqual(2)
        //expect(daoResp.answerOptionsCount[2]).toEqual(3)
    })
})