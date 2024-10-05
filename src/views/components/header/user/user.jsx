import React, {useState } from "react";
import Avata from "../../avata/avata";
import Div from "../../div/div";
import useSettings from "../../../../view-models/settingsVM/settingsVM";
import Text from "../../text/text";
import { Icon, listIcons } from "../../../../assets/icons/icons";
import { AnimatePresence } from "framer-motion";
import Option from "./option/option";

const User=()=>{
    // lay ra cai theme hien tai
    const {theme}=useSettings();
    // check neu true thi show ra menu hien tai
    const [show,setShow]=useState(false);
    // check su kien hove vao ten
    const [isHover,setIsHover]=useState(false);
    //   
    return (
        <Div  justify="center" align="center" padding="0 10px 0 0" radius='35px' cursor="pointer" position="relative"
            onClick={()=>setShow(true)}
            initial={{border:`2px solid ${theme.border.main}`,color:theme.text.content.main}} 
            animate={{border:`2px solid ${theme.border.main}`,width:'auto',color:theme.text.content.main}}>
            <Div>
                <Avata radius="35px" />
            </Div>
            <Div height="35px" width="65px" margin="0 10px" overflow='hidden' justify="start" align="center" 
                onMouseEnter={()=>setIsHover(true)}
                onMouseLeave={()=>setIsHover(false)}>
                <Text initial={{x:0}} animate={{x:isHover?[0,'-100%']:0}} transition={{x:{repeat:isHover&&Infinity,duration:2}}}
                 whiteSpace='nowrap' margin="0" >Tran Cong Danh</Text>
            </Div>
            <Icon icon={listIcons.header.list[show]} />
            <AnimatePresence>
                {
                    show&&<Option show={show} setShow={setShow} />
                }
            </AnimatePresence>
        </Div>
    );
};
// 
export default React.memo(User);