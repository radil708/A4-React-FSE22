import React, {useEffect, useState} from "react";
import * as tuitService from "../../services/tuits-service";
import {profile} from "../../services/auth-service";
import Tuits from "../tuits";
//import Tuit from "../tuits/tuit";
//import Tuits from "../tuits";

// cannot make outer func async
const MyTuits = () => {
    const [tuits, setTuits] = useState([]);

    const findMyTuits = async () => {
        // get username
        let userInfo = await profile()
        //alert(userInfo.userId)
        // get all tuits as array
        let allMyTuits = await tuitService.findTuitByUser(userInfo.userId)
        //set tuits state as tuits received
        //alert(allMyTuits.length)
        setTuits(allMyTuits)
    }

    useEffect( () => {

        try {
            findMyTuits()
        }
        catch (e){
            alert(e)
        }
        //alert(tuits.length)

    },[]);
    //useEffect(findMyTuits, []);
    //findMyTuits()
    // service.findTuitsByUser("me")
    //     .then(tuits => setTuits(tuits));
    //await useEffect(findMyTuits, []);

    const deleteTuit = async (tid) => {
        await tuitService.deleteTuit(tid)
        try {
            findMyTuits()
        }
        catch (e){
            alert(e)
        }
    }


    // service.deleteTuit(tid)
    //     .then(findMyTuits);
    return (
        <div>
            <h1>My Tuits</h1>
            <Tuits tuits={tuits} deleteTuit={deleteTuit}/>
        </div>
        //<header>Hello</header>
        // <div>
        //     <ul className="list-group">
        //         item
        //     </ul>
        // </div>
        // <Tuit tuits={tuits}
        //       deleteTuit={deleteTuit}/>
        //<Tuit tuis={{tuits}}></Tuit>
    );
};

export default MyTuits;
