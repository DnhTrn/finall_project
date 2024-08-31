import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import Div from "../../div/div";
import Page from "../page/page";
import useSettings from "../../../../models/settings/settings";
import Title from "../../title/title";

const Pages=()=>{
    const lists=useMemo(()=>['default','mail','notifications']);
    const location=useLocation().pathname.split("/");
    // 
    const {language,theme}=useSettings();
    return (
      <Div height="100%" width="100%" column={true} 
        initial={{background:theme.background.main}} animate={{background:theme.background.main}} >
            <Title size="18px" >{language.title.settings.options.title}</Title>
            {
                lists.map((item,index)=><Page key={index} text={item} selected={location[2]===item}/>)
            }
      </Div>  
    );
};
// 
export default React.memo(Pages);