export const setValue=(e,set,setActive,setInput,setStatus)=>{
    setStatus('default');
    setInput(false);
    set(e.target.value);
    if(e.target.value===""){
        setActive(false)
    };
};