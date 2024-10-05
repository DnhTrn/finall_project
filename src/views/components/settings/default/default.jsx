import React from "react";
import Div from "../../div/div";
import useSettings from "../../../../view-models/settingsVM/settingsVM";
import Options from "../options/options";
import Title from "../../title/title";
import Text from "../../text/text";
import Theme from "../theme/theme";
import Nav from "../nav/nav";

const Default=()=>{
    const {theme,language}=useSettings();
    return (
        <Div initial={{background:theme.background.main}}
        animate={{background:theme.background.main}} width='100%' height="100%" justify="start" align="start" column={true} >
            <Title size="18px" margin="10px 0 10px 10px" >{language.content.settings.default.title}</Title>
            <Text size="12px" margin="0 0 30px 10px" >{language.content.settings.default.description}</Text>
            <Div width='90%' margin="0 5%" height="100%"  column={true} justify="start" align="start">
                <Options/>
                <Theme/>
                <Nav/>
            </Div>
        </Div>
    );
};
// 
export default React.memo(Default);