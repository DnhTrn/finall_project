import {Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import useAuth from "@/app/viewModels/authVM/authVM";
import Input from "@/app/components/orthers/input/input";
import {useNavigation} from "@react-navigation/core";
import useSettings from "@/contexts/settings/settings";
import showAlert from "@/app/components/orthers/alert/alert";
//
const styles:any=StyleSheet.create({
    container:{
        flexDirection:'column',
        backgroundColor:'white',
        width:"100%",
        height:"100%",
        paddingHorizontal:'10%',
        justifyContent:'center',
        alignItems:'center',
    },
    title:{
        fontSize:30,
        fontWeight:'bold',
        marginBottom:10
    },
    description:{
        fontSize:14,
        marginBottom:30
    },
    button:{
        width:'100%',
        color:'white',
        paddingHorizontal:20,
        paddingVertical:15,
        borderRadius:10,
    },
    btn_text:{
        textAlign:'center',
        fontSize:18,
        fontWeight:'bold',
    },
    show_password:{
        flexDirection:'row',
        width:'100%',
        alignItems:'center',
        justifyContent:'flex-start',
        marginBottom:10
    },
    show:{
        width:15,
        height:15,
        borderWidth:1,
        marginRight:10,
        borderStyle:'solid',
        borderColor:'lightgray',
        borderRadius:10,
        backgroundColor:'#4082FF'
    },
    hidden:{
        width:15,
        height:15,
        borderWidth:1,
        marginRight:10,
        borderStyle:'solid',
        borderColor:'lightgray',
        borderRadius:10,
        backgroundColor:'white',
    }
})
const Login=()=>{
    // @ts-ignore
    const {login}=useAuth();
    const {lang,theme,setLoad}=useSettings();
    const [hidden,setHidden]=useState(true);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    //
    const navigation:any=useNavigation();
    //
    const handleLogin:any= async ()=>{
        try {
            setLoad(true);
            const {status,first}= await login(email,password);
            setLoad(false);
            console.log(first);
            if(!status){
                console.log('false to login');
                const message={status:lang.notification.status,message:lang.notification.message.login.false};
                showAlert(message);
                return;
            }

            if(!first){
                navigation.replace('main');
                return;
            }
            console.log('checking change password point');
            navigation.replace('change-password');
        }catch (e) {

        }
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} style={styles.container}>
            <Text style={[{color:theme.title.main},styles.title]}>{lang.login.form.title}</Text>
            <Text style={[{color:theme.text.second},styles.description]}>{lang.login.form.des}</Text>
            <Input set={setEmail} value={email} type='email' place={lang.login.form.email.placeholder}
                   title={lang.login.form.email.title}/>
            <Input hidden={hidden} value={password} set={setPassword} type='password'
                   place={lang.login.form.password.placeholder} title={lang.login.form.password.title}/>
            <TouchableOpacity style={styles.show_password} onPress={()=>setHidden(!hidden)}>
                <View style={hidden?styles.hidden:styles.show}/>
                {/*@ts-ignore*/}
                <Text>{lang.login.form.option[hidden]}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogin} style={[{backgroundColor:theme.icon.main},styles.button]}>
                <Text style={[{color: theme.text.th3},styles.btn_text]}>Login</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}
//

//
export default React.memo(Login);