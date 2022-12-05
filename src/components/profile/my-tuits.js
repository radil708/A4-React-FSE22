import {useEffect, useState} from "react";
import * as tuitService from "../../services/tuits-service";
import {profile} from "../../services/auth-service";
import Tuit from "../tuits/tuit";

const MyTuits = async () => {
    const [tuits, setTuits] = useState([]);

    const findMyTuits = async () => {
        // get username
        let userInfo = await profile()
        // get all tuits as array
        let allMyTuits = await tuitService.findTuitsByUser(userInfo.username)
        //set tuits state as tuits received
        setTuits(allMyTuits)
    }
    // service.findTuitsByUser("me")
    //     .then(tuits => setTuits(tuits));
    await useEffect(findMyTuits, []);

    const deleteTuit = async (tid) => {
        await tuitService.deleteTuit(tid)
        findMyTuits()
    }
    // service.deleteTuit(tid)
    //     .then(findMyTuits);
    return (
        // <div>
        //     <button onClick={findMyTuits} className="btn btn-primary">Refresh</button>
        //     <ul className="list-group">
        //         {tuits.map(indivTuit =>
        //             <li className="list-group-item">
        //                 <h2>{indivTuit}</h2>
        //
        //             </li>
        //
        //         )}
        //     </ul>
        // </div>
        <Tuit tuits={tuits}
              deleteTuit={deleteTuit}/>
    );
};

export default MyTuits;
