import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import useSettings from "../../../../models/settings/settings";
import Div from "../../div/div";
import Title from "../../title/title";
import Page from "../page/page";
import Grid from "../../grid/grid";

const Bot=({show})=>{
    const {language,theme}=useSettings();
    const location=useLocation().pathname;
    const lists=useMemo(()=>['setting','help-center','policy'],[])
    return (
        <Grid rows="40px auto"  margin="10px 0 0 10px" column={true} >
            {!show&&<span/>}
            {!!show&&<Title initial={{opacity:0,x:"-30%",color:theme.text.title.main}} animate={{opacity:1,x:0,color:theme.text.title.main}}  
                margin="10px 0 10px 0" size="18px">{language.content.nav.SNP}</Title>}
            {lists.map((item,index)=><Page show={show} selected={location.includes(item)} key={index} text={item}/>)}
        </Grid>
    );
};
// 
export default React.memo(Bot);