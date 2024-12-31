import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {View} from "react-native";
import React from "react";
import {NavigationService} from "@/contexts/navigations/navigations";
import Home from "@/app/views/uis/home/home";
import Navigation from "@/app/views/layouts/navigation/navigation";
import events from "@/app/views/uis/event/events";
import calendar from "@/app/views/uis/calendar";
import notifications from "@/app/views/uis/notifications";
import Header from "@/app/views/layouts/head/head";
import useSettings from "@/contexts/settings/settings";
import clubIndex from "@/app/viewModels/viewVM/clubs/clubIndex";
import fileView from "@/app/components/orthers/file/fileView";
import userInfor from "@/app/components/club/items/users/userInfor";
import EventDetail from "@/app/views/uis/event/detail/detail";
import CalendarEvent from "@/app/views/uis/calendar";
import CreateEvent from "@/app/views/uis/clubs/main/createEvent";
import Menu from "@/app/views/uis/menu";
import changePassword from "@/app/views/uis/changePassword";
const MainStack:any=createNativeStackNavigator();
const Main=()=>{
    const {lang}=useSettings();
    return (
        <View style={{flex: 1}}>
            <NavigationService >
                <MainStack.Navigator ScreenOptions={{lazy: true,headerShown:false}}>
                    <MainStack.Screen name={'home'} component={Home} options={{header:()=><Header text={lang.head.home} />}}/>
                    <MainStack.Screen name={'clubs'} component={clubIndex} options={{headerShown:false}}/>
                    <MainStack.Screen name={'events'} component={events} options={{header:()=><Header text={lang.head.events} />}}/>
                    <MainStack.Screen name={'calendar'} component={CalendarEvent} options={{header:()=><Header text={lang.head.calendar} />}}/>
                    <MainStack.Screen name={'notification'} component={notifications} options={{header:()=><Header text={lang.head.notification} />}}/>
                    <MainStack.Screen name={'menu'} component={Menu} options={{header:()=><Header text={lang.head.menu} />}}/>
                    <MainStack.Screen name={'search'} component={Home} options={{header:()=><Header back={true} title={''} avata={false} search={false}/>}}/>
                    <MainStack.Screen name={'profile'} component={Home} options={{header:()=><Header back={true} title={''} avata={false} search={false}/>}}/>
                    <MainStack.Screen name={'file-detail'} component={fileView} options={{header:()=><Header back={true} title={''} avata={false} search={false}/>}}/>
                    <MainStack.Screen name={'event-sub-detail'} component={EventDetail} options={{header:()=><Header back={true} title={''} avata={false} search={false}/>}}/>
                    <MainStack.Screen name={'event-detail'} component={EventDetail} options={{header:()=><Header back={true} title={''} avata={false} search={false}/>}}/>
                    <MainStack.Screen name={'user-infor'} component={userInfor} options={{header:()=><Header back={true} title={''} avata={false} search={false}/>}}/>
                    <MainStack.Screen name={'event-create'} component={CreateEvent} options={{gestureEnabled: false,header:()=><Header back={true} title={''} avata={false} search={false}/>}}/>
                </MainStack.Navigator>
                <Navigation/>
            </NavigationService>
        </View>
    )
}
//
export default React.memo(Main);