// 
const white="#ffffff";
const black="#0a0a0a";
const blue="#706bff";
const blueWhite="#9ec2e6";
const gray="#c0c0cb";
const grayWhite="#ededed";
const green="#b9ffc6";
const red="#ff8585";
// blur
const start='#ffffff';
const mid='#ffffff57';
const end='#ffffff00'
//shadow
const bler='#2e2e2e9c';
// 

export const light={
    background:{
        // mau chinh hien thi trong ung dung
        main:white,
        // mau layouts
        layout:grayWhite,
        // mau phu
        second:blue,
        // mau khung xuong 
        skeleton:[grayWhite,gray],
        // 
        button:{
            main:blue,
            second:blueWhite,
            th3:white,
            th4:gray
        },
        hover:{
            main:grayWhite,
            second:blueWhite,
            th3:blue
        }
    },
    text:{
        title:{
            // mau chinh cua title
            main:blue,
            // mau phu
            second:black,
            th3:blueWhite
        },
        content:{
            // mau noi dung chinh
            main:black,
            // 
            second:white,
            input:black,
            th3:gray,
            th4:blue
        },
        hover:{
            main:black,
            second:gray,
            th3:red,
            th4:blue
        }
    },
    border:{
        main:gray,
        status:{
            'default':gray,
            'focus':blue,
            'success':green,
            'error':red
        }
    },
    shadow:{
        main:`0px 10px 125px 6px ${gray}`,
        second:`0px 0px 100vw 100vw ${bler}`,
        layout:{
            start:start,
            mid:mid,
            end:end
        }
    }
    
}