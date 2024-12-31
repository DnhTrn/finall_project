import {StyleSheet, Text, View} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import {Picker} from "@react-native-picker/picker";
import useSettings from "@/contexts/settings/settings";
import EventVM from "@/app/viewModels/eventVM/eventVM";

const SelectEvent= ({set,title,des}:any)=>{
    const [selected,setSelected]=useState();
    const [data,setData]=useState(null);
    const {getMainCreate}=EventVM();
    const {theme}=useSettings();
    const handle=(value:any)=>{
        setSelected(value);
        set(value);
    }
    // trigger get data
    useEffect(() => {
        const fetch=async ()=>{
            try{
                const {status,events}=await getMainCreate();
                if(!status){
                    // @ts-ignore
                    setData([]);
                    return;
                }
                setData(events);
                if (events.length>0){
                    set(events[0].id)
                }
                console.log(events);
            }catch (e) {
                console.log("UI: "+e);
                // @ts-ignore
                setData([]);
            }
        }
        fetch();
    }, []);
    // @ts-ignore
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{title}:</Text>
            <View style={styles.wrap}>
                <Picker
                    selectedValue={selected}
                    style={[{backgroundColor:theme.background.main},styles.picker]}
                    itemStyle={styles.item}
                    onValueChange={(itemValue, itemIndex) => handle(itemValue)}
                >
                    {!data&&<Picker.Item label="Loading..." value=''/>}
                    {/*@ts-ignore*/}
                    {data&&data?.length==0&&<Picker.Item label="There are currently no major events open." value=''/>}
                    {/*@ts-ignore*/}
                    {data&&data?.length!=0&&data.map((item,key)=> <Picker.Item label={item?.name} key={key} value={item?.id} />)}
                </Picker>
            </View>
            <Text style={styles.selectedText}>{des}</Text>
        </View>
    );
}
//

//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:'100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        overflow: 'hidden',
        marginBottom:15
    },
    label: {
        fontSize: 14,
        marginBottom: 5,
    },
    wrap:{
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingVertical:25,
        overflow: 'hidden',
    },
    picker: {
        height: 35,
        width: '100%',
        paddingHorizontal:0,
        // alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius:5,

        // overflow: 'hidden',
    },
    item:{
      fontSize:14,
        width:'100%',
        // backgroundColor:'white'
    },
    selectedText: {
        fontSize:12,
        color:'gray',
        marginTop:5
    },
});
export default React.memo(SelectEvent);