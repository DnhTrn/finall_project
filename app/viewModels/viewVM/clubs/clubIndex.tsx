import {createNativeStackNavigator} from "@react-navigation/native-stack";
import clubs from "@/app/views/uis/clubs/clubs";
import React from "react";
import Header from "@/app/views/layouts/head/head";
import requestDetail from "@/app/views/uis/clubs/main/requestDetail";
import requestEdit from "@/app/views/uis/clubs/edits/requestEdit";
import create from "@/app/views/uis/clubs/main/create";
import events from "@/app/components/club/items/detail/events";
import files from "@/app/components/club/items/detail/files";
import images from "@/app/components/club/items/detail/images";
import info from "@/app/components/club/items/detail/info/info";
import members from "@/app/components/club/items/detail/members";
import detail from "@/app/views/uis/clubs/main/detail";
import management from "@/app/views/uis/clubs/managers/management";
import managers from "@/app/views/uis/clubs/managers/member/managers";
import requests from "@/app/views/uis/clubs/managers/member/requests";
import listMembers from "@/app/views/uis/clubs/managers/member/listMembers";
import clubEdit from "@/app/views/uis/clubs/managers/club/clubEdit";
import policy from "@/app/views/uis/clubs/policy";
import UserRequest from "@/app/views/uis/clubs/managers/member/requests";

const ClubNavigation=createNativeStackNavigator();
const ClubIndex=()=>{
    return (
            <ClubNavigation.Navigator initialRouteName="club-index">
                <ClubNavigation.Screen name={'club-index'} options={{header:()=><Header text={'Clubs'} />}} component={clubs}/>
                <ClubNavigation.Screen name={'club-detail'} options={{header:()=><Header text={'Clubs'} />}} component={detail}/>
                <ClubNavigation.Screen name={'club-events'} options={{header:()=><Header text={'Clubs'} />}} component={events}/>
                <ClubNavigation.Screen name={'club-files'} options={{header:()=><Header text={'Clubs'} />}} component={files}/>
                <ClubNavigation.Screen name={'club-images'} options={{header:()=><Header text={'Clubs'} />}} component={images}/>
                <ClubNavigation.Screen name={'club-info'} options={{header:()=><Header text={'Clubs'} />}} component={info}/>
                <ClubNavigation.Screen name={'club-members'} options={{header:()=><Header text={'Clubs'} />}} component={members}/>
                <ClubNavigation.Screen name={'club-request-detail'} options={{header:()=><Header back={true} title={''} avata={false} search={false}/>}} component={requestDetail}/>
                <ClubNavigation.Screen name={'club-request-edit'} options={{header:()=><Header back={true} title={''} avata={false} search={false}/>}} component={requestEdit}/>
                <ClubNavigation.Screen name={'club-create'} options={{header:()=><Header back={true} title={''} avata={false} search={false}/>}} component={create}/>
                <ClubNavigation.Screen name={'club-management'} options={{header:()=><Header back={true} title={''} avata={false} search={false}/>}} component={management}/>
                <ClubNavigation.Screen name={'club-management-managers'} options={{header:()=><Header back={true} title={''} avata={false} search={false}/>}} component={managers}/>
                <ClubNavigation.Screen name={'club-management-request'} options={{header:()=><Header back={true} title={''} avata={false} search={false}/>}} component={UserRequest}/>
                <ClubNavigation.Screen name={'club-management-member-list'} options={{header:()=><Header back={true} title={''} avata={false} search={false}/>}} component={listMembers}/>
                <ClubNavigation.Screen name={'club-management-detail-edit'} options={{header:()=><Header back={true} title={''} avata={false} search={false}/>}} component={clubEdit}/>
                <ClubNavigation.Screen name={'club-policy'} options={{header:()=><Header back={true} title={''} avata={false} search={false}/>}} component={policy}/>

            </ClubNavigation.Navigator>
        )
}
//
export default React.memo(ClubIndex);
