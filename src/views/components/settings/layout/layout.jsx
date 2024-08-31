import React from "react";
import Div from "../../div/div";
import Title from "../../title/title";
import useSettings from "../../../../models/settings/settings";

const Layout=({text,children})=>{
    const {theme}=useSettings();
    return (
        <Div initial={{border:`1px solid ${theme.border.main}`}} animate={{border:`1px solid ${theme.border.main}`}}
        column={true} width="55%" radius="10px" position="relative" margin="15px 0" >
            <Title margin="0" 
            initial={{position:"absolute",top:"-20px",left:"10px",
            background:theme.background.main,color:theme.text.title.main}} 
            animate={{background:theme.background.main,color:theme.text.title.main}}>{text}</Title>
            {children}
        </Div>
    );
};
// 
export default React.memo(Layout);