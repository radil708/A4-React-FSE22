import {profile, login, logout,signup} from "../services/auth-service";
import {deleteUsersByUsername} from "../services/users-service";

describe('Authentication Service Signup method', () => {
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
    })
})

describe('Authentication Service login method and profile', () => {
    //sample user to insert
    const existing = {
        username: 'test1',
        password: 'testpass',
    };

    beforeAll(async () => {
        //logout if currently logged in
        await logout()
        //login in to the existing profile
        await login(existing)
    })

    afterAll( async () => {
        await logout()
    })


    test('profile', async() => {
        const res = await profile()
        expect(res.username).toEqual('test1')
        console.log(res)
    })
})