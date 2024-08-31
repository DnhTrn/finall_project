import { Navigate, useLocation } from "react-router-dom";
import { AuthService } from "../../../../models/context/auth/authService";
import Login from "../../../../views/UIS/login/login";

const LoginProtected=()=>{
    const location=useLocation();
    if(sessionStorage.getItem('authToken')){
        return <Navigate to={location.state?.from || '/dashboard'} replace/>;
    }
    return <AuthService>
        <Login/>
    </AuthService>
};
export default LoginProtected;