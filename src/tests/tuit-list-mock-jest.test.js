import axios from "axios";
import {findAllUsers} from "../services/users-service";
import {render, screen} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {UserList} from "../components/profile/user-list";
import {findAllTuits} from "../services/tuits-service";
import {TuitList} from "../components/tuits/tuit-list";

jest.mock('axios');

const MOCKED_TUITS = [
    {tuitID: "123", tuitContent: "char's tuit", postedBy: {username: "Charizard"} },
    {tuitID: "456", tuitContent: "pik's tuit", postedBy: {username: "Pikachu"} },
    {tuitID: "789", tuitContent: "rill's tuit", postedBy: {username: "Rillaboom"} }
];

test('tuit list renders mocked', async () => {

    axios.get.mockImplementation(() =>
        Promise.resolve({ data: {tuits: MOCKED_TUITS} }));

    const response = await findAllTuits();
    const tuitsArr = response.tuits;

    render(
        <HashRouter>
            <TuitList tuits={tuitsArr}/>
        </HashRouter>);

    const linkElement1 = screen.getByText(/char's tuit/i);
    const linkElement2 = screen.getByText(/pik's tuit/i);
    const linkElement3 = screen.getByText(/rill's tuit/i);
    expect(linkElement1).toBeInTheDocument();
    expect(linkElement2).toBeInTheDocument();
    expect(linkElement3).toBeInTheDocument();
});