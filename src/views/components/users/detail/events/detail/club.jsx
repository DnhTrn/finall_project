import React, {useEffect, useState} from "react";
import Div from "../../../../div/div.jsx";
import Title from "../../../../title/title.jsx";
import Text from "../../../../text/text.jsx";
import useSettings from "../../../../../../view-models/settingsVM/settingsVM.jsx";
import ClubsVM from "../../../../../../view-models/clubsVM/clubsVM.jsx";
import {useNavigate} from "react-router-dom";

const Club=({id})=>{
    const [data,setData]=useState(null);
    const navigate=useNavigate();
    const {theme}=useSettings();
    const {detail}=ClubsVM();
    useEffect(() => {
        const fetch=async ()=>{
            try{
                const {status,club}=await detail(id);
                if(status){
                    console.log("club:");
                    console.log(club);
                    setData(club);
                }
            }catch (e) {
                
            }
        }
        fetch();
    }, []);
    return(
        <Div width={'99%'} margin={'10px 0'} column={true}>
            <Title size={'16px'} margin={'5px 0'} >Club information</Title>
            {!data && <span style={{
                width: '100%',
                height: '350px',
                background: theme.background.layout,
                border: `1px solid ${theme.border.main}`,
                borderRadius: '5px',
            }}/>}
            {data && <Div width='100%' justify='start' align='start'>
                <Div initial={{borderRight: `1px solid ${theme.border.main}`}} padding='5px 20px 5px 0' width='50%'
                     column={true} justify="start" align="center">
                    {data?.wallpaper&&<img style={{
                        width:'200px',
                        height:'100px',
                        background:theme.background.layout,
                        border:`1px solid ${theme.border.main}`,
                        borderRadius:'20px',
                    }}  src={data?.wallpaper} alt="" />}
                    {!data?.wallpaper&&<span style={{
                        width:'200px',
                        height:'50px',
                        background:theme.background.layout,
                        border:`1px solid ${theme.border.main}`,
                        borderRadius:'20px',
                    }}></span>}
                <Title onClick={()=>navigate(`/clubs-management/club/detail/${id}`)}  style={{    wordBreak: 'break-word'}}
                       cursor={'pointer'} text='center' margin='0 0 5px 0' size="18px" >{data.name}</Title>
                <Text text='center' margin='0 0 10px 0' size="14px" >Create at: {data.created_at}</Text>
                <Div width="100%" justify='space-between' align='center'>
                    <Div width='45%' justify='center' align='center' column={true} >
                        <Title margin='0 0 10px 0' size="16px">{data.members.length}</Title>
                        <Text margin='0' size="12px" >Members</Text>
                    </Div>
                    <Div width='45%' justify='center' align='center' column={true} >
                        <Title margin='0 0 10px 0' size="16px">10</Title>
                        <Text margin='0' size="12px">Events</Text>
                    </Div>
                </Div>
            </Div>
                <Div padding='5px 10px' wrap='wrap' justify='space-between' height='100%' width='75%'>
                    <Div column={true} width='45%' justify='start' aligin='center' >
                        <Title margin='0'  size='14px' >Leader name:</Title>
                        <Text  margin='0' size='14px'>{data.leader_name}</Text>
                    </Div>
                    <Div column={true} width='45%' justify='start' aligin='center' >
                        <Title margin='0'  size='14px' >Tearch name:</Title>
                        <Text  margin='0' size='14px'>{data.lecturer_name}</Text>
                    </Div>
                    {
                        data.deputys.map((member,key) => <Dupety name={member.name} key={key}/>)
                    }
                    <Div column={true} width='30%' justify='start' aligin='center' >
                        <Title margin='0'  size='14px' >Status:</Title>
                        <Text style={{}}  margin='0' size='14px'>{data.status?'Active':'Disable'}</Text>
                    </Div>
                    <Div column={true} width='60%' justify='start' aligin='center' >
                        <Title margin='0'  size='14px' >Orientations:</Title>
                        <Text  margin='0' size='14px'>{data.orientations}</Text>
                    </Div>
                <Div column={true} width='100%' justify='start' aligin='center' >
                    <Title margin='0'  size='14px' >Club sort description:</Title>
                    <Text  margin='0' size='14px'>{data.sort_description}</Text>
                </Div>
            </Div>
        </Div>}
        </Div>

    )
}
//
//
const Dupety=({name, key})=>{
    return (
        <Div key={key} column={true} width='30%' justify='start' aligin='center' >
            <Title margin='0'  size='14px' >Sub manager group:</Title>
            <Text  margin='0' size='14px'>{name}</Text>
        </Div>
    )
}
export default React.memo(Club);