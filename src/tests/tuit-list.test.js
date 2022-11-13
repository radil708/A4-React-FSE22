import {Tuits} from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {createTuit, deleteTuit, findAllTuits} from "../services/tuits-service";
import axios from "axios";
import {createUser, deleteUser, findUserByCredentials} from "../services/users-service";
import {UserList} from "../components/profile/user-list";
import {TuitList} from "../components/tuits/tuit-list";

// jest.mock needs to be in a separate file
//jest.mock('axios');

//alice bob and charlie already exist in my datab
const MOCKED_USERS = [
  {username: 'Charizard', password: 'lv426', email: 'fire@pok.com'},
  {username: 'Pikachu', password: 'lv426', email: 'electric@pok.com'},
  {username: 'Rillaboom', password: 'lv426', email: 'grass@pok.com'}
];


const MOCKED_TUITS = [
    {tuitID: "123", tuitContent: "char's tuit", postedBy: {username: "Charizard"} },
    {tuitID: "456", tuitContent: "pik's tuit", postedBy: {username: "Pikachu"} },
    {tuitID: "789", tuitContent: "rill's tuit", postedBy: {username: "Rillaboom"} }
];

const ASYNC_TUIT_REQUESTS = [
    {tuit: "char's tuit", postedBy: {username: "Charizard"} },
    {tuit: "pik's tuit", postedBy: {username: "Pikachu"} },
    {tuit: "rill's tuit", postedBy: {username: "Rillaboom"} }
]

test('tuit list renders static tuit array', async () => {
  // create users
  //MOCKED_USERS.map(async userTemplate => await createUser(userTemplate))
  render(
      <HashRouter>
        <TuitList tuits={MOCKED_TUITS}/>
      </HashRouter>);
  const linkElement1 = screen.getByText(/char's tuit/i);
  const linkElement2 = screen.getByText(/pik's tuit/i);
  const linkElement3 = screen.getByText(/rill's tuit/i);
  expect(linkElement1).toBeInTheDocument();
  expect(linkElement2).toBeInTheDocument();
  expect(linkElement3).toBeInTheDocument();
});


test('tuit list renders async', async () => {
  // create users in db
    let createdUserArr = []

    const existingUsersArr = []

    for (let h = 0; h < MOCKED_USERS.length; h++) {
        const tempUser = await findUserByCredentials(MOCKED_USERS[h])
        if (tempUser == "") {
            continue
        }
        else {
            existingUsersArr.push(tempUser)
        }

    }

    for (let g = 0; g < existingUsersArr.length; g++) {
        await deleteUser(existingUsersArr[g].userId)
    }


    const charUser = await createUser(MOCKED_USERS[0])
    const pikUser = await createUser(MOCKED_USERS[1])
    const rillUser = await createUser(MOCKED_USERS[2])

    createdUserArr.push(charUser)
    createdUserArr.push(pikUser)
    createdUserArr.push(rillUser)

    const tuitArr = []

    // make the tuits in the db
    for (let i = 0; i < createdUserArr.length ; i++) {
        const tempUserId = createdUserArr[i].userId
        const tuitPassIn = ASYNC_TUIT_REQUESTS[i]
        const newTuit = await createTuit(tempUserId, tuitPassIn)
        tuitArr.push(newTuit)
    }

    render(
        <HashRouter>
            <TuitList tuits={tuitArr}/>
        </HashRouter>);

    const linkElement1 = screen.getByText(/char's tuit/i);
    const linkElement2 = screen.getByText(/pik's tuit/i);
    const linkElement3 = screen.getByText(/rill's tuit/i);
    expect(linkElement1).toBeInTheDocument();
    expect(linkElement2).toBeInTheDocument();
    expect(linkElement3).toBeInTheDocument();


    //delete new tuits
    for (let j = 0; j < tuitArr.length; j++) {
        await deleteTuit(tuitArr[j].tuitID)
    }

    //delete old tuits
    for (let k = 0; k < createdUserArr.length; k++) {
        await deleteUser(createdUserArr[k].userId)
    }



})


