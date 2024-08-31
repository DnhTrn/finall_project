import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars,faGear, faCircleQuestion,faHandshakeAngle,
    faListCheck,faPeopleGroup,faUsers,faGauge,faChartSimple,
    faBookmark,faRightFromBracket,faEye,faEyeSlash,faMagnifyingGlass,faArrowLeft,
    faAngleUp,faAngleDown,faUser,faMessage} from "@fortawesome/free-solid-svg-icons";
// 
import { faBell} from "@fortawesome/free-regular-svg-icons/faBell";
export const Icon=FontAwesomeIcon;
// 
export const listIcons={
    navigation:{
        menu:faBars,
        'users-management': faUsers,
        'clubs-management': faPeopleGroup,
        'events-management': faListCheck,
        'dashboard': faGauge,
        'financial-management': faChartSimple,
        'connected-management': faHandshakeAngle,
        "setting": faGear,
        "messages":faMessage,
        "help-center": faCircleQuestion,
        "policy": faBookmark,
        "logout": faRightFromBracket,
    },
    password:{
        true:faEye,
        false:faEyeSlash,
    },
    
    header:{
        "logout": faRightFromBracket,
        profile:faUser,
        back:faArrowLeft,
        search:faMagnifyingGlass,
        notification:faBell,
        list:{
            false:faAngleDown,
            true:faAngleUp,
        },
    }
};