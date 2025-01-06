import React, { useState } from "react";
import Div from "../../div/div"
import useSettings from "../../../../view-models/settingsVM/settingsVM";
import Title from "../../title/title";
import { Link } from "react-router-dom";
import Text from "../../text/text.jsx";
import Button from "@mui/material/Button";

const Item=({item})=>{
    const {theme,language}=useSettings();
    const [ishover,sethover]=useState(false);
    return (
        <Div border={`1px solid ${theme.border.main}`}
        whileHover={{translateX:'10px'}}
        onMouseEnter={()=>sethover(true)}
        onMouseLeave={()=>sethover(false)}
        justify="space-between" align="center" overflow="hidden"
        width="100%" radius="10px">
            <Div justify='start' align='start' column={true}>
                <Text size="14px" padding="0 20px" margin='10px 0 0 0' >Register request:</Text>
                <Title size="14px" padding="0 20px" margin='5px 0 0 0' >{item?.name??'Club name'}</Title>
                <Text size="12px" padding="0 20px 5px 20px" margin='5px 0 0 0' >Created at: {item?.created_at}</Text>
            </Div>
            <Link style={{textDecoration:"none"}} to={'/clubs-management/application/detail/'+item.id} >
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