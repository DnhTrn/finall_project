// 
const white="#ffffff";
const black="#0a0a0a";
const blue="#706bff";
const blueWhite="#9ec2e6";
const gray="#212121";
const grayWhite="#ededed26";
const green="#b9ffc6";
const red="#ff8585";
// blur
const start='#0a0a0a';
const mid='#000000de';
const end='#29292999'
//shadow
const blur='#2e2e2e9c';
// 

export const dark={
    background:{
        main:gray,
        second:blue,
        th3:blueWhite,
        layout:black,
        skeleton:[grayWhite,white],
        button:{
            main:blue,
            second:blueWhite,
            th3:grayWhite,
            th4:gray
        },
        hover:{
            main:gray,
            second:gray,
            th3:blue
        },
        systemNotify:{
            confirm:green,
        }
    },
    text:{
        title:{
            main:white,
            second:black,
            th3:grayWhite,
            th4:white,
        },
        content:{
            main:white,
            second:white,
            input:white,
            th3:grayWhite,
            th4:blue
        },
        hover:{
            main:blue,
            second:gray,
            th3:red,
            th4:blue
        }
    },
    border:{
        main:grayWhite,
        status:{
            'default':gray,
            'focus':blue,
            'success':green,
            'error':red
        }
    },
    shadow:{
        main:`0px 0px 20px 1px ${black}`,
        second:`0px 0px 100vw 100vw ${blur}`,
        layout:{
            start:start,
            mid:mid,
            end:end
        }
    }
    
}