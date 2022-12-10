import Tuits from "../tuits";
import React from "react";

const MyLikes = () => {
    const [likedTuits, setLikedTuis] = useState([]);
    const findTuitsILike = () =>
        service.findAllTuitsLikedByUser("me")
            .then((tuits) => setLikedTuis(tuits));

    useEffect(findTuitsILike, []);


    return (
        <h1>My likes</h1>
    )

}
export default MyLikes