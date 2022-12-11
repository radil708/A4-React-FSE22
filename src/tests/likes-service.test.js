import {toggleLikes, countLikes, findTuitsLikedByUser} from "../services/likes-service";
import {createUser, deleteUsersByUsername, findUserByCredentials} from "../services/users-service";
import {createTuit, deleteTuit, findTuitByUser} from "../services/tuits-service";
import {login, logout, profile} from "../services/auth-service";

describe('Toggle likes liking a new tuit', () => {
    // new user
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const existingUser = {
        username: "user1",
        password: "p"
    }

    const newTuit = {tuit:"I'm tired of these freakin' aliens on this freakin' ship" }

    // setup test before running test
    beforeAll(async () => {

        // delete any existing ripley users
        await deleteUsersByUsername(ripley.username)
        //create ripley in db
        const ripUser = await createUser(ripley)
        // save id info
        ripley.id = ripUser.userId

        //get all ids of tuits by Ripley
        const allTuits = await findTuitByUser(ripUser.userId)
        // delete all tuits by ripley
        if (allTuits !== "") {
            await allTuits.map(async eachTuit => await deleteTuit(eachTuit.tuitID))
        }

        // make the tuit
        // my app stores id of user as .userId
        const createdTuit = await createTuit(ripUser.userId,newTuit)
        //save tuit id info
        newTuit.id = createdTuit.tuitID

    });

    // clean up after test runs
    afterAll(async () => {
        // my controller sends a user as an object and id is the userId property in the response
        const allTuits = await findTuitByUser(ripley.id)

        // delete all tuits by ripley
        const tuitsDeleted = await allTuits.map(async eachTuit => await deleteTuit(eachTuit.tuitID))
        // delete any existing ripley users
        const usersDeleted = await deleteUsersByUsername(ripley.username)
        //logout of profile
        await logout()

    });

    test('toggle like an existing tuit, then toggle again to unlike', async () => {
        // before liking count should be 0
        let ogCount = await countLikes(newTuit.id)
        expect(0).toEqual(ogCount)

        // login as an existing users
        await login(existingUser)
        //get crednetial info
        const res = await profile()

        // this should like the tuit
        await toggleLikes(res.userId, newTuit.id)

        //after liking should be 1
        expect(1).toEqual(await countLikes(newTuit.id))

        // this should unlike a tuit
        await toggleLikes(res.userId, newTuit.id)

        //after second toggle will unlike
        expect(0).toEqual(ogCount)

    })

});



//PLEASE DO NOT RUN THE TESTS BELOW, ONLY USED FOR CREATING SOME TUITS TO LIKE FOR A4 TESTING ON MY END
describe('Add 2 tuits for testing A4', () => {
    const existingUser = {
        username: "user2",
        password: "p"
    }

    test('have an existing user make new tuits with stats', async () => {
        // login as an existing users
        await login(existingUser)
        //get crednetial info
        const res = await profile()
        existingUser.id = res.userId

        //Ed sheeran fan anybody?
        const newTuit1 = {tuit:"You make me feel like my troubled heart is a million miles away" }
        const newTuit2 = {tuit: "I see the light shining through the rain, A thousand colors in the brighter shade"}

        await createTuit(existingUser.id,newTuit1)
        await createTuit(existingUser.id, newTuit2)
        await logout()
    })
})
//PLEASE DO NOT RUN THE TESTS BELOW, ONLY USED FOR CREATING SOME TUITS TO LIKE FOR A4 TESTING ON MY END
describe('user1 likes 2 new tuits of user2', () => {
    const existingUser1 = {
        username: "user1",
        password: "p"
    }

    const existingUser2 = {
        username: "user2",
        password: "p"
    }

    const allTuitIdsofUser2 = []

    beforeAll(async () => {
        const targetUser = await login(existingUser2)
        existingUser2.id = targetUser.userId
        const allUser2Tuits = await findTuitByUser(existingUser2.id)
        allUser2Tuits.forEach(eachTuit => allTuitIdsofUser2.push(eachTuit.tuitID))
        await logout()
    })

    test('user1 likes user2s tuits', async () => {
        await login(existingUser1)
        existingUser1.id = (await profile()).userId
        await allTuitIdsofUser2.forEach(async eachTId => await toggleLikes(existingUser1.id,eachTId))

        await logout()
    })
})

// PLEASE DON"T RUN THIS Test, just verifying a method, and amount of user1 likes may change as
// the program is being used
test ('get total likes by user1, should be 3', async () => {
    const existingUser1 = {
        username: "user1",
        password: "p"
    }
    await login(existingUser1)
    existingUser1.id = (await profile()).userId
    const allTuitsLikedByUser1 = await findTuitsLikedByUser(existingUser1.id)
    console.log(allTuitsLikedByUser1)
    expect(3).toEqual(allTuitsLikedByUser1.length)
    logout()
})