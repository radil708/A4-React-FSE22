import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
//import * as service from "../../services/users-service";
import React from "react";
import {UserList} from "./user-list";
import * as service from "../../services/auth-service";
import axios from "axios";
import * as authService from "../../services/auth-service";

// login function
export const Login = () => {
    const [loginUser, setLoginUser] = useState({});
    const navigate = useNavigate()
    const login = async () => {
        // login a user
        let controllerResp
        try {
            controllerResp = await authService.login(loginUser)
        }
        catch (e) {
            alert(e)
        }

        if (controllerResp == null || controllerResp.Error != null) {
            alert("User and password combo could not be found in database")
        }
        else {
            navigate('/profile')
        }


        // should navigate to profile NOT profile/mytuits
        //navigate('/profile/mytuits')
        //.then((user) => navigate('/profile/mytuits'))
        //.catch(e => alert(e));
    }

    return (
        <div>
            <h1>Login</h1>
            <input onChange={(e) =>
                setLoginUser({...loginUser,
                    username: e.target.value})}/>
            <input onChange={(e) =>
                setLoginUser({...loginUser,
                    password: e.target.value})}/>
            <button onClick={login}>
                Login</button>
        </div>
    );
};

export default Login

// export const Login = () => {
//   const [existingUsers, setExistingUsers] = useState([]);
//     // {username: 'user1', email: 'user1', password: 'user1', _id: '123'}
//   // ]);
//   const [newUser, setNewUser] = useState({});
//   const [loginUser, setLoginUser] = useState({});
//   // const navigate = useNavigate()
//
//   const uuu = [
//     {username: 'ellen_ripley', email: 'ellen_ripley', password: 'ellen_ripley', _id: '123'},
//     {username: 'sarah', email: 'ellen_ripley', password: 'ellen_ripley', _id: '234'}
//   ]
//
//   const deleteUser = (uid) =>
//     service.deleteUser(uid)
//       .then(findAllUsers)
//   const findAllUsers = () =>
//     service.findAllUsers()
//       .then(users => {
//         setExistingUsers(users)
//       })
//   const register = () =>
//     service.createUser(newUser)
//       .then(findAllUsers);
//   const login = () =>
//     service.findUserByCredentials(loginUser)
//       .then((user) => {
//         //navigate(`/home/${user._id}`)
//       });
//   useEffect(findAllUsers, []);
//   return (
//     <div>
//       <h1>Register</h1>
//       <input className="mb-2 form-control"
//              onChange={(e) =>
//                setNewUser({...newUser, username: e.target.value})}
//              placeholder="username"/>
//       <input className="mb-2 form-control"
//              onChange={(e) =>
//                setNewUser({...newUser, password: e.target.value})}
//              placeholder="password" type="password"/>
//       <input className="mb-2 form-control"
//              onChange={(e) =>
//                setNewUser({...newUser, email: e.target.value})}
//              placeholder="email" type="email"/>
//       <button onClick={register} className="btn btn-primary mb-5">Register
//       </button>
//
//       <h1>Login</h1>
//       <input className="mb-2 form-control"
//              onChange={(e) =>
//                setLoginUser({...loginUser, username: e.target.value})}
//              placeholder="username"/>
//       <input className="mb-2 form-control"
//              onChange={(e) =>
//                setLoginUser({...loginUser, password: e.target.value})}
//              placeholder="password" type="password"/>
//       <button onClick={login} className="btn btn-primary mb-5">Login</button>
//
//       <h1>Login As</h1>
//
//       <UserList users={existingUsers} deleteUser={deleteUser}/>
//
//     </div>
//   );
// };