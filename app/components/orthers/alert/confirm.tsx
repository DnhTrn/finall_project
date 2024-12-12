import {Alert} from "react-native";
// ex:
// messages={
//     status:lang.notification.status,
//     message:'You definitely want to skip this event.',
//     cancel:'Cancel',
//     success:'Left'
// }
const confirmAlert=(text:any, callback:any)=>{
    const {status,message,cancel,success}=text;
    Alert.alert(status,message,[
        {
            text: cancel,
            style:'cancel',
        },
        {
            text: success,
            style:'destructive',
            onPress:callback
        }
    ]);
}
//
export default confirmAlert;