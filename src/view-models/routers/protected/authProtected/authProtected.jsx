import { Navigate } from "react-router-dom";
import App from "../../../../views/layout/App";
import { AuthService } from "../../../../models/context/auth/authService";

const AuthProtected=()=>{
    if(!sessionStorage.getItem("authToken")){
        return <Navigate to='/login' replace/>;
    }
    return <AuthService>
        <App/>
    </AuthService>
};
// 
export default AuthProtected;