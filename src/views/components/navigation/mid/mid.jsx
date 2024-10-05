import React, { useMemo } from "react";
import Title from "../../title/title";
import Page from "../page/page";
import { useLocation } from "react-router-dom";
import useSettings from "../../../../view-models/settingsVM/settingsVM";
import Grid from "../../grid/grid";

const Mid=({show})=>{
    const {language,theme}=useSettings();
    const location=useLocation().pathname;
    const lists=useMemo(()=>['dashboard','users-management','clubs-management','messages','events-management','financial-management','connected-management'],[])
    return (
        <Grid rows="40px auto" margin="10px 0 0 10px" column={true} width="90%" >
            {!show&&<span />}
            {!!show&&<Title initial={{opacity:0,x:"-30%",color:theme.text.title.main}} animate={{opacity:1,x:0,color:theme.text.title.main}} 
                margin="0 0 10px 0" size="18px">{language.content.nav.managements}</Title>}
            {lists.map((item,index)=><Page show={show} selected={location.includes(item)} key={index} text={item}/>)}
        </Grid>
    );
};
// 
export default React.memo(Mid);