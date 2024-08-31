import React from "react";
import Div from "../div/div";
import useSettings from "../../../models/settings/settings";

const Avata=({radius})=>{
    const {theme}=useSettings();
    return (
        <Div width={radius} height={radius} radius="50%"
            initial={{border:`2px solid ${theme.border.main}`,background:theme.background.layout}}>

        </Div>
    );
};
// 
export default React.memo(Avata);