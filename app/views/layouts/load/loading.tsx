import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    Easing,
    withRepeat, ReduceMotion,
} from 'react-native-reanimated';
import useSettings from "@/contexts/settings/settings";
import {WINDOW_HEIGHT, WINDOW_WIDTH} from "@gorhom/bottom-sheet";

const styles = StyleSheet.create({
    container: {
        height: WINDOW_HEIGHT,
        width: WINDOW_WIDTH,
        position: 'absolute',
        zIndex: 10,
        top: 0,
        left: 0,
        opacity: 0.7,
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    dot: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginHorizontal: 2,
    },
});
const Loading = () => {
    // @ts-ignore
    const { theme,load } = useSettings();

    // Initialize shared values for each dot
    const dot1:any = useSharedValue(0);
    const dot2:any = useSharedValue(0);
    const dot3:any = useSharedValue(0);

    // Define bounce animation with `repeat`
    const bounce:any = (dot:any) => {
        dot.value = withRepeat(
            withTiming(5, {
                duration: 500,
                easing: Easing.inOut(Easing.ease),
            }),
            -1, // -1 makes it repeat indefinitely
            true, // reverse the animation on each repeat
        );
    };

    // Call bounce animation with delays
    React.useEffect(() => {
        setTimeout(()=>{bounce(dot1);},0)
        setTimeout(()=>{bounce(dot2);},250)
        setTimeout(()=>{bounce(dot3);},500)
    }, []);

    // Animated styles for each dot
    const animatedDot1Style:any = useAnimatedStyle(() => ({
        transform: [{ translateY: dot1.value }],
    }));

    const animatedDot2Style:any = useAnimatedStyle(() => ({
        transform: [{ translateY: dot2.value }],
    }));

    const animatedDot3Style:any = useAnimatedStyle(() => ({
        transform: [{ translateY: dot3.value }],
    }));

    return (
        <>
            {
                load&&
                <View style={[{ backgroundColor: theme.background.main }, styles.container]}>
                    <Text style={styles.text}>Loading</Text>
                    <Animated.Text style={[styles.dot, animatedDot1Style]}>.</Animated.Text>
                    <Animated.Text style={[styles.dot, animatedDot2Style]}>.</Animated.Text>
                    <Animated.Text style={[styles.dot, animatedDot3Style]}>.</Animated.Text>
                </View>
            }
        </>
    );
};


export default Loading;
