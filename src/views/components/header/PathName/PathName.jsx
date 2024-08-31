import { AnimatePresence } from "framer-motion";
import React from "react";
import { useLocation } from "react-router-dom";
import { Icon, listIcons } from "../../../../assets/icons/icons";
import Grid from "../../grid/grid";
import Title from "../../title/title";
import useSettings from "../../../../models/settings/settings";

const PathName=()=>{
    // 
    const location=useLocation().pathname.split("/");
    const {language,theme}=useSettings();
    return (
        <Grid animate={{gridTemplateColumns:location.length > 1?'30px 300px':'300px' }} align="center" >
            <AnimatePresence>
                {
                    location.length > 1 && (
                        <Icon style={{fontSize:'24px',color:theme.text.title.th3,cursor:'pointer'}} icon={listIcons.header.back} /> 
                    )
                }
            </AnimatePresence>
            <Title size="24px" color={theme.text.title.main} margin="0" >{language.content.nav[location[1]]}</Title>
        </Grid>
    );
};
// 
export default React.memo(PathName);