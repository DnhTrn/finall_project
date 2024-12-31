const checkData = (data: { [key: string]: any }): boolean => {
    let check = true;
    let current='';
    for (const [key, item] of Object.entries(data)) {
        current = key;
        if (key === 'lecturer') {
            // Kiểm tra điều kiện của `lecturer`
            if (data.lecturerOption && (item === '' || item === null)) {
                check = false;
                break;
            }
        } else if (key === 'members') {
            // Kiểm tra điều kiện của `members`
            if (data.memberOption && Array.isArray(item) && item.length === 0) {
                check = false;
                break;
            }
        }else if (key === 'pre') {
            // Kiểm tra điều kiện của `members`
            if (data.type&& (item ===''||item === null)) {
                check = false;
                break;
            }
        } else if (key === 'imgs') {
            // Kiểm tra điều kiện của `members`
            console.log(item);
            if (item.length === 0) {
                check = false;
                break;
            }
        }else if (key === 'files') {
            // Kiểm tra điều kiện của `members`
            if (item.length === 0) {
                check = false;
                break;
            }
        }else if (key === 'img') {
            // Kiểm tra điều kiện của `members`
            console.log(item);
            if (item.length === 0) {
                if(data.changeImgs){
                    check = false;
                    break;
                }
            }
        }else if (key === 'file') {
            // Kiểm tra điều kiện của `members`
            if (item.length === 0) {
                if(data.changeFiles){
                    check = false;
                    break;
                }
            }
        }else if (item === '' || item === null) {
            // Kiểm tra nếu giá trị là rỗng hoặc null
            check = false;
            break;
        }
    }
    console.log(current);
    return check;
};
//
export default checkData;