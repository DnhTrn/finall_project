
import Stack from '@mui/material/Stack';
import Div from '../../div/div';
import Title from '../../title/title';
import useSettings from '../../../../view-models/settingsVM/settingsVM';
import Item from '../item/item';
import React, { useState } from 'react';
import {Link, useNavigation} from 'react-router-dom';
import Button from "@mui/material/Button";

export default function ListStack({requests}) {
    const {language,theme}=useSettings();
    const [hover,setHover]=useState(false);
  //
    const navigation=useNavigation();
  return (
    <Div onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
        column={true} padding="0 20px">
      <Title initial={{color:theme.text.title.main}}>{language.content.clubs.overview.title.application}</Title>
      <Stack style={{width:'100%'}} spacing={2}>
            {requests.map((item,key)=><Item key={key} item={item}/>)}
      </Stack>
      <Link style={{textDecoration:'none'}} to={'/clubs-management/application'}>
          <Button variant="outlined" style={{margin:'10px 0',fontSize:'10px'}} color='info' size="small">
              view more
          </Button>
      </Link>
    </Div>
  );
}
