import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {StyleSheet, Text} from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { View } from "react-native";
import {useNavigation} from "@react-navigation/core";
import formatDate from "@/constants/handles/formatDate";
import useSettings from "@/contexts/settings/settings";

const Content=({onClose,club}:any)=>{
    const navigation:any =useNavigation();
    // @ts-ignore
    const {theme}=useSettings();
    const getPolicy=()=>{
        // @ts-ignore
        navigation.navigate('club-policy',{club:club});
    }
    return (
        <View style={style.container}>
            <View style={style.header}>
                <TouchableOpacity onPress={()=> {
                    onClose();
                    {/*@ts-ignore*/}
                    navigation.navigate('club-detail', {club_id: club.id})
                }} >
                    <Image style={style.image} source={{uri:club.wallpaper}} resizeMode="cover" />
                    <View style={style.title}>
                        <View style={style.title_text} >
                            <Text style={style.title_text_name}>{club.name}</Text>
                            <Text>Membes: {club.members}</Text>
                        </View>
                        {
                            club?.check&&<TouchableOpacity onPress={()=>{
                                onClose();
                                {/*@ts-ignore*/}
                                navigation.navigate('club-detail', {club_id: club.id})
                            }} style={[{backgroundColor:theme.icon.th3},style.sort_btn]}>
                                <Text style={style.btn_text}>View</Text>
                            </TouchableOpacity>
                        }
                        {!club?.check&&<TouchableOpacity onPress={()=>{
                            getPolicy();
                            onClose();
                        }} style={[{backgroundColor:theme.icon.main},style.sort_btn]}>
                            <Text style={style.btn_text}>Join</Text>
                        </TouchableOpacity>}
                    </View>
                </TouchableOpacity>
            </View>
            <View style={style.about}>
                <View style={style.about_content}>
                    <Text style={style.about_title}>About</Text>
                    <Text style={style.about_des} >{club.full_description}</Text>
                    <Text style={style.about_title} >Club action</Text>
                    <View style={style.about_line}>
                        <Ionicons name="create-outline" size={18} />
                        <Text style={style.about_line_text}>{club.events} events a crated</Text>
                    </View>
                    <View style={style.about_line}>
                        <Ionicons name="people-outline" size={18} />
                        <Text style={style.about_line_text}>{club.members} members in this club</Text>
                    </View>
                    <View style={style.about_line}>
                        <Ionicons name="calendar-outline" size={18} />
                        <Text style={style.about_line_text}>Created at {formatDate(club.created_at)}</Text>
                    </View>
                </View>
                {
                    club?.check&&<TouchableOpacity onPress={()=>{
                        onClose();
                        {/*@ts-ignore*/}
                        navigation.navigate('club-detail', {club_id: club.id})
                    }} style={[{backgroundColor:theme.icon.th3},style.about_btn]}>
                        <Text style={style.btn_text}>View</Text>
                    </TouchableOpacity>
                }
                {!club?.check&&<TouchableOpacity onPress={() => {
                    getPolicy();
                    onClose();
                }} style={[{backgroundColor:theme.icon.main},style.about_btn]}>
                    <Text style={style.btn_text}>Join club</Text>
                </TouchableOpacity>}
            </View>
        </View>
    )
}
export default React.memo(Content);
//
const style = StyleSheet.create({
    container: {
        flex: 1,
        width:'100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    header: {
        width:'100%',
        flexDirection: 'column',
        marginBottom: 10, // Thêm khoảng cách giữa header và nội dung bên dưới
    },
    image: {
        width: '100%', // Đảm bảo hình ảnh chiếm toàn bộ chiều ngang container
        height: 200,
        borderRadius: 10,
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5, // Thêm khoảng cách giữa hình ảnh và tiêu đề
        paddingTop:5,
        paddingHorizontal:10,
        borderBottomColor:'gray',
        borderBottomWidth:1,
        paddingBottom:10,
        borderStyle:'solid'
    },
    title_text: {
        width: '70%',
        flexDirection: 'column',
    },
    title_text_name:{
        fontSize:24,
        fontWeight:'bold',
    }
    ,
    sort_btn:{
        paddingVertical:10,
        paddingHorizontal:5,
        width:'20%',
        borderRadius:10,
    },
    btn_text:{
        textAlign:'center',
        color:'white'
    },
    about:{
        flex:1,
        width:'100%',
        flexDirection:'column',
        paddingHorizontal:10,
        justifyContent:'space-between'
    },
    about_content:{
        flexDirection:'column',
        width:'100%',
    },
    about_title:{
        fontSize:18,
        fontWeight:'700'
    },
    about_des:{
        marginTop:5,
        marginBottom:10
    },
    about_line:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginVertical:5
    },
    about_line_text:{
        fontSize:16,
        marginLeft:10
    },
    about_btn:{
        width:'100%',
        paddingVertical:15,
        borderRadius:10,
        marginBottom:40
    }
});