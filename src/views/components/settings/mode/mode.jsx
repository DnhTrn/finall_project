import React from "react";
import useSettings from "../../../../models/settings/settings";
import Div from "../../div/div";
import { motion } from "framer-motion";
const Mode=({value,hanlde})=>{
    const {theme}=useSettings();
    return(
        <Div initial={{position:'relative',background:theme.background[value?'second':'layout']
            ,border:`1px solid`}} onClick={()=>hanlde()}
            animate={{background:theme.background[value?'second':'layout']}}
            radius="25px" height="20px" width="15%" >
            <motion.span 
            initial={{position:'absolute',width:'20px',height:'20px',
                background:theme.background.layout,borderRadius:'25px',left:value?'1px':'58%'}}
            animate={{background:theme.background.main,borderRadius:'25px',left:value?'1px':'58%'}} />
        </Div>
    );
};
// 
export default React.memo(Mode)