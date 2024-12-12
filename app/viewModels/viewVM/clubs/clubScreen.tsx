import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import React from "react";
import list from "@/app/views/uis/clubs/main/list";
import join from "@/app/views/uis/clubs/main/join";
import request from "@/app/views/uis/clubs/main/request";

const Tab:any=createMaterialTopTabNavigator();
const ClubScreen=()=>{
    return(
        <Tab.Navigator initialRouteName="club-join"
           screenOptions={{lazy: true,horizontal:true,swipeEnabled:true
        }}>
            <Tab.Screen  name={'club-join'} options={{title:'Club joined'}} component={join}/>
            <Tab.Screen name={'club-list'} options={{title:'Club list'}} component={list}/>
            <Tab.Screen name={'club-request'} options={{title:'Create Request'}} component={request}/>
        </Tab.Navigator>
    )
}
//
export default React.memo(ClubScreen);