import {useEffect, useState} from "react";
import * as service from "../../services/tuits-service";
import Tuit from "../tuits/tuit";

const MyTuits = () => {
    const [tuits, setTuits] = useState([]);
    const findMyTuits = () =>
        service.findTuitsByUser("me")
            .then(tuits => setTuits(tuits));
    useEffect(findMyTuits, []);
    const deleteTuit = (tid) =>
        service.deleteTuit(tid)
            .then(findMyTuits);
    return(
        <Tuit tuits={tuits}
               deleteTuit={deleteTuit}/>
    );
};

export default MyTuits;
