import React, {useState} from "react";
import {Link} from "react-router-dom";
import Div from "../../../../div/div.jsx";
import Text from "../../../../text/text.jsx";
import Title from "../../../../title/title.jsx";
import useSettings from "../../../../../../view-models/settingsVM/settingsVM.jsx";
import Button from "@mui/material/Button";

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
                <Text size="14px" padding="0 20px" margin='10px 0 0 0' >Event request apply:</Text>
                <Title size="14px" padding="0 20px" margin='5px 0' >{item?.name??'Event name'}</Title>
            </Div>
            <Link style={{textDecoration:"none"}} to={'/events-management/application/detail/'+item?.id}>
                <Div initial={{opacity:0,translateY:'0',
                }}
                     animate={{opacity:ishover?1:0,
                         translateX:ishover?'-10px':'30px',
                     }}
                     padding="5px 20px" radius="10px">
                    <Button variant="contained" style={{margin:'2px 0',fontSize:'8px'}} color='info' size="small">
                        view
                    </Button>
                </Div>
            </Link>
        </Div>
    )
}
export default React.memo(Item);