import React from "react";
import { useState } from "react";
import Div from "../../div/div";
import useSettings from "../../../../view-models/settingsVM/settingsVM";
import { Icon, listIcons } from "../../../../assets/icons/icons";
import { AnimatePresence } from "framer-motion";
import Screen from "./screen/screen";

const Notification=()=>{
    // 
    const {theme}=useSettings();
    // 
    const [show,setShow]=useState(false);
    return (
        <Div margin="0 25px" border={`2px solid ${theme.border.main}`} position="relative"
            onClick={()=>setShow(true)} radius="35px" justify="center" align="center"
             initial={{width:'30px',height:'30px',color:theme.text.content.th3}}
             animate={{color:show?theme.text.content.main:theme.text.content.th3}}  >
            <Icon  icon={listIcons.header.notification} />
            <AnimatePresence>
                {!!show&&<Screen show={show} setShow={setShow}/>}
            </AnimatePresence>
        </Div>
    );
};
// 
export default React.memo(Notification)