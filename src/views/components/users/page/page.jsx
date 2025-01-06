import React from "react";
import Div from "../../div/div";
import { listIcons } from "../../../../assets/icons/icons";
import Text from "../../text/text";
import useSettings from "../../../../view-models/settingsVM/settingsVM";

const Page=({name,active})=>{
    const Icon=listIcons['clubs']['pages'][name];
    const {language,theme}=useSettings();
    return (
        <Div initial={{
            color:active?theme.text.title.main:theme.text.title.second
        }}
        animate={{
            color:active?theme.text.title.main:theme.text.title.second
        }}
        whileHover={{
            color:theme.text.hover.th4
        }} padding="5px 10px" cursor="pointer" margin="5px 0" justify="start" width="90%" align="center">
            <Icon/>
            <Text margin="0 0 0 10px" >{language.title.events.pages[name]}</Text>
        </Div>
    );
};
//  
export default React.memo(Page);