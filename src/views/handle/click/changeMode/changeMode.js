const changeMode=(value,notification,set,addNotification)=>{
    set(value);
    addNotification('confirm',notification.title,notification.content);
};
// 
export default changeMode;