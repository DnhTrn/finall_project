import { warning } from "framer-motion";

export const en={
    language:{
        en:"English",
        vn:"Vietnamese"
    },
    themes:{
        light:"Light",
        dark:"Dark",
    },
    content:{
        login:{
            title:"Login",
            password:"Password",
            email:"Email",
            forgotPassword:"Forgot Password?",
            note:"You can only log in with the account provided via registered email.",
            button:"Login",

        },
        nav:{
            menu:"Clubs Managements",
            managements:"Managements",
            'users-management':"Users management",
            'clubs-management':"Clubs management",
            'events-management':"Events management",
            'dashboard':"Dashboard",
            'financial-management':"Financial management",
            'connected-management':"Connected management",
            'messages':'Messages',
            SNP:"Setting and Policy",
            'setting':"Setting",
            'policy':"Policy",
            'help-center':"Help center",
            'logout':"Logout"
        },
        settings:{
            default:{
                title:"Default settinngs",
                description:"Set the default parameters for the app. The options will be applied on subsequent visits.",
                options:{
                    language:{
                        title:"Language",
                        description:"Select the default system language.",
                        note:"The language will be applied every time you launch the app",
                    },
                    themes:{
                        title:"Themes",
                        description:"Select the default system theme.",
                        note:"The theme will be applied every time the app is launched",
                    },
                    nav:{
                        title:"Navigation status",
                        status:"Status",
                        mode:{
                            true:"Show",
                            false:"Hide"
                        },
                        description:"Select the default navigation status.",
                        note:"The default state will be used every time the app is launched",
                    }
                }
            },
           mail:{
                
           }
        },
        header:{
            profile:"Profile",
            logout:"Logout",
            search:'Search',
            notification:{
                state:{
                    'all':'All',
                    'un-read':'Unread'
                }
            }
        },
        confirm:{
            title:"Be careful with this action:",
            buttons:{
                confirm:"Confirm",
                cancel:"Cancel"
            }
        }
    },
    messages:{
        login:{
            null:"Please enter your email address and password and try again!",
            "incorrect-email":"Your email dont exist!",
            "incorrect-password":"Your Password is incorrect!",
            "incorrect-email-format":"Please enter a email format and try again!",
            "incorrect-password-format":"Your password must be at least 8 characters long and contain a number, a letter, and a special character!",
        },
        confirm:{
            logout:'Let confirm to logout!',
            delete:'Did you sure to want to delete this field?',
            change:'Did you sure to want to change this object informations??'
        },
    },
    
    title:{
        auth:'T.C.D',
        'project':'Finall project',
        name:"Clubs Managements",
        help:"Help",
        'users-management':"Users management",
        'clubs-management':"Clubs management",
        'events-management':"Events management",
        'dashboard':"Dashboard",
        'financial-management':"Financial management",
        'connected-management':"Connected management",
        'setting':"Setting",
        'policy':"Policy",
        'messages':'Messages',
        'help-center':"Help center",
        'logout':"Logout",
        notifications:"Notifications",
        confirm:{
            warning:"Warning!",
            confirm:'Confirm'
        },
        settings:{
            options:{
                title:"Setting options",
                default:"Default settings",
                mail:"Email settings",
                notifications:"Notifications"
            },
        },
    },
    
};