import React, {useMemo} from "react";
import Layout from "../layout/layout";
import Text from "../../text/text";
import useSettings from "../../../../view-models/settingsVM/settingsVM";
import Div from "../../div/div";
import { motion } from "framer-motion";
import changeMode from './../../../handle/click/changeMode/changeMode';
const Options=()=>{
    const {language,code,theme,langList,changeLanguage,addSystemNotification}=useSettings();
    // 
    const notification=useMemo(()=>{
        return {title:'success',content:'change-language'}
    },[]);
    return (
        <Layout width="50%" text={language.content.settings.default.options.language.title} >
            <Text initial={{color:theme.text.content.main}} animate={{color:theme.text.content.main}}
                 margin="15px 0 0 10px" size="12px" >{language.content.settings.default.options.language.description}</Text>
            <Div margin="5px 0 0 0" width="100%" >
                <Text id='language-selected' initial={{color:theme.text.content.main}} animate={{color:theme.text.content.main}}
                 margin="0 10px" size="14px" >{language.content.settings.default.options.language.title+":"}</Text>
                 <motion.select aria-labelledby="language-selected"  initial={{height:"24px",width:"60%",borderRadius:'10px'}} 
                 onChange={(e)=>changeMode(e.target.value,notification,changeLanguage,addSystemNotification)} value={code} >
                    {
                        langList.map((lang,index)=><option key={index} value={lang} >{language.language[lang]}</option>)
                    }
                 </motion.select>
            </Div>
            <Text initial={{color:theme.text.content.th3}} animate={{color:theme.text.content.th3}}
                 margin="5px 0 10px 10px" size="12px" >{language.content.settings.default.options.language.note}</Text>
        </Layout>
    );
};
// 
export default React.memo(Options);