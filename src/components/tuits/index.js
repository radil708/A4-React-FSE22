import React from "react";
import './tuits.css';
import Tuit from "./tuit";
import {toggleLikes} from "../../services/likes-service";
import {profile} from "../../services/auth-service";

const Tuits = ({tuits = [], deleteTuit,
                   refreshTuits}) => {

    // const likeTuit = (tuit) =>
    //     likesService
    //         .userTogglesTuitLikes("me", tuit._id)
    //         .then(refreshTuits)
    //         .catch(e => alert(e))

    const likeTuit = async (tuit) => {
        // get username
        let userInfo = await profile()
        const currentUserId = userInfo.userId
        // in my implmentation tuit id is in the tuitID property
        try{
            await toggleLikes(currentUserId,tuit.tuitID)
            refreshTuits()
        }
        catch (e) {
            alert(e)
        }
    }
    return (
        <div>
            <ul className="ttr-tuits list-group">
                {
                    tuits.map(tuit =>
                        <Tuit key={tuit.tuitID}
                              deleteTuit={deleteTuit}
                              likeTuit={likeTuit}
                              tuit={tuit}/>)
                }
            </ul>
        </div>
    );
}


// function Tuits({tuits = [], deleteTuit}) {
//     return (
//     <div>
//       <ul className="ttr-tuits list-group">
//         {
//           tuits.map && tuits.map(tuit => {
//             return (
//               <Tuit key={tuit._id} deleteTuit={deleteTuit} tuit={tuit}/>
//             );
//           })
//         }
//       </ul>
//     </div>
//   );
// }

export default Tuits;