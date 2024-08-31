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
        main:white,
        second:blue,
        th3:blueWhite,
        layout:grayWhite,
        skeleton:[grayWhite,gray],
        button:{
            main:blue,
            second:blueWhite,
            th3:white,
            th4:gray
        },
        blur:{
            start:start,
            mid:mid,
            end:end
        },
        hover:{
            main:blueWhite,
            second:grayWhite
        }
    },
    text:{
        title:{
            main:blue,
            second:black,
            th3:blueWhite
        },
        content:{
            main:black,
            second:blue,
            th3:gray,
            th4:white
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
        login:'none',
        main:`0px 10px 125px 6px ${gray}`,
        second:`0px 0px 100vw 100vw ${bler}`
    }
    
}