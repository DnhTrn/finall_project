const main='#4082FF';//blue
const white='#ffffff';
const gray='gray';
const lightGray='#cfcfcf';
const black='black';
const red='#e82f2f';
const green='#44a344';
//
const light={
    background:{
        main:white
    },
    title:{
      main:main,
      second:black,
    },
    text:{
        main:black,
        second:gray,
        th3:white,
        th4:lightGray,
        th5:red
    },
    icon:{
        main:main,
        second:gray,
        th3:lightGray,
        th4:white,
        done:green,
        dismiss:red,
    },
    border:{
        main:lightGray,
        second:main
    },
    skeleton:{
        main:lightGray,
        second:white,
    },
    chart:{
        backgroundColor:main,
    },
    progress:{
        cancel:red,
        register:'#9cd0f1',
        approved:'#8ec3ff',
        beginner:'#54a3ff',
        start:'#1381ff',
        done:'#218c59'
    },
    status:{
        0:red,
        1:'#218c59'
    },
}
//
export default light;