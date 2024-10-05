import React, { useMemo, useState } from "react";
import Div from "../../div/div";
import Layout from "../layout/layout";
import Text from "../../text/text";
import Mode from "../mode/mode";
import useSettings from "../../../../view-models/settingsVM/settingsVM";
import changeMode from "../../../handle/click/changeMode/changeMode";

const Nav=()=>{
    const {language,theme,current,setDefaultView,addSystemNotification}=useSettings();
    const notification=useMemo(()=>{
        return {title:'success',content:'change-nav-status'};
    },[]);
    return (
        <Layout text={language.content.settings.default.options.nav.title} >
            <Text initial={{color:theme.text.content.main}} animate={{color:theme.text.content.main}}
                 margin="15px 0 0 10px" size="12px" >{language.content.settings.default.options.nav.description}</Text>
            <Div justify="start" align="center" margin="5px 0 0 0" width="100%" >
                <Text initial={{color:theme.text.content.main}} animate={{color:theme.text.content.main}}
                     margin="0 10px" size="14px">{language.content.settings.default.options.nav.status+":"}</Text>
                <Text initial={{color:theme.text.content.main}} animate={{color:theme.text.content.main}}
                 margin="0 10px" size="12px">{language.content.settings.default.options.nav.mode.true}</Text>
                 <Mode value={current} hanlde={()=>changeMode(!current,notification,setDefaultView,addSystemNotification)} />
                 <Text initial={{color:theme.text.content.main}} animate={{color:theme.text.content.main}}
                 margin="0 10px" size="12px">{language.content.settings.default.options.nav.mode.false}</Text>
            </Div>
            <Text initial={{color:theme.text.content.th3}} animate={{color:theme.text.content.th3}}
                 margin="5px 0 10px 10px" size="12px" >{language.content.settings.default.options.nav.note}</Text>
        </Layout>
    );
};
// 
export default React.memo(Nav);