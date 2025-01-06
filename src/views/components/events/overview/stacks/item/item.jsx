import React, { useState } from "react";
import Div from "../../div/div"
import useSettings from "../../../../view-models/settingsVM/settingsVM";
import Title from "../../title/title";
import { Link } from "react-router-dom";
import Text from "../../text/text.jsx";

const Item=({item})=>{
    const {theme,language}=useSettings();
    const [ishover,sethover]=useState(false);
    return (
        <Div initial={{background:theme.background.main}}
        border={`1px solid ${theme.border.main}`}
        animate={{background:theme.background.main}}
        whileHover={{background:theme.background.hover.main,translateX:'10px'}}
        onMouseEnter={()=>sethover(true)}
        onMouseLeave={()=>sethover(false)}
        justify="space-between" align="center" overflow="hidden"
        width="100%" radius="10px">
            <Div justify='start' align='start' column={true}>
               <Text size="14px" padding="0 20px" margin='10px 0 0 0' >Đơn xin thành lập câu lạc bộ:</Text>
                <Title size="14px" padding="0 20px" margin='5px 0' >{item?.name??'Club name'}</Title>
            </Div>
           <Link style={{textDecoration:"none"}} >
               <Div initial={{opacity:0,translateY:'0',
                    color:theme.text.content.main,
                    background:theme.background.button.main
                    }}
                    animate={{opacity:ishover?1:0,
                    color:theme.text.content.second,
                    translateX:ishover?'-10px':'30px',
                        background:theme.background.button.main
                    }}
                    whileHover={{
                        background:theme.background.hover.second,

                    }}
                    padding="5px 20px" radius="10px">
                        {language.content.clubs.overview.btn.view}
               </Div>
           </Link>
        </Div>
    )
}
export default React.memo(Item);