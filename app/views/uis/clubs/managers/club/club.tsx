import {useNavigation} from "@react-navigation/core";
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Feather, MaterialIcons, SimpleLineIcons} from "@expo/vector-icons";
import React, {useState} from "react";
import useSettings from "@/contexts/settings/settings";
import File from "@/app/components/orthers/file/file";
import formatDate from "@/constants/handles/formatDate";
import useData from "@/contexts/datas/data";

const Club=()=>{
    const {data}=useData();
    const [visible,setVisible]=useState(false);
    const navigation = useNavigation();
    // @ts-ignore
    const {theme}=useSettings();
    return (
        <ScrollView style={[{backgroundColor:theme.background.main},style.container]} onScroll={()=>{setVisible(false)}} >
            <Image style={style.image} source={{uri:data?.club?.wallpaper}} />
            <View style={[{borderColor:theme.border.main},style.head]}>
                <View>
                    <Text style={style.head_title}>{data?.club?.name}</Text>
                    <Text style={[{color:theme.text.second}]}>Created at: {formatDate(data?.club?.created_at)}</Text>
                    <Text style={[{color:theme.text.second}]}>Status: {data?.club?.status==1?"Active":'Disable'}</Text>
                </View>
                {
                    !visible&&<TouchableOpacity onPress={()=>setVisible(true)}>
                        <SimpleLineIcons style={[{color: theme.text.main}]} name={'options'} size={18}/>
                    </TouchableOpacity>
                }
                {
                    visible&&<View style={style.edit_zone}>
                        {/*@ts-ignore*/}
                        <TouchableOpacity style={style.eidt} onPress={()=>navigation.navigate('club-management-detail-edit')}>
                            <Feather style={[{color: theme.text.main}]} name={'edit-3'} size={18}/>
                            <Text style={[{color: theme.text.main}, style.edit_text]}>Edit</Text>
                        </TouchableOpacity>
                        {
                            data?.isMaster&&<TouchableOpacity style={style.eidt}>
                                <MaterialIcons style={[{color: theme.text.main}]} name={'delete-sweep'} size={18}/>
                                <Text style={[{color: theme.text.main}, style.edit_text]}>Delete</Text>
                            </TouchableOpacity>
                        }

                    </View>
                }
            </View>
            <View style={style.content}>
                <View style={style.list}>
                    <Text style={style.content_title}>Orientation:</Text>
                    <Text>{data?.club?.orientations??'Null'}</Text>
                </View>
                <View style={style.description}>
                    <Text style={style.content_title}>Sort Description:</Text>
                    <Text style={style.description_content}>{data?.club?.sort_description}</Text>
                </View>
                <View style={style.description}>
                    <Text style={style.content_title}>Full Description:</Text>
                    <Text style={style.description_content}>{data?.club?.full_description}</Text>
                </View>
            </View>
            <View style={style.file}>
                <Text style={style.content_title}>Tern: </Text>
                <File url={data?.club?.tern}/>
            </View>
            <View style={style.file}>
                <Text style={style.content_title}>Regulation: </Text>
                <File url={data?.club?.regular}/>
            </View>
        </ScrollView>
    )
}
//
export default React.memo(Club);
//
const style=StyleSheet.create({
    container:{
        flex:1,
    },
    image: {
        width: '100%', // Đảm bảo hình ảnh chiếm toàn bộ chiều ngang container
        height: 200,
        backgroundColor:'#dddddd',
        borderRadius: 10,
    },
    head:{
        flexDirection:"row",
        paddingHorizontal:15,
        paddingVertical:10,
        borderStyle:"solid",
        borderBottomWidth:3,
        width:'100%',
        justifyContent:'space-between',
        alignItems:'center'
    },
    head_title:{
        fontSize:24,
        fontWeight:'bold',
    },
    edit_zone:{
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'flex-start'
    },
    eidt:{
        flexDirection:'row',
    },
    edit_text:{
        marginLeft:10
    },
    content:{
        paddingHorizontal:15,
        paddingVertical:10,
        justifyContent:'flex-start',
        alignItems:'flex-start',
    },
    description:{
        marginTop:5,
        flexDirection:"column",
        alignItems:"flex-start",
        justifyContent:'flex-start'
    },
    content_title:{
        fontSize:16,
        fontWeight:'bold',
    },
    description_content:{
        fontSize:14,
        marginTop:5
    },
    list:{
        marginTop:5,
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'flex-start'
    },
    file:{
        flexDirection:"column",
        justifyContent:'flex-start',
        alignItems:'flex-start',
        paddingHorizontal:15,
        marginTop:5
    }


})