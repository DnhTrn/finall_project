
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useSettings from "../../../../../view-models/settingsVM/settingsVM.jsx";
import Div from "../../../div/div.jsx";
import Title from "../../../title/title.jsx";
import Item from "./item/item.jsx";
import Text from "../../../text/text.jsx";
import Button from "@mui/material/Button";

export default function ListStack({requests}) {
    const {language,theme}=useSettings();
    const [hover,setHover]=useState(false);
  return (
    <Div width={'25%'} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
        column={true}>
      <Title margin={'5px 0'} initial={{color:theme.text.title.main}}>{language.content.clubs.overview.title.application}</Title>
      <Stack style={{width:'100%'}} spacing={2}>
            {requests.map((item,key)=><Item key={key} item={item}/>)}
      </Stack>
      <Link style={{textDecoration:'none'}} to={'/events-management/application'}>
          <Button variant="outlined" style={{margin:'10px 0',fontSize:'10px'}} color='info' size="small">
              view more
          </Button>
      </Link>
        <Text size={'12px'} margin={'5px 0'}>These are events where clubs sign up to participate in events organized by the school. After browsing,
            you can track these events through the main event to which the event is registered.</Text>
    </Div>
  );
}
