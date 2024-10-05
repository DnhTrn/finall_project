import React from "react";
import useSettings from "../../../../../view-models/settingsVM/settingsVM";
import Div from "../../../div/div";

const State=({value,setValue})=>{
    const {language,theme}=useSettings();
    return (
        <Div justify="start" width="80%" align="center" size="12px" 
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{delay:0}}} transition={{delay:0.3}} >
            <Div border={`1px solid ${theme.border.main}`} margin="0 10px 0 0" padding="5px 20px" radius="25px"  
                cursor="pointer" onClick={()=>setValue('all')} initial={{background:value==='all'?theme.background.button.main:theme.background.button.th3,
                color:value==='all'?theme.text.content.second:theme.text.content.main}} whileHover={{background:theme.background.button.second}}
                animate={{background:value==='all'?theme.background.button.main:theme.background.button.th3,
                color:value==='all'?theme.text.content.second:theme.text.content.main}} >{language.content.header.notification.state.all}</Div>
            <Div border={`1px solid ${theme.border.main}`} padding="5px 20px" radius="25px" cursor="pointer" onClick={()=>setValue('un-read')}
                initial={{background:value==='un-read'?theme.background.button.main:theme.background.button.th3,
                color:value==='un-read'?theme.text.content.second:theme.text.content.main}} whileHover={{background:theme.background.button.second}}
                animate={{background:value==='un-read'?theme.background.button.main:theme.background.button.th3,
                color:value==='un-read'?theme.text.content.second:theme.text.content.main}} >{language.content.header.notification.state['un-read']}</Div>
        </Div>
    );
};
// 
export default React.memo(State);