import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';  // Import thư viện image-picker của Expo
import Swiper from "react-native-swiper";
import useSettings from "@/contexts/settings/settings";

const ImagesInput = ({ images, set }:any) => {
    const [permissionGranted, setPermissionGranted] = useState(false);
    const {theme}=useSettings();
    const requestPermissions = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status === 'granted') {
            setPermissionGranted(true);
        } else {
            alert("Permission to access photos is required!");
        }
    };

    const pickImage = async () => {
        // Kiểm tra quyền truy cập
        if (!permissionGranted) {
            await requestPermissions();
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Chỉ chọn ảnh
            allowsMultipleSelection: true, // Cho phép chọn nhiều ảnh
            selectionLimit: 0, // Không giới hạn số ảnh
            quality: 1, // Chất lượng ảnh
        });
        // @ts-ignore
        if (!result.cancelled) {
            // Cập nhật state với danh sách ảnh đã chọn
            const imgs=result.assets?.map(item=>item.uri);
            console.log(imgs);
            // @ts-ignore
            set(imgs);
        }
    };

    return (
        <View style={styles.container}>
            {images.length == 0 && (
                <TouchableOpacity onPress={pickImage}>
                    <View style={styles.skeleton}>
                        <Text style={styles.skeletonText}>Choose event images</Text>
                    </View>
                </TouchableOpacity>
            )}

            {images.length > 0 && (
                <Swiper
                    style={styles.slide}
                    autoplay={true}
                    autoplayTimeout={5}
                    loop={true}
                    showsPagination={true}
                    showsButtons={false}
                >
                    {images.map((item:any, i:any) => (
                        <Image key={i} source={{ uri: item}} style={styles.image} />
                    ))}
                </Swiper>
            )}

            {images.length > 0 && (
                <TouchableOpacity
                    style={[styles.change, { backgroundColor: theme.icon.main }]} // Màu nền thay đổi theo theme
                    onPress={pickImage}
                >
                    <Text style={styles.skeletonText}>Change images</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 10,
    },
    skeleton: {
        width: "100%",
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#dddddd",
    },
    skeletonText: {
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
        color: "white",
    },
    slide: {
        height: 205,
    },
    change: {
        width: "100%",
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 10,
    },
});

export default ImagesInput;
