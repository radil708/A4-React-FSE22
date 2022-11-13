import React from "react";
import {Link} from "react-router-dom";

export const TuitList = ({tuits, deleteTuit}) => {
    return (
        <div className="list-group">
            {
                tuits.map(tuit => {
                    return (
                        <Link className="list-group-item"
                              key={tuit.tuitID}
                              to={`/home/${tuit.tuitID}`}>
          <span className="fs-3">
            {tuit.tuitContent}
          </span>
                            <button onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                deleteTuit(tuit.tuitID)
                            }} className="btn btn-danger fa-pull-right">
                                <i className="fas fa-remove"></i>
                            </button>
                        </Link>
                    )
                })
            }
        </div>)
};
