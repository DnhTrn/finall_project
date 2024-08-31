import { AnimatePresence } from "framer-motion";
import React from "react";
import Div from "../../../div/div";
import useNotifications from "../../../../../view-models/notificationVM/useNotifications";
import Load from "../load/load";

const Content=()=>{
    const {useGetShorts}=useNotifications();
    const {data,isLoad}=useGetShorts();
    return (
        <Div radius="15px" 
        initial={{opacity:0,width:'90%',minHeight:'250px'}} animate={{opacity:1}} 
        exit={{opacity:0,transition:{delay:0}}} transition={{delay:0.3}} column={true} >
            {isLoad&&<Load/>}
        </Div>
    );
};
// 
export default React.memo(Content);