import { Navigate } from "react-router-dom";
import Users from "../../views/UIS/users/users";
import Clubs from "../../views/UIS/clubs/clubs";
import Events from "../../views/UIS/events/events";
import Financial from "../../views/UIS/finan/final";
import Connected from "../../views/UIS/connect/connect";
import Settings from "../../views/UIS/setting/setting";
import Help from "../../views/UIS/help/help";
import Policy from "../../views/UIS/policy/policy";
import Messages from "../../views/UIS/messages/messages";
import Default from "../../views/components/settings/default/default";
import AuthProtected from './../../view-models/viewVM/authProtected';
import LoginProtected from '../../view-models/viewVM/loginProtected';
import { AuthService } from "../../view-models/loginVM/authService";

// 
export const paths=[
    {
        path:'/',
        element:<AuthService><AuthProtected/></AuthService>,
        children:[
            {
                index:true,
                element:<Navigate to="/dashboard"/>
            },
            {
                path:'/dashboard',
                element:<h1>Dashboard</h1>
            },
            {
                path:'/users-management',
                element:<Users/>
            },
            {
                path:'/clubs-management',
                element:<Clubs/>
            },
            {
                path:'/events-management',
                element:<Events/>
            },
            {
                path:'/financial-management',
                element:<Financial/>
            },
            {
                path:'/connected-management',
                element:<Connected/>
            },
            {
                path:'/help-center',
                element:<Help/>
            },
            {
                path:'/policy',
                element:<Policy/>
            },
            {
                path:'/messages',
                element:<Messages/>
            },
            {
                // route setring
                path:'/setting',
                element:<Settings/>,
                children:[
                    {
                        index:true,
                        element:<Navigate to="/setting/default"/>
                    },
                    {
                        path:'/setting/default',
                        element:<Default/>
                    },
                    {
                        path:'/setting/notifications',
                        element:<h1>Notifications</h1>
                    },
                    {
                        path:'/setting/mail',
                        element:<h1>Email</h1>
                    }
                ]
                
            },
        ]
    },
    {
        path:'/login',
        element:<AuthService><LoginProtected/></AuthService>
    }
]