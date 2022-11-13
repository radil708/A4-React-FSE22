import {UserList} from "../components/profile/user-list";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {createUser, deleteUsersByUsername, findAllUsers} from "../services/users-service";
import axios from "axios";
//NOTE** Any test files using jest myst have .test.js as the extension
jest.mock('axios');

const MOCKED_USERS = [
    //{username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123"},
    //{username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234"},
    {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', userId: "123"},
    {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', userId: "234"},
]

test('user list renders mocked', async () => {

    axios.get.mockImplementation(() =>
        Promise.resolve({ data: {users: MOCKED_USERS} }));

    const response = await findAllUsers();
    // mock data so array has a users attr because called users in line 19
    const users = response.users;

    render(
        <HashRouter>
            <UserList users={users}/>
        </HashRouter>);

    const user = screen.getByText(/ellen_ripley/i);
    expect(user).toBeInTheDocument();
});
