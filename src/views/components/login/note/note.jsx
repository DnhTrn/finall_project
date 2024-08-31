import React from "react";
import { motion } from 'framer-motion';
import Text from "../../text/text";
import Div from "../../div/div";
import useSettings from "../../../../models/settings/settings";

const Note=()=>{
    const {language,theme}=useSettings();
    return(
        <Div justify="start" align="baseline" column={true} margin="80px 0 15px 0" >
            <Div animate={{color:theme.text.title.main}} transition={{duration:0.5}}  margin="0 0 10px 0" size="80px" overflow="hidden" justify="center" align="baseline" position="relative" >
                <Text weight="bolder" margin="0">{`${language.content.login.title} .`}</Text>
            </Div>
            <Div animate={{color:theme.text.content.th3}} transition={{duration:0.3}} margin="0" size="14px" overflow="hidden" justify="center" align="baseline" position="relative" >
                <Text size="14px" weight="bolder">{language.content.login.note}</Text>
            </Div>
        </Div>
    );
};
// 
export default React.memo(Note);