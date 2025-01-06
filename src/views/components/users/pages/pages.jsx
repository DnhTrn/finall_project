import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import Div from "../../div/div";
import useSettings from "../../../../view-models/settingsVM/settingsVM";
import Title from "../../title/title";
import Page from "../page/page";

const Pages=({apply=true})=>{
    const lists=useMemo(()=>['overview','management','create']);
    if (apply){
        lists.push('application');
    }
    const location=useLocation().pathname.split("/");
    const current=location[2];  
    // 
    const {language,theme}=useSettings();
    return (
      <Div height="100%" width="100%" column={true}
        
        initial={{background:theme.background.main
        }} animate={{background:theme.background.main}} >
            <Title size="18px" >{language.title.events.title}</Title>
            {
                lists.map((item,key)=><Link key={key} style={{textDecoration: 'none'}} to={item}>
                    <Page active={current===item?true:false} name={item}/>
                </Link>)
            }
      </Div>  
    );
};
// 
export default React.memo(Pages);