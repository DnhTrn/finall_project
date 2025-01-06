import Div from "../../../div/div.jsx";
import Title from "../../../title/title.jsx";
import React, {useEffect, useState} from "react";
import Item from "./item.jsx";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const Members=({data})=>{
    const [checked,setChecked]=useState(false);
    const [limit,setLimit]=useState(5);
    const [members,setMembers]=useState([]);
    useEffect(() => {
        const temp=data.members.map((user,key)=>{
            if(user?.position_id==5){
                if(key<limit){
                    return <Item item={user} key={key}/>;
                }
            }
        });
        setMembers(temp);
    }, [limit]);
    useEffect(() => {
        setLimit(checked?members.length:5);
    }, [checked]);

    return (
        <Div width="100%" justify={'start'} align={'start'} column={true}>
            <Title margin={'0 0 10px 0'} size={'18px'}>Members</Title>
            <Div width="100%" style={{overflowY:'scroll'}} maxHeight={'250px'} justify={'start'} align={'start'} column={true} >
                {members}
            </Div>
            {members.length>4&&<Button variant={checked?"contained":'outlined'} onClick={()=>setChecked(!checked)} style={{margin:'2px 0',fontSize:'8px'}} color='primary' size="small">
                {checked?'hiden':'view more'}
            </Button>}
        </Div>
    )
}
//
export default React.memo(Members)