import {createUser, deleteUsersByUsername, findUserByCredentials} from "../services/users-service";
import {
    createTuit,
    createTuitByUser,
    deleteTuit,
    findAllTuits,
    findTuitById,
    findTuitByUser
} from "../services/tuits-service";
import {signup, login, logout, profile} from "../services/auth-service";

describe('can create tuit with REST API', () => {
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    // setup test before running test
    beforeAll(async () => {

        // delete any existing ripley users
        await deleteUsersByUsername(ripley.username)
        //create ripley in db
        const ripUser = await createUser(ripley)

        //get all ids of tuits by Ripley
        const allTuits = await findTuitByUser(ripUser.userId)
        // delete all tuits by ripley
        if (allTuits !== "") {
            await allTuits.map(async eachTuit => await deleteTuit(eachTuit.tuitID))
        }

        //create the tuit JSON
        const tuitContent = {"tuit":"I'm tired of these freakin' aliens on this freakin' ship"}
        // make the tuit
        // my app stores id of user as .userId
        await createTuit(ripUser.userId,tuitContent)

    });

    // clean up after test runs
    afterAll(async () => {
        const cred = {
            username: ripley.username,
            password: ripley.password
        }
        const userRip = await findUserByCredentials(cred)
        // my controller sends a user as an object and id is the userId property in the response
        const allTuits = await findTuitByUser(userRip.userId)

        // delete all tuits by ripley
        const tuitsDeleted = await allTuits.map(async eachTuit => await deleteTuit(eachTuit.tuitID))
        // delete any existing ripley users
        const usersDeleted = await deleteUsersByUsername(userRip.username)

    });

    test('createTuit by a specific user', async () => {
        const cred = {
            username: ripley.username,
            password: ripley.password
        }
        const userRip = await findUserByCredentials(cred)
        // my controller sends a user as an object and id is the userId property in the response
        const allTuits = await findTuitByUser(userRip.userId)

        //should only be one tuit so far
        expect(1).toEqual(allTuits.length)
        expect("I'm tired of these freakin' aliens on this freakin' ship").toEqual(allTuits[0].tuitContent)
    })

});

describe('can delete tuit wtih REST API', () => {
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const adam = {
        username: 'adam_smith',
        password: 'not0sum',
        email: 'wealth@nations.com'
    };



    // setup test before running test
    beforeAll(async () => {

        // delete any existing users
        await deleteUsersByUsername(ripley.username)
        // delete any existing users
        await deleteUsersByUsername(adam.username)

        //create users in db
        const ripUser = await createUser(ripley)
        const adUser = await createUser(adam)

        //get all ids of tuits by Ripley
        const allTuits = await findTuitByUser(ripUser.userId)
        // delete all tuits by ripley
        if (allTuits !== "") {
            await allTuits.map(async eachTuit => await deleteTuit(eachTuit.tuitID))
        }

        //get all ids of tuits by adam
        const adamAllTuits = await findTuitByUser(adUser.userId)
        // delete all tuits by ripley
        if (adamAllTuits !== "") {
            await adamAllTuits.map(async eachTuitA => await deleteTuit(eachTuitA.tuitID))
        }

        //create the tuit JSON
        const tuitContent = {"tuit":"I'm tired of these freakin' aliens on this freakin' ship"}
        const tuitAdam = {"tuit" : "cyber"}
        // make the tuit
        // my app stores id of user as .userId
        await createTuit(ripUser.userId,tuitContent)
        await createTuit(adUser.userId,tuitAdam )
    });

    // clean up after test runs
    afterAll(async () => {
        const cred = {
            username: ripley.username,
            password: ripley.password
        }
        const userRip = await findUserByCredentials(cred)
        // my controller sends a user as an object and id is the userId property in the response
        const allTuits = await findTuitByUser(userRip.userId)

        // delete all tuits by ripley
        const tuitsDeletedR = await allTuits.map(async eachTuitR => await deleteTuit(eachTuitR.tuitID))
        // delete any existing ripley users
        const usersDeletedR = await deleteUsersByUsername(userRip.username)

        const cred2 = {
            username: adam.username,
            password: adam.password
        }
        const userAd = await findUserByCredentials(cred2)
        // my controller sends a user as an object and id is the userId property in the response
        const allTuitsA = await findTuitByUser(userAd.userId)

        // delete all tuits by adam
        const tuitsDeleted = await allTuitsA.map(async eachTuitA => await deleteTuit(eachTuitA.tuitID))
        // delete any existing adam udrtd
        const usersDeleted = await deleteUsersByUsername(userAd.username)

    });

    test('delete a specific tuit by id', async () => {
        const cred2 = {
            username: adam.username,
            password: adam.password
        }
        const userAd = await findUserByCredentials(cred2)
        // my controller sends a user as an object and id is the userId property in the response
        const allTuitsA = await findTuitByUser(userAd.userId)
        const tuitIDToDelete = allTuitsA[0].tuitID

        const tuitsDeletedResp = await deleteTuit(tuitIDToDelete)
        expect(1).toEqual(tuitsDeletedResp.tuitsDeleted)

        const zeroTuits = await findTuitByUser(userAd.userId)
        expect(0).toEqual(zeroTuits.length)

        const cred = {
            username: ripley.username,
            password: ripley.password
        }
        const userRip = await findUserByCredentials(cred)
        // my controller sends a user as an object and id is the userId property in the response
        const allTuitsR = await findTuitByUser(userRip.userId)

        expect(1).toEqual(allTuitsR.length)
    })
});

