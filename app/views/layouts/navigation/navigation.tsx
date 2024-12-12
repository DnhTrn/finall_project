import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";
import { SCREEN_HEIGHT } from "@gorhom/bottom-sheet";
import useSettings from "@/contexts/settings/settings";
import useCusNav from "@/contexts/navigations/navigations";

const Navigation = () => {
    // @ts-ignore
    const { theme } = useSettings();
    const { show, hidden, setHidden, setShow, isChoose, setIsChoose } =useCusNav();
    const isHidden:any = useSharedValue(0);
    const height:any = useSharedValue(SCREEN_HEIGHT * 0.05);
    const opacity:any = useSharedValue(1);
    const lastTapRef:any = useRef({}); // Lưu thời gian cho từng tab

    useEffect(() => {
        if (hidden) {
            isHidden.value = withTiming(60, { duration: 300 });
            height.value = withTiming(0, { duration: 300 });
            opacity.value = withTiming(0, { duration: 300 });
            return;
        }
        isHidden.value = withTiming(0, { duration: 300 });
        height.value = withTiming(SCREEN_HEIGHT * 0.05, { duration: 300 });
        opacity.value = withTiming(1, { duration: 300 });
    }, [show, hidden]);

    const animate:any = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: isHidden.value }],
            opacity: opacity.value,
            height: height.value
        };
    });

    const nav:any = useNavigation();

    const handleTap:any = (page:string, doubleTapAction:any, singleTapAction:any) => {
        const now = Date.now();
        // @ts-ignore
        const lastTap = lastTapRef.current[page] || 0;
        const DOUBLE_TAP_DELAY = 300;

        if (now - lastTap < DOUBLE_TAP_DELAY) {
            doubleTapAction(page); // Xử lý double-tap
        } else {
            singleTapAction(page); // Xử lý single-tap
        }
        // @ts-ignore
        lastTapRef.current[page] = now;
    };

    const click:any = (page:string) => {
        setIsChoose(page);
        // @ts-ignore
        nav.navigate(page);
    };

    const double:any = (page:string) => {
        setIsChoose(page);
        nav.reset({
            index: 0,
            // @ts-ignore
            routes: [{ name: page }]
        });
    };

    const renderTab:any = (page:string, iconName:any, label:string) => (
        <TouchableOpacity
            style={styles.tab}
            onPress={() => handleTap(page, double, click)}
        >
            <Ionicons
                style={{ color: isChoose === page ? theme.icon.main : theme.icon.second }}
                name={isChoose === page ? iconName : `${iconName}-outline`}
                size={26}
            />
            <Text style={[{ color: isChoose === page ? theme.icon.main : theme.icon.second }, styles.title]}>
                {label}
            </Text>
        </TouchableOpacity>
    );

    return (
        <Animated.View style={[{ backgroundColor: theme.background.main, display: show ? 'flex' : 'none' }, styles.container, animate]}>
            {renderTab('home', 'home', 'Home')}
            {renderTab('clubs', 'people', 'Clubs')}
            {renderTab('notification', 'notifications', 'Notification')}
            {renderTab('events', 'albums', 'Events')}
            {renderTab('calendar', 'calendar', 'Calendar')}
            {renderTab('menu', 'menu', 'Menu')}
        </Animated.View>
    );
};

const styles:any = StyleSheet.create({
    container: {
        width: '100%',
        bottom: 0,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute'
    },
    tab: {
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'center',
    },
    title: {
        fontSize: 10,
        marginTop: 5
    }
});

export default React.memo(Navigation);
