import React, { useMemo } from "react";
import Div from "../../div/div";
import Layout from "../layout/layout";
import useSettings from "../../../../view-models/settingsVM/settingsVM";
import Text from "../../text/text";
import Mode from "../mode/mode";
import changeMode from "../../../handle/click/changeMode/changeMode";

const Theme=()=>{
    const {theme,language,changeTheme,themeMode,addSystemNotification}=useSettings();
    const notification=useMemo(()=>{
        return {title:'success',content:'change-theme'}
    },[]);
    return (
        <Layout text={language.content.settings.default.options.themes.title} >
            <Text initial={{color:theme.text.content.main}} animate={{color:theme.text.content.main}}
                 margin="15px 0 0 10px" size="12px" >{language.content.settings.default.options.themes.description}</Text>
            <Div justify="start" align="center" margin="5px 0 0 0" width="100%">
                <Text initial={{color:theme.text.content.main}} animate={{color:theme.text.content.main}}
                     margin="0 10px" size="14px">{language.content.settings.default.options.themes.title+":"}</Text>
                <Text initial={{color:theme.text.content.main}} animate={{color:theme.text.content.main}}
                 margin="0 10px" size="12px">{language.themes.light}</Text>
                 <Mode value={themeMode} hanlde={()=>changeMode('',notification,changeTheme,addSystemNotification)} />
                 <Text initial={{color:theme.text.content.main}} animate={{color:theme.text.content.main}}
                 margin="0 10px" size="12px">{language.themes.dark}</Text>
            </Div>
            <Text initial={{color:theme.text.content.th3}} animate={{color:theme.text.content.th3}}
                 margin="5px 0 10px 10px" size="12px" >{language.content.settings.default.options.themes.note}</Text>
        </Layout>
    );
};
// 
export default React.memo(Theme);