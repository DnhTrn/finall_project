import {Alert} from "react-native";

const showAlert=({status,message}:any)=>{
    Alert.alert(status,message);
}
//
export default showAlert;