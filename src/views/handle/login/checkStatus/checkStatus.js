// 
export const checkStatus=(value,setEmail,setPassword)=>{
    if(value=='null'||value===undefined){
        setEmail('error');
        setPassword('error');
        return;
    } 
    if(value==='incorrect-email-format'||value==='incorrect-email'){
        setEmail('error');
        setPassword('default');
        return;
     }
     if(value==='incorrect-password-format'||value==='incorrect-password'){
        setEmail('success');
        setPassword('error');
        return;
     }
     setEmail('success');
     setPassword('success');
     return;
}