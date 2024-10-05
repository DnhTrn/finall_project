import React from "react";
import Div from "../div/div";
import useSettings from "../../../view-models/settingsVM/settingsVM";

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