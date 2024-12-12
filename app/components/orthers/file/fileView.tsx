import WebView from "react-native-webview";
import React from "react";
import {useRoute} from "@react-navigation/core";

const FileView=()=>{
    const router:any = useRoute();
    const {url}=router.params;
    console.log(url);
    return (
        <WebView source={{uri:url}} style={{flex: 1}}/>
    )
}
//
export default React.memo(FileView);