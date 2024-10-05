import { Link } from "react-router-dom";
import Text from "../../text/text";
import useSettings from "../../../../view-models/settingsVM/settingsVM";
import React from "react";

const Page=({text,selected})=>{
    const {theme,language}=useSettings();
    return (
        <Link style={{textDecoration: 'none',margin:"5px 0"}} to={text} >
            <Text size="12px" margin='0' padding="5px 0" 
                initial={{color:theme.text.title[selected?'main':'second'],borderBottom:selected?`1px solid`:'none'}}
                animate={{color:theme.text.title[selected?'main':'second'],borderBottom:selected?`1px solid`:'none'}}
                transition={{borderBottom:{duration:0.1}}} >{language.title.settings.options[text]}</Text>
        </Link>
    );
};
// 
export default React.memo(Page);