const formatDate = (timestamp:any) => {
    try{
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp); // Kiểm tra kiểu timestamp
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;

    }catch (e) {
        console.log('null time:'+e);
        return null;
    }
};
//
export default formatDate;