describe('can retrieve a tuit by their primary key with REST API', () => {
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const adam = {
        username: 'adam_smith',
        password: 'not0sum',
        email: 'wealth@nations.com'
    };



    // setup test before running test
    beforeAll(async () => {

        // delete any existing users
        await deleteUsersByUsername(ripley.username)
        // delete any existing users
        await deleteUsersByUsername(adam.username)

        //create users in db
        const ripUser = await createUser(ripley)
        const adUser = await createUser(adam)

        //get all ids of tuits by Ripley
        const allTuits = await findTuitByUser(ripUser.userId)
        // delete all tuits by ripley
        if (allTuits !== "") {
            await allTuits.map(async eachTuit => await deleteTuit(eachTuit.tuitID))
        }

        //get all ids of tuits by adam
        const adamAllTuits = await findTuitByUser(adUser.userId)
        // delete all tuits by ripley
        if (adamAllTuits !== "") {
            await adamAllTuits.map(async eachTuitA => await deleteTuit(eachTuitA.tuitID))
        }

        //create the tuit JSON
        const tuitContent = {"tuit":"I'm tired of these freakin' aliens on this freakin' ship"}
        const tuitAdam = {"tuit" : "cyber"}
        // make the tuit
        // my app stores id of user as .userId
        await createTuit(ripUser.userId,tuitContent)
        await createTuit(adUser.userId,tuitAdam )
    });

    // clean up after test runs
    afterAll(async () => {
        const cred = {
            username: ripley.username,
            password: ripley.password
        }
        const userRip = await findUserByCredentials(cred)
        // my controller sends a user as an object and id is the userId property in the response
        const allTuits = await findTuitByUser(userRip.userId)

        // delete all tuits by ripley
        const tuitsDeletedR = await allTuits.map(async eachTuitR => await deleteTuit(eachTuitR.tuitID))
        // delete any existing ripley users
        const usersDeletedR = await deleteUsersByUsername(userRip.username)

        const cred2 = {
            username: adam.username,
            password: adam.password
        }
        const userAd = await findUserByCredentials(cred2)
        // my controller sends a user as an object and id is the userId property in the response
        const allTuitsA = await findTuitByUser(userAd.userId)

        // delete all tuits by adam
        const tuitsDeleted = await allTuitsA.map(async eachTuitA => await deleteTuit(eachTuitA.tuitID))
        // delete any existing adam udrtd
        const usersDeleted = await deleteUsersByUsername(userAd.username)

    });

    test ("get a specific tuit by id", async () => {
        const cred2 = {
            username: adam.username,
            password: adam.password
        }
        const userAd = await findUserByCredentials(cred2)
        // my controller sends a user as an object and id is the userId property in the response
        const allTuitsA = await findTuitByUser(userAd.userId)
        const tuitIDToGet = allTuitsA[0].tuitID

        const tResp = await findTuitById(tuitIDToGet)
        expect("cyber").toEqual(tResp.tuitContent)
    })

});

describe('can retrieve all tuits with REST API', () => {
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const adam = {
        username: 'adam_smith',
        password: 'not0sum',
        email: 'wealth@nations.com'
    };

    let currentTuitcount


    // setup test before running test
    beforeAll(async () => {
        const allCurrentTuits = await findAllTuits()
        currentTuitcount = allCurrentTuits.length

        // delete any existing users
        await deleteUsersByUsername(ripley.username)
        // delete any existing users
        await deleteUsersByUsername(adam.username)

        //create users in db
        const ripUser = await createUser(ripley)
        const adUser = await createUser(adam)

        //get all ids of tuits by Ripley
        const allTuits = await findTuitByUser(ripUser.userId)
        // delete all tuits by ripley
        if (allTuits !== "") {
            await allTuits.map(async eachTuit => await deleteTuit(eachTuit.tuitID))
        }

        //get all ids of tuits by adam
        const adamAllTuits = await findTuitByUser(adUser.userId)
        // delete all tuits by ripley
        if (adamAllTuits !== "") {
            await adamAllTuits.map(async eachTuitA => await deleteTuit(eachTuitA.tuitID))
        }

        //create the tuit JSON
        const tuitContent = {"tuit":"I'm tired of these freakin' aliens on this freakin' ship"}
        const tuitAdam = {"tuit" : "cyber"}
        // make the tuit
        // my app stores id of user as .userId
        await createTuit(ripUser.userId,tuitContent)
        await createTuit(adUser.userId,tuitAdam )
        const ripleyNewContent = {"tuit":"Aliens vs Predator"}
        await createTuit(ripUser.userId,ripleyNewContent)
    });

    // clean up after test runs
    afterAll(async () => {
        const cred = {
            username: ripley.username,
            password: ripley.password
        }
        const userRip = await findUserByCredentials(cred)
        // my controller sends a user as an object and id is the userId property in the response
        const allTuits = await findTuitByUser(userRip.userId)

        // delete all tuits by ripley
        const tuitsDeletedR = await allTuits.map(async eachTuitR => await deleteTuit(eachTuitR.tuitID))
        // delete any existing ripley users
        const usersDeletedR = await deleteUsersByUsername(userRip.username)

        const cred2 = {
            username: adam.username,
            password: adam.password
        }
        const userAd = await findUserByCredentials(cred2)
        // my controller sends a user as an object and id is the userId property in the response
        const allTuitsA = await findTuitByUser(userAd.userId)

        // delete all tuits by adam
        const tuitsDeleted = await allTuitsA.map(async eachTuitA => await deleteTuit(eachTuitA.tuitID))
        // delete any existing adam udrtd
        const usersDeleted = await deleteUsersByUsername(userAd.username)

    });

    test ("get all tuits from db", async () => {
        const allTuits = await findAllTuits()
        expect(currentTuitcount + 3).toEqual(await allTuits.length)
    })

    test ("get all tuits from a specific user", async () => {
        const ripUser = await findUserByCredentials(
            {username: 'ellenripley',
            password: 'lv426'}
        )
        const allTuitsByRipley = await findTuitByUser(ripUser.userId)
        expect(2).toEqual(await allTuitsByRipley.length)
    })
});

// ************* A4 tests ************************ //

describe('A4 test create Tuit by User', ()=> {
    const testUser = {
        username: 'A4Test1',
        password: 'password',
        email: 'testing@aliens.com'
    };

    beforeAll(async () => {
        await signup(testUser)
        await login(testUser)
    })

    afterAll(async () => {
        await logout()
        await deleteTuit(testUser.id)
        await deleteUsersByUsername(testUser.username)
    })

    test('create a tuit', async () => {
        const newTuit = {'tuit': 'test user tuit for A4'}
        const createdTuit = await createTuitByUser(null, newTuit)
        expect(createdTuit.tuitContent).toEqual('test user tuit for A4')
        testUser.id = createdTuit.tuitID
    })
})

describe('Fill in some tuits for A4' , () => {

    const existingUser = {username: "user1", password : "p"}

    test('make tuits for existing user', async () => {
        await login(existingUser)
        const constUserInfo = await profile()
        const newTuit = {'tuit': 'Cats are cute'}
        const createdTuit = await createTuitByUser(constUserInfo.userId, newTuit)
        const newTuit2 = {'tuit': 'Dogs are cool'}
        await createTuitByUser(constUserInfo.userId, newTuit2)

    })
})

describe('Find tuit by user id for existing user' , () => {

    const existingUser = {username: "user1", password : "p"}

    test('make tuits for existing user', async () => {
        await login(existingUser)
        const constUserInfo = await profile()
        let allTuitsByUser = await findTuitByUser(constUserInfo.userId)
        //console.log(allTuitsByUser)
        expect(allTuitsByUser.length).toEqual(2)
    })
})