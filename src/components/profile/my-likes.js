import Tuits from "../tuits";
import React, {useEffect, useState} from "react";
import {profile} from "../../services/auth-service";
import * as likeService from "../../services/likes-service";
//fixed bug
const MyLikes = () => {
    const [likedTuits, setLikedTuits] = useState([]);

    const findTuitsILike = async () => {
        //get user info
        let userInfo = await profile()

        //get all tuits liked by current user
        let allTuitsLiked = await likeService.findTuitsLikedByUser(userInfo.userId)

        setLikedTuits(allTuitsLiked)

    }

    useEffect(findTuitsILike, []);


    return (
        <div>
            <h1>My likes</h1>
            <Tuits tuits={likedTuits} refreshTuits={findTuitsILike}/>
        </div>

    )

}
export default MyLikes