import React from "react";
import {Link} from "react-router-dom";
// had to change line 11 and 12 from id to userid to match my node implementation
export const UserList = ({users, deleteUser}) => {
  return (
    <div className="list-group">
      {
        users.map(user => {
          return (
            <Link className="list-group-item"
                  key={user.userId}
                  //key={user._id}
                  //to={`/home/${user._id}`}
                  to={`/home/${user.userId}`}>
          <span className="fs-3">
            {user.username}
          </span>
              <button onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                //deleteUser(user._id)
                deleteUser(user.userId)
              }} className="btn btn-danger fa-pull-right">
                <i className="fas fa-remove"></i>
              </button>
            </Link>
          )
        })
      }
    </div>)
};
