import React from "react";
import useSettings from "../../../../../../view-models/settingsVM/settingsVM";
import Div from "../../../../div/div";
import { motion } from "framer-motion";
const Skeleton=()=>{
    const {theme}=useSettings();
    // 
    return (
        <Div width="100%" justify="center" align="center">
            <motion.span initial={{width:'35px',height:'35px',borderRadius:'15px',background:theme.background.layout}}
            animate={{background:theme.background.skeleton}} transition={{duration:1,repeat:Infinity,repeatType: 'reverse'}} />
            <motion.span initial={{width:'calc(90% - 60px)',marginLeft:'10px',height:'35px',borderRadius:'15px',background:theme.background.layout}} 
            animate={{background:theme.background.skeleton}} transition={{duration:1,repeat:Infinity,repeatType: 'reverse'}}/>
        </Div>
    );
};
export default React.memo(Skeleton);