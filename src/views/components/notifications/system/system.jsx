import React from "react";
import Div from "../../div/div";
import useSettings from "../../../../view-models/settingsVM/settingsVM";
import { AnimatePresence } from "framer-motion";
import Title from "../../title/title";
import Text from "../../text/text";

const System=()=>{
    // 
    const {systemList,theme,language}=useSettings();
    // 
    return (
        <AnimatePresence>
            {systemList[0]&&systemList[0].show&&
                <Div height="30px" index="99999999999" padding="5px 20px" 
                border={`1px solid ${theme.border.main}`} radius="25px" justify="start" align="center"
                initial={{opacity:0,background:theme.background.systemNotify[systemList[0].state],
                    boxShadow:theme.shadow.main,position:'fixed',left:'40%',top:'-30%'}}
                animate={{opacity:1,top:'20px'}} exit={{opacity:0,top:'-30%'}}>
                    <Title size="18px" color={theme.text.title.th4} margin='0' >
                        {language.content.systemNotification[systemList[0].title].title+':'}</Title>
                    <Text ize="12px" color={theme.text.content.second} margin='0 10px' >
                        {language.content.systemNotification[systemList[0].title][systemList[0].content]}
                    </Text>
                </Div>
            }
        </AnimatePresence>
        
    );
};
// 
export default React.memo(System);