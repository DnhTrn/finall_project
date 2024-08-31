import React from "react";
import useSettings from "../../../../models/settings/settings";
import Div from "../../div/div";

const Logo=()=>{
    const {theme,changeView}=useSettings();
    return (
        <Div width="50px" height="50px" margin="15px 0 0 15px" radius="10px"
        initial={{width:"50px", height:"50px"}}
        animate={{background:theme.background.main}}
        whileTap={{width:['50px','65px','50px'],height:['50px','65px','50px'],rotate:30}}
        cursor="pointer"
        onClick={()=>{changeView()}}>

        </Div>
    );
};
export default React.memo(Logo);