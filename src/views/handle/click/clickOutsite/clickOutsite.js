// Ham dong menu... khi click ra phia ben ngoai
const handleClickOutside = (event,ref,setShow) => {
    if (ref.current && !ref.current.contains(event.target)) {
        setShow(false); // Đóng menu hoặc thực hiện hành động mong muốn
    }
};
// 
const setUp_ClickOutSide=(show,ref,setShow)=>{
    if(show){
        document.addEventListener('mousedown',(e)=> handleClickOutside(e,ref,setShow));
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
}
// 
export default setUp_ClickOutSide;