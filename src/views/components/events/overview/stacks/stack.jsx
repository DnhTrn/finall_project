
import Stack from '@mui/material/Stack';
import Div from '../../div/div';
import Title from '../../title/title';
import useSettings from '../../../../view-models/settingsVM/settingsVM';
import Item from '../item/item';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ListStack({requests}) {
    const {language,theme}=useSettings();
    const [hover,setHover]=useState(false);
  return (
    <Div onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
        column={true} padding="0 20px">
      <Title initial={{color:theme.text.title.main}}>{language.content.clubs.overview.title.application}</Title>
      <Stack style={{width:'100%'}} spacing={2}>
            {requests.map((item,key)=><Item key={key} item={item}/>)}
      </Stack>
      <Link style={{textDecoration:'none'}}>
        <Div width="100px" justify="center" align="center" radius="10px" 
            initial={{opacity:0,padding:'5px 10px', color:theme.text.content.second,
            marginTop:'10px',background:theme.background.button.second}}
            animate={{opacity:hover?1:0,color:theme.text.content.second,
                background:theme.background.button.second
            }}
            whileHover={{background:theme.background.hover.th3}}
        >
            {language.content.clubs.overview.btn.more}
        </Div>
      </Link>
    </Div>
  );
}
