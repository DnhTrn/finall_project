import React, { useEffect, useRef } from "react";
import Div from "../../../div/div";
import useSettings from "../../../../../models/settings/settings";
import { Icon, listIcons } from "../../../../../assets/icons/icons";
import setUp_ClickOutSide from "../../../../handle/click/clickOutsite/clickOutsite";
import useConfirm from "../../../../../models/context/confirm/useConfirm";
import useAuth from "../../../../../models/context/auth/authService";

const Option=({show,setShow})=>{
    // 
    const {logout}=useAuth();
    // 
    const {theme,language}=useSettings();
    // 
    const {getConfirm}=useConfirm();
    // bat doi tuong menu tai dom
    const optionRef=useRef();
    // gan su kien click chuot de kiem tra co click ra phia ngoai hay khong
    useEffect(() => {
        setUp_ClickOutSide(show,optionRef,setShow);
      },[show]);
    return (
        <Div ref={optionRef} position="absolute" width="150px" radius="15px" index="10000" shadow={theme.shadow.main}
                column={true} justify="start" align="center" border={`2px solid ${theme.border.main}`} 
                initial={{height:0,top:'50px',left:0,opacity:0,background:theme.background.main}} animate={{height:"80px",opacity:1}} 
                exit={{height:0,opacity:0, transition:{delay:0.5}}} >
                <Div width="70%" justify="space-evenly" align="center" margin="5px 0" padding="5px 20px" whileHover={{color:theme.text.content.th4,transition:{delay:0}}}
                    initial={{opacity:0,borderBottom:`1px solid`}} animate={{opacity:1}} exit={{opacity:0,transition:{delay:0.2}}} transition={{delay:0.3}} >
                        <Icon icon={listIcons.header.profile}/>
                        {language.content.header.profile}
                </Div>
                <Div width="70%" justify="space-evenly" align="center" padding="5px 20px"  whileHover={{color:theme.text.content.th4,transition:{delay:0}}} 
                    initial={{opacity:0,background:theme.background.main}} animate={{opacity:1}} exit={{opacity:0,transition:{delay:0}}} transition={{delay:0.5}}
                    onClick={()=>getConfirm('warning','logout',logout)} >
                        <Icon icon={listIcons.header.logout}/>
                        {language.content.header.logout}
                </Div>
        </Div>
    );
};
// 
export default React.memo(Option);