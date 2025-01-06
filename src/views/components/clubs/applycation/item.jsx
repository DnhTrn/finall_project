import React, { useState } from "react";
import useSettings from "../../../../../view-models/settingsVM/settingsVM.jsx";
import Div from "../../../div/div.jsx";
import {Link} from "react-router-dom";
import Title from "../../../title/title.jsx";
import Text from "../../../text/text.jsx";
import Button from "@mui/material/Button";
const position=(value)=>{
    let unit;
    console.log(value)
    switch(parseInt(value)){
        case 0:
        case 1:
            unit= 'Admin'
            break;
        case 2:
            unit= 'Leader'
            break;
        case 3:
            unit= 'Sub master'
            break;
        case 4:
            unit= "Lecture"
            break;
        default:
            unit= 'Members'
    }
    return unit;
}
const Item=({item})=>{
    const {theme,language}=useSettings();
    const [ishover,sethover]=useState(false);
    return (
        <Div minHeight={'50px'}
        border={`1px solid ${theme.border.main}`}
        whileHover={{translateX:'10px'}}
        onMouseEnter={()=>sethover(true)}
        onMouseLeave={()=>sethover(false)}
        justify="space-between" align="center" overflow="hidden" margin={'0 0 5px 0'}
        width="95%" radius="10px">
            <Div justify='start' padding={'5px 0'} width={'100%'} align='start' column={true}>
                <Title size="14px" padding="0 0 0 20px" margin='0' >{item?.name??'User name'}</Title>
               <Text size="12px" padding="0 0 0 20px" margin='5px 0 0 0' >{position(item?.position_id)}</Text>
            </Div>
           <Link style={{textDecoration:"none"}} to={'/users-management/user/detail/'+item?.id} >
               <Div initial={{opacity:0,translateY:'0',
                    color:theme.text.content.th4,
                    }}
                    animate={{opacity:ishover?1:0,
                    color:theme.text.content.th4,
                    translateX:ishover?'-10px':'10px',
                    }}
                    padding="5px 10px" size={'12px'} radius="10px">
                       <Button variant="contained" style={{margin:'2px 0',fontSize:'8px'}} color='info' size="small">
                           view
                       </Button>
               </Div>
           </Link>
        </Div>
    )
}
export default React.memo(Item);