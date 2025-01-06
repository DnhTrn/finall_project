import useSettings from "../../../../../../view-models/settingsVM/settingsVM.jsx";
import Div from "../../../../div/div.jsx";
import Title from "../../../../title/title.jsx";
import Text from "../../../../text/text.jsx";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation, Pagination, Scrollbar} from "swiper/modules";
import File from "../../../../orthers/file/file.jsx";
import React from "react";

const Main =({data})=>{
    const {theme}=useSettings();
    return(
        <Div width="100%" style={{borderBottom:`1px solid ${theme.border.main}`}} justify={'start'} align={'start'} wrap={'wrap'} >
            <Div width="100%" justify={'start'} align={'center'} wrap={'wrap'} column={true}>
                <Div width={'100%'} justify={'start'} column={true} align={'start'} style={{borderBottom:`1px solid ${theme.border.main}`}}>
                    <Div width={'100%'} align={'start'} justify={'start'} >
                        <Div width={'50%'} margin={'0 0 10px 0'} justify={'start'} column={true} align={'start'} overflow={'hidden'}>
                            <Title size={'16px'} margin={0} >Event name:</Title>
                            <Text size={'14px'} weight={600} margin={'5px 0'} style={{    wordWrap: 'break-word',
                                width: '95%'}}>{data?.name??''}</Text>
                        </Div>
                        <Div width={'50%'} margin={'0 0 10px 0'} justify={'start'} column={true} align={'start'} overflow={'hidden'}>
                            <Div width={'100%'} margin={'0 0 10px 0'} justify={'start'} align={'center'} >
                                <Title size={'12px'} margin={0} >Progress:</Title>
                                <Text style={{
                                    padding: '2px 10px',
                                    textAlign: 'center',
                                    background: theme.background.progress[data?.progress?.state??'cancel'],
                                    color: theme.text.title.th4,
                                    borderRadius: '5px',
                                    marginLeft: '10px',
                                }} size={'12px'} weight={600} margin={0}>{data?.progress?.status??''}</Text>
                            </Div>
                            <Div width={'100%'} margin={'0 0 10px 0'} justify={'start'} align={'center'}>
                                <Title size={'12px'} margin={0} >Status:</Title>
                                <Text style={{
                                    padding: '2px 10px',
                                    textAlign: 'center',
                                    background: theme.background.status[data?.status?.status??'cancel'],
                                    color: theme.text.title.th4,
                                    borderRadius: '5px',
                                    marginLeft: '10px',
                                }} size={'12px'} weight={600} margin={0}>{data?.status?.text??''}</Text>
                            </Div>
                        </Div>
                    </Div>
                    <Div width={'100%'} justify={'start'} align={'start'} wrap={'wrap'}>
                        <Div column={true} width={'25%'} margin={'0 0 10px 0'} >
                            <Title size={'12px'} margin={0} >Created at:</Title>
                            <Text  size={'10px'} weight={600} margin={0}>{data?.created_at??''}</Text>
                        </Div>
                        <Div column={true} width={'25%'} margin={'0 0 10px 0'} >
                            <Title size={'12px'} margin={0} >Updated at:</Title>
                            <Text  size={'10px'} weight={600} margin={0}>{data?.updated_at??''}</Text>
                        </Div>
                        <Div column={true} width={'25%'} margin={'0 0 10px 0'} >
                            <Title size={'12px'} margin={0} >Start at:</Title>
                            <Text  size={'10px'} weight={600} margin={0}>{data?.start_at??''}</Text>
                        </Div>
                        <Div column={true} width={'25%'} margin={'0 0 10px 0'} >
                            <Title size={'12px'} margin={0} >End at:</Title>
                            <Text  size={'10px'} weight={600} margin={0}>{data?.end_at??''}</Text>
                        </Div>
                    </Div>
                </Div>
                <Div width={'100%'} justify={'start'} align={'start'}  >
                    <Div width={'50%'} margin={'10px 0'} justify={'start'} column={true} align={'start'} overflow={'hidden'}>
                        <Title size={'14px'} margin={0} >Sort description:</Title>
                        <Text size={'12px'} weight={600} margin={'5px 0'} style={{wordWrap: 'break-word',
                            width: '95%'}}>{data?.sort_description??''}</Text>
                    </Div>
                    <Div width={'50%'} margin={'10px 0'} justify={'start'} column={true} align={'start'} overflow={'hidden'}>
                        <Title size={'14px'} margin={0} >Full description:</Title>
                        <Text size={'12px'} weight={600} margin={'5px 0'} style={{wordWrap: 'break-word',
                            width: '95%'}}>{data?.full_description??''}</Text>
                    </Div>
                </Div>

            </Div>
            <Div  width={'100%'} justify={'space-between'} align={'start'}>
                <Div width={'50%'} justify={'start'} align={'start'} column={true}  >
                    <Title size={'16px'} margin={"5px 0"} >Images</Title>
                    {!data?.imgs && <span style={{
                        width: '95%',
                        height: '150px',
                        background: theme.background.layout,
                        border: `1px solid ${theme.border.main}`,
                        borderRadius: '20px',
                    }}/>}
                    {data?.imgs&&data?.imgs.length==0&& <span style={{
                        width: '95%',
                        height: '150px',
                        background: theme.background.layout,
                        border: `1px solid ${theme.border.main}`,
                        borderRadius: '20px',
                    }}/>}
                    <Swiper style={{width: '100%', padding: '5px 0'}} modules={[Navigation, Pagination, Scrollbar, A11y]}
                            spaceBetween={50}
                            slidesPerView={1}
                            pagination={{clickable: true}}
                            scrollbar={{draggable: true}}>
                        {data?.imgs&&data?.imgs.length>0&&data?.imgs.map((img,key) => (
                            <SwiperSlide key={key}><img src={img} style={{
                                width:'100%',
                                height:'150px',
                                borderRadius:'10px',
                            }}/></SwiperSlide>
                        ))
                        }
                    </Swiper>
                </Div>
                <Div width={'48%'} justify={'start'} align={'start'}  column={true} >
                    <Title size={'16px'} margin={"5px 0"} >Files</Title>
                    {!data?.files && <span style={{
                        width: '95%',
                        height: '50px',
                        background: theme.background.layout,
                        border: `1px solid ${theme.border.main}`,
                        borderRadius: '20px',
                    }}/>}
                    <Swiper style={{width:'100%',padding:'5px 0'}} modules={[Navigation, Pagination, Scrollbar, A11y]}
                            spaceBetween={50}
                            slidesPerView={1}
                            pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}>
                        {
                            data?.files&&data?.files.map((file,key) => (
                                <SwiperSlide key={key}><File url={file}/></SwiperSlide>
                            ))
                        }
                    </Swiper>
                </Div>
            </Div>
        </Div>
    )
}
//
export default React.memo(Main);