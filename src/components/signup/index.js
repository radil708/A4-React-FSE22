import {useState} from "react";
import * as authService
    from "../../services/auth-service";
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const [newUser, setNewUser] = useState({});
    const navigate = useNavigate();
    const signup = async () => {
        // signup a user
        try {
            let controllerResp = await authService.signup(newUser)
        }
        catch (e) {
            alert(e)
        }
        navigate('/profile')
    }
    //.then(() => navigate('/profile'))
    //.catch(e => alert(e));
    return (
        <div>
            <h1>Signup</h1>
            <input onChange={(e) =>
                setNewUser({...newUser,
                    username: e.target.value})}/>
            <input onChange={(e) =>
                setNewUser({...newUser,
                    password: e.target.value})}/>
            <input onChange={(e) =>
                setNewUser({...newUser,
                    email: e.target.value})}/>
            <button onClick={signup}>
                Signup</button>
        </div>
    );
}
export default Signup;