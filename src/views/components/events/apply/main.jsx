import React, {useEffect, useState} from "react";
import Div from "../../../div/div.jsx";
import Text from "../../../text/text.jsx";
import Title from "../../../title/title.jsx";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation, Pagination, Scrollbar} from "swiper/modules";
import File from "../../../orthers/file/file.jsx";
import useSettings from "../../../../../view-models/settingsVM/settingsVM.jsx";
import Change from "./change/change.jsx";
import EventVM from "../../../../../view-models/eventVM/eventVM.jsx";
import Total from "./total/total.jsx";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";

const Main =({data,memberss,count,set})=>{
    const {theme,setLoad}=useSettings();
    const [progress,setProgress] = useState(data?.progress);
    const [status,setStatus] = useState(data?.status);
    const [pro,setPro] = useState(data?.progress);
    const [sta,setSta] = useState(data?.status);
    const [updateData, setUpdateData]=useState({id:data?.id,progress:progress.per,status:status.status?1:0});
    const [change,setChange]=useState(false);
    const navigate=useNavigate();
    const {quickChange}=EventVM();
    useEffect(()=>{
        setUpdateData({id:data?.id,progress:pro.per,status:sta.status?1:0});
    },[sta,pro]);
    const handle=async ()=>{
        try{
            setLoad(true);
            const {status}=await quickChange(updateData);
            setLoad(false);
            if(status){
                setChange(false);
                setStatus(sta);
                setProgress(pro);
                const temp={...data,status:sta,progress:pro};
                set(temp);
            }
        }catch (e) {
            setLoad(false);
            console.error('UI: '+e);
        }
    }
    //
    const handleCancel=()=>{
        setChange(false);
        setSta(status);
        setPro(progress);
    }
    //
    const handleEdit=()=>{
        navigate('/events-management/event/change/'+data.id);
    }
    return(
        <Div width={'100%'} justify={'start'} align={'start'} column={true}>
            <Div width="100%" padding={'0 0 0 10px'}
                 style={{borderBottom:`1px solid ${theme.border.main}`}}
                 justify={'start'} align={'start'} wrap={'wrap'} >
                <Div width="53%" justify={'start'} align={'center'} wrap={'wrap'} >
                    <Div width={'100%'} justify={'start'} align={'start'} style={{borderBottom:`1px solid ${theme.border.main}`}}>
                        <Div width={'55%'} margin={'0 0 10px 0'} justify={'space-between'} column={true} align={'start'} overflow={'hidden'}>
                            <Div width={'100%'} justify={'start'} align={'start'} column={true}>
                                <Title size={'20px'} margin={0} >Event name:</Title>
                                <Text size={'18px'} weight={600} margin={'5px 0'} style={{    wordWrap: 'break-word',
                                    width: '95%'}}>{data?.name??''}</Text>
                            </Div>
                            <Div width={'90%'} margin={'10px 0 0 0'} justify={'start'} align={'start'}>
                                <Button style={{fontSize: '10px',textAlign:'center'}} onClick={handleEdit} size={'small'} variant='text' type={'string'}>
                                    Edit event
                                </Button>
                                {!change&&<Button style={{fontSize: '10px',marginLeft:'10px',textAlign:'center'}} type={'string'}  onClick={() => setChange(true)} size={'small'} variant='contained'>
                                    Change status
                                </Button>}
                                {change&&<Button style={{fontSize: '10px',marginLeft:'10px',textAlign:'center'}} type={'string'}  onClick={handleCancel} size={'small'} variant='outlined'>
                                    Cancel
                                </Button>}
                                {change&&<Button style={{fontSize: '10px',marginLeft:'10px',textAlign:'center'}} type={'string'}  onClick={handle} size={'small'} variant='contained'>
                                    Save
                                </Button>}
                            </Div>
                        </Div>
                        <Div width={'45%'} padding={'0 0 0 10px'} justify={'start'} align={'start'} wrap={'wrap'} style={{borderLeft:`1px solid ${theme.border.main}`}}>
                            {change&&<Change progress={pro} status={sta} setProgress={setPro} setStatus={setSta}/>}
                            {!change&&<Div width={'100%'} justify={'start'} align={'start'} column={true} >
                                <Div width={'100%'} margin={'0 0 10px 0'} justify={'start'} align={'center'}>
                                    <Title size={'12px'} margin={0}>Progress:</Title>
                                    <Text style={{
                                        padding: '2px 10px',
                                        textAlign: 'center',
                                        background: theme.background.progress[progress?.state ?? 'cancel'],
                                        color: theme.text.title.th4,
                                        borderRadius: '5px',
                                        marginLeft: '10px',
                                    }} size={'12px'} weight={600} margin={0}>{progress.status}</Text>
                                </Div>
                                <Div width={'100%'} margin={'0 0 10px 0'} justify={'start'} align={'center'}>
                                    <Title size={'12px'} margin={0}>Status:</Title>
                                    <Text style={{
                                        padding: '2px 10px',
                                        textAlign: 'center',
                                        background: theme.background.status[status?.status ?? 'cancel'],
                                        color: theme.text.title.th4,
                                        borderRadius: '5px',
                                        marginLeft: '10px',
                                    }} size={'12px'} weight={600} margin={0}>{status?.text ?? ''}</Text>
                                </Div>
                            </Div>}
                            <Div column={true} width={'45%'} margin={'0 0 10px 0'} >
                                <Title size={'14px'} margin={0} >Created at:</Title>
                                <Text  size={'12px'} weight={600} margin={0}>{data?.created_at??''}</Text>
                            </Div>
                            <Div column={true} width={'45%'} margin={'0 0 10px 0'} >
                                <Title size={'14px'} margin={0} >Updated at:</Title>
                                <Text  size={'12px'} weight={600} margin={0}>{data?.updated_at??''}</Text>
                            </Div>
                            <Div column={true} width={'45%'} margin={'0 0 10px 0'} >
                                <Title size={'14px'} margin={0} >Start at:</Title>
                                <Text  size={'12px'} weight={600} margin={0}>{data?.start_at??''}</Text>
                            </Div>
                            <Div column={true} width={'45%'} margin={'0 0 10px 0'} >
                                <Title size={'14px'} margin={0} >End at:</Title>
                                <Text  size={'12px'} weight={600} margin={0}>{data?.end_at??''}</Text>
                            </Div>
                        </Div>
                    </Div>
                    <Div width={'100%'} margin={'10px 0'} justify={'start'} column={true} align={'start'} overflow={'hidden'}>
                        <Title size={'16px'} margin={0} >Sort description:</Title>
                        <Text size={'14px'} weight={600} margin={'5px 0'} style={{wordWrap: 'break-word',
                            width: '95%'}}>{data?.sort_description??''}</Text>
                    </Div>
                    <Div width={'100%'} margin={'0 0 10px 0'} justify={'start'} column={true} align={'start'} overflow={'hidden'}>
                        <Title size={'16px'} margin={0} >Full description:</Title>
                        <Text size={'14px'} weight={600} margin={'5px 0'} style={{wordWrap: 'break-word',
                            width: '95%'}}>{data?.full_description??''}</Text>
                    </Div>
                </Div>
                <Div  style={{borderLeft:`1px solid ${theme.border.main}`,
                    paddingLeft:'10px'
                }} width={'44%'} column={true}>
                    <Title size={'16px'} margin={"5px 0"} >Images</Title>
                    {!data?.imgs && <span style={{
                        width: '95%',
                        height: '250px',
                        background: theme.background.layout,
                        border: `1px solid ${theme.border.main}`,
                        borderRadius: '20px',
                    }}/>}
                    {data?.imgs&& data?.imgs.length == 0 && <span style={{
                        width: '95%',
                        height: '250px',
                        background: theme.background.layout,
                        border: `1px solid ${theme.border.main}`,
                        borderRadius: '20px',
                    }}/>}
                    <Swiper style={{width: '100%', padding: '5px 0'}} modules={[Navigation, Pagination, Scrollbar, A11y]}
                            spaceBetween={50}
                            slidesPerView={1}
                            pagination={{clickable: true}}
                            scrollbar={{draggable: true}}>
                        {data?.imgs&&data?.imgs.length>0&&data?.imgs.map((img) => (
                            <SwiperSlide><img src={img} style={{
                                width:'100%',
                                height:'300px',
                                borderRadius:'10px',
                            }}/></SwiperSlide>
                        ))
                        }
                    </Swiper>
                    <Title size={'16px'} margin={"5px 0"} >Files</Title>
                    {!data?.files && <span style={{
                        width: '95%',
                        height: '50px',
                        background: theme.background.layout,
                        border: `1px solid ${theme.border.main}`,
                        borderRadius: '20px',
                    }}/>}
                    {data?.files&&data?.files.length==0 && <span style={{
                        width: '95%',
                        height: '50px',
                        background: theme.background.layout,
                        border: `1px solid ${theme.border.main}`,
                        borderRadius: '20px',
                    }}/>}
                    <Swiper style={{width:'100%',padding:'5px 0'}} modules={[Navigation, Pagination, Scrollbar, A11y]}
                            spaceBetween={50}
                            slidesPerView={2}
                            pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}>
                        {
                            data?.files&&data?.files.map((file) => (
                                <SwiperSlide><File url={file}/></SwiperSlide>
                            ))
                        }
                    </Swiper>
                </Div>
            </Div>
            <Total data={data} members={memberss} count={count} check={progress?.per??0}/>
        </Div>

    )
}
//
export default React.memo(Main);