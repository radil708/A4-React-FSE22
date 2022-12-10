import React from "react";

const TuitStats = ({tuit, likeTuit}) => {
    // some tuits still use old schema, can't really
    //interact with them but can make sure they have a
    //default stats info
    if (tuit.stats == null) {
        tuit.stats = {
            replies:  0,
            retuits:  0,
            likes: 0
        }
    }
    return (
        <div className="row mt-2">
            <div className="col">
                <span onClick={() => likeTuit(tuit)}>
                    { tuit.stats.likes > 0  &&
                        <i className="fas fa-heart" style={{color: 'red'}}></i>
                    }
                    {
                        tuit.stats.likes <= 0 &&
                        <i className="far fa-heart"></i>
                    }
                    {
                        tuit.stats && tuit.stats.likes
                    }
                </span>
            </div>
        </div>
    )
}

export default TuitStats

// export default class TuitStats extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <div className="row mt-2">
//         <div className="col">
//           <i className="far fa-message me-1"></i>
//           {this.props.tuit.stats && this.props.tuit.stats.replies}
//         </div>
//         <div className="col">
//           <i className="far fa-retweet me-1"></i>
//           {this.props.tuit.stats && this.props.tuit.stats.retuits}
//         </div>
//         <div className="col">
//           <i className="far fa-heart me-1"></i>
//           {this.props.tuit.stats && this.props.tuit.stats.likes}
//         </div>
//         <div className="col">
//           <i className="far fa-inbox-out"></i>
//         </div>
//       </div>
//     );
//   }
// }