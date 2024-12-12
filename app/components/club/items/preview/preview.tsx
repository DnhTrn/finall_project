import React from 'react';
import {View, StyleSheet,} from 'react-native';
import Modal from 'react-native-modal';
import Content from './content';
import {WINDOW_HEIGHT} from "@gorhom/bottom-sheet";
import FullClub from "@/app/components/skeletons/fullClub";

const Preview = ({ club,visible, onClose }:any) => {
    // console.log(club);

    return (
        <Modal
            isVisible={visible}
            onBackdropPress={onClose} // Nhấn vào vùng ngoài để đóng modal
            style={style.modal}
            // keo de dong view
            onSwipeComplete={onClose}
            backdropOpacity={0.7} // Độ mờ của nền
            hasBackdrop={true} // Bật nền
            avoidKeyboard={true} // Tránh keyboard che modal
            useNativeDriverForBackdrop={true} // Sử dụng native driver
            animationInTiming={400} // Thời gian animation khi mở
            animationOutTiming={400} // Thời gian animation khi đóng
            backdropTransitionInTiming={200} // Thời gian animation nền khi mở
            backdropTransitionOutTiming={200} // Thời gian animation nền khi đóng
            propagateSwipe={true} // Cho phép swipe để đóng modal
            swipeDirection={['down']} // Hướng swipe để đóng modal
        >
            <View style={style.content}>
                {!club&&<FullClub/>}
                {club&&<Content club={club} onClose={onClose}/>}
            </View>
        </Modal>
    );
};

export default Preview;
//
const style = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    content: {
        backgroundColor: 'white',
        height: WINDOW_HEIGHT * 0.8,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 0,
        paddingVertical:0,
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
    },
});
