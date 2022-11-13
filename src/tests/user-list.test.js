//TODO ask about incorrect import statement
import {UserList} from "../components/profile/user-list";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {createUser, deleteUsersByUsername, findAllUsers} from "../services/users-service";
import axios from "axios";

//TODO this prevented my tests from acting correctly ask why use it??
//jest.mock('axios');

const MOCKED_USERS = [
    //{username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123"},
    //{username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234"}
    {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', userId: "123"},
    {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', userId: "234"},
]

test('user list renders static user array', () => {
  render(
    <HashRouter>
      <UserList users={MOCKED_USERS}/>
    </HashRouter>);
  const linkElement = screen.getByText(/ellen_ripley/i);
  expect(linkElement).toBeInTheDocument();
});


test('user list renders async', async () => {
    // add user nasa
    const nasa = {
      username: 'test1',
      password: 'nasa123',
      email: 'nasa@aliens.com'
    };

    // remove any/all users to make sure we create it in the test
    //return deleteUsersByUsername(ripley.username);
    await deleteUsersByUsername(nasa.username)
    await createUser(nasa)

    const users = await findAllUsers();

    render(
        <HashRouter>
          <UserList users={users}/>
        </HashRouter>);
    const linkElement = screen.getByText(/test1/i);
    expect(linkElement).toBeInTheDocument();

    await deleteUsersByUsername(nasa.username)
  });


//jest.mock('axios');
