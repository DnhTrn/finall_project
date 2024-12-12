// @ts-nocheck
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import {useNavigation} from "@react-navigation/core";

const File = ({ url }) => {
    const navigation     = useNavigation();
    const decodeUrl = decodeURIComponent(url);  // Decode URL to get readable filename

    // Extract filename and extension
    const getFileInfo = () => {
        const filePath = decodeUrl.split("/").pop();
        const fileName = filePath?.split("?")[0]; // Remove any query parameters
        const fileExtension = fileName?.split('.').pop()?.toLowerCase();

        return {
            name: fileName || "Unknown",
            extension: fileExtension || "unknown"
        };
    };

    const { name, extension } = getFileInfo();

    // Choose icon based on file extension
    const getFileIcon = () => {
        switch (extension) {
            case "pdf":
                return require('../../../../assets/images/icons/pdf.png');
            case "doc":
            case "docx":
            case "gdoc":
                return require('../../../../assets/images/icons/word.png');
            default:
                return require('../../../../assets/images/icons/default.png');
        }
    };

    return (
        <View style={style.container}>
            <Pressable style={style.btn} onPress={()=>navigation.navigate('file-detail',{url:url})}>
                <View style={style.file}>
                    <Image style={style.icon} source={getFileIcon()} resizeMode='stretch' />
                    <View style={style.file_info}>
                        <Text style={style.file_text}>Filename: {name}</Text>
                        <Text style={style.file_text}>File type: {extension}</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 10
    },
    btn: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    title: {
        color: 'black',
        fontSize: 14,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    file: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icon: {
        width: 40,
        height: 50,
    },
    file_info: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: 10
    },
    file_text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'gray',
    }
});

export default React.memo(File);
