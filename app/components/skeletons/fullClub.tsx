import {StyleSheet, View} from "react-native";
import React from "react";

const FullClub=()=>{
    return (
        <View style={style.container}>
            <View style={style.header}>
                <View style={style.image}/>
                <View style={style.title}>
                    <View style={style.title_text} >
                        <View style={style.title_text_value}/>
                        <View style={style.title_text_value}/>
                    </View>
                    <View style={style.sort_btn}/>
                </View>
            </View>
            <View style={style.about}>
                <View style={style.about_content}>
                    <View style={style.title_text_value}/>
                </View>
            </View>
        </View>
    )
}
//
export default React.memo(FullClub);
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
        backgroundColor:'#dddddd',
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
    title_text_value: {
        height:18,
        marginBottom:5,
        borderRadius:10,
        backgroundColor:'#dddddd',
        width:'70%'
    },
    sort_btn:{
        height:36,
        color:'white',
        width:'20%',
        borderRadius:10,
        backgroundColor:'#dddddd'
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
    }
});