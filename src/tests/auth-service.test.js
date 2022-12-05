import {profile, login, logout,signup} from "../services/auth-service";
import {deleteUsersByUsername} from "../services/users-service";

describe('Authentication Service Signup method and logout', () => {
    //sample user to insert
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };
//
    beforeAll(async() => {
        await deleteUsersByUsername(ripley.username)
    })

    afterAll(async () => {
        await logout()
        await deleteUsersByUsername(ripley.username)
    })

    test('sign up user and check that returns abstracted', async() => {
        const res = await signup(ripley)
        expect(res.username).toEqual(ripley.username)
        await login(ripley)
    })
})

describe('Authentication Service login method and profile', () => {
    // existing user
    const existing = {
        username: 'test1',
        password: 'testpass',
        email : 'testemail@email.com'
    };

    beforeAll(async () => {
        //delete user if it already exists
        await deleteUsersByUsername(existing.username)

        //logout if currently logged in
        await logout()

        // create the user
        const serverResp = await signup(existing)
        // save id info
        existing.id = serverResp.userId

        //login in to the existing profile
        await login(existing)
    })

    afterAll( async () => {
        await logout()

        // delete test users
        await deleteUsersByUsername(existing.username)
    })


    test('profile', async() => {

        const res = await profile()
        expect(res.username).toEqual('test1')
    })
})