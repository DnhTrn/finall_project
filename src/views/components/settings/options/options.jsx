import React from "react";
import Layout from "../layout/layout";
import Text from "../../text/text";
import useSettings from "../../../../models/settings/settings";
import Div from "../../div/div";
import { motion } from "framer-motion";
const Options=()=>{
    const {language,theme,langList,changeLanguage}=useSettings();
    return (
        <Layout width="50%" text={language.content.settings.default.options.language.title} >
            <Text initial={{color:theme.text.content.main}} animate={{color:theme.text.content.main}}
                 margin="15px 0 0 10px" size="12px" >{language.content.settings.default.options.language.description}</Text>
            <Div margin="5px 0 0 0" width="100%" >
                <Text initial={{color:theme.text.content.main}} animate={{color:theme.text.content.main}}
                 margin="0 10px" size="14px" >{language.content.settings.default.options.language.title+":"}</Text>
                 <motion.select initial={{height:"24px",width:"60%",borderRadius:'10px'}} onChange={(e)=>changeLanguage(e.target.value)} >
                    {
                        langList.map((lang,index)=><motion.option key={index} value={lang} >{language.language[lang]}</motion.option>)
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