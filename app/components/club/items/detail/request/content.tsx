// @ts-nocheck
import {Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {Feather, MaterialIcons, SimpleLineIcons} from "@expo/vector-icons";
import ClubRegisterVM from "@/app/viewModels/clubRegisterVM/clubRegisterVM";
import {useNavigation} from "@react-navigation/core";
import useSettings from "@/contexts/settings/settings";
import formatDate from "@/constants/handles/formatDate";
import File from "@/app/components/orthers/file/file";
import confirmAlert from "@/app/components/orthers/alert/confirm";

const Content=({club}:any)=>{
    // @ts-ignore
    const {theme,setLoad,lang}=useSettings();
    const [visible,setVisible]=useState(false);
    const {remove}=ClubRegisterVM();
    const navigation=useNavigation();
    let status=lang.status.register[club.status];
    const removeHandle=()=>{
        const message={status:lang.notification.status,
            message:lang.notification.message.remove.register,cancel:lang.notification.btn.cancel,
            success:lang.notification.btn.ok};
        const handle=async ()=>{
            try{
                setLoad(true);
                const check=await remove(club.id);
                setLoad(false);
                // @ts-ignore
                if(check)navigation.replace('clubs',{screen:'club-main',params: {
                        screen: 'create-request'},});
                if(!check){
                    Alert.alert('Notificaion!','False to remove this register');
                }
            }catch (e){
                console.log("ui: "+e);
                Alert.alert('Notificaion','False to remove this register');
            }
        }
        // @ts-ignore
        confirmAlert(message,handle);
    }
    return (
        <ScrollView style={[{backgroundColor:theme.background.main},style.container]} onScroll={()=>{setVisible(false)}} >
            <Image style={style.image} source={{uri:club.wallpaper}} />
            <View style={[{borderColor:theme.border.main},style.head]}>
                <View>
                    <Text style={style.head_title}>{club.name}</Text>
                    <Text style={[{color:theme.text.second}]}>{formatDate(club.created_at)}</Text>
                    <Text style={[{color:theme.text.second}]}>{lang?.status?.title}: {status??'Null'}</Text>
                </View>
                {club.status==0&&
                    (!visible&&<TouchableOpacity onPress={()=>setVisible(true)}>
                            <SimpleLineIcons style={[{color: theme.text.main}]} name={'options'} size={18}/>
                        </TouchableOpacity>
                        ||visible&&<View style={style.edit_zone}>
                            <TouchableOpacity style={style.eidt} onPress={()=>navigation.navigate('club-request-edit',{club:club})}>
                                <Feather style={[{color: theme.text.main}]} name={'edit-3'} size={18}/>
                                <Text style={[{color: theme.text.main}, style.edit_text]}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={removeHandle} style={style.eidt}>
                                <MaterialIcons style={[{color: theme.text.main}]} name={'delete-sweep'} size={18}/>
                                <Text style={[{color: theme.text.main}, style.edit_text]}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View>
            <View style={style.content}>
                <View style={style.list}>
                    <Text style={style.content_title}>{lang.register_detail.orien}</Text>
                    <Text>{club.orientation}</Text>
                </View>
                <View style={style.description}>
                    <Text style={style.content_title}>{lang.register_detail.sort}</Text>
                    <Text style={style.description_content}>{club.sort}</Text>
                </View>
                <View style={style.description}>
                    <Text style={style.content_title}>{lang.register_detail.full}</Text>
                    <Text style={style.description_content}>{club.full}</Text>
                </View>
                <View style={style.list}>
                    <Text style={style.content_title}>{lang.register_detail.lec}</Text>
                    {!club.lecturerOption&&<Text>Assign a lecturer</Text>}
                    {club.lecturerOption&&<Text>{club.lecturer}</Text>}
                </View>
                <View style={style.list}>
                    <Text style={style.content_title}>{lang.register_detail.managers}</Text>
                    {!club.memberOption&&<Text>Not yeat</Text>}
                    {club.memberOption&&club.members.map((item:any,key:number)=><Text key={key}>{item}</Text>)}
                </View>
            </View>
            <View style={style.file}>
                <Text style={style.content_title}>{lang.register_detail.tern}</Text>
                <File url={club.tern_file}/>
            </View>
            <View style={style.file}>
                <Text style={style.content_title}>{lang.register_detail.orien}</Text>
                <File url={club.regulation_file}/>
            </View>
        </ScrollView>
    )
}
//
export default React.memo(Content);
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
