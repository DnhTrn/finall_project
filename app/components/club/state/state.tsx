import React, { useEffect } from "react";
import {StyleSheet, View} from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const State=({state}:{state:any})=>{
    const width=useSharedValue(state);
    const b1=useSharedValue('white');
    const b2=useSharedValue('white');
    const b3=useSharedValue('white');

    // Hàm để animate width
    useEffect(()=>{
        if (state === 0) {
            width.value = withTiming(15, { duration: 700 }); // Width 30%
            b1.value=withTiming('#97BBFF',{ duration: 1000 });
            b2.value=withTiming('white',{ duration: 1000 });
            b3.value=withTiming('white',{ duration: 1000 });
        } else if (state === 1) {
            width.value = withTiming(50, { duration: 700 }); // Width 60%
            b1.value=withTiming('#97BBFF',{ duration: 1000 });
            b2.value=withTiming('#97BBFF',{ duration: 1000 });
            b3.value=withTiming('white',{ duration: 1000 });
        } else if (state === 2) {
            width.value = withTiming(100, { duration: 700 }); // Width 100%
            b1.value=withTiming('#97BBFF',{ duration: 1000 });
            b2.value=withTiming('#97BBFF',{ duration: 1000 });
            b3.value=withTiming('#97BBFF',{ duration: 1000 });
        }
    },[state]);
    const line=useAnimatedStyle(():any=>{
        return {
            width:(width.value)+'%'
        }
    })
    const circle=useAnimatedStyle(():any=>{
        return {
            left:(width.value-3)+'%'
        }
    })
    const background1=useAnimatedStyle(()=>{
        return {
            backgroundColor:b1.value
        }
    })
    const background2=useAnimatedStyle(()=>{
        return {
            backgroundColor:b2.value
        }
    })
    const background3=useAnimatedStyle(()=>{
        return {
            backgroundColor:b3.value
        }
    })
    const color1=useAnimatedStyle(()=>{
        return {
            color:b1.value
        }
    })
    const color2=useAnimatedStyle(()=>{
        return {
            color:b2.value
        }
    })
    const color3=useAnimatedStyle(()=>{
        return {
            color:b3.value
        }
    })
    return (
        <View style={style.container}>
            <View style={style.state} >
                <Animated.Text style={[style.state_title,color1]}>Base info</Animated.Text>
                <Animated.Text style={[style.state_title,color2]}>Members</Animated.Text>
                <Animated.Text style={[style.state_title,color3]}>Terms and Conditions</Animated.Text>
            </View>
            <View style={style.state_view}>
                <View style={style.border_line}>
                    <Animated.View style={[style.state_line,line]}/>
                </View>
                <Animated.View  style={[style.circle_1,background1]}/>
                <Animated.View  style={[style.circle_2,background2]}/>
                <Animated.View  style={[style.circle_3,background3]}/>
                <Animated.View style={[style.state_circle,circle]}/>
            </View>
        </View>
    );
}
//
export default React.memo(State);
//
const style=StyleSheet.create({
    container:{
        width:'100%',
        height:'10%',
        paddingBottom:15,
        paddingHorizontal:15,
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    state:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    state_title:{
        width:'33%',
        fontSize:14,
        textAlign:'center'
    },
    state_view:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginTop:5,
        width:'100%',
    },
    border_line:{
        marginTop:10,
        width:'100%',
        height:5,
        borderColor:'#4082FF',
        borderWidth:1,
        borderStyle:'solid',
        borderRadius:10,
        overflow:'hidden'
    },
    state_line:{
        height:10,
        backgroundColor:'#97BBFF',
    },
    state_circle:{
        position:'absolute',
        top:5,
        height:15,
        width:15,
        backgroundColor:'#97BBFF',
        borderColor:'#4082FF',
        borderWidth:1,
        borderStyle:'solid',
        borderRadius:10,
    },
    circle_1:{
        position:'absolute',
        top:5,
        left:'12%',
        height:15,
        width:15,
        backgroundColor:'#97BBFF',
        borderColor:'#4082FF',
        borderWidth:1,
        borderStyle:'solid',
        borderRadius:10,
    },
    circle_2:{
        position:'absolute',
        top:5,
        left:'47%',
        height:15,
        width:15,
        backgroundColor:'#97BBFF',
        borderColor:'#4082FF',
        borderWidth:1,
        borderStyle:'solid',
        borderRadius:10,
    }
    ,
    circle_3:{
        position:'absolute',
        top:5,
        left:'97%',
        height:15,
        width:15,
        backgroundColor:'white',
        borderColor:'#4082FF',
        borderWidth:1,
        borderStyle:'solid',
        borderRadius:10,
    }
})