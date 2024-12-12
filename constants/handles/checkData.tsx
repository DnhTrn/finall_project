const checkData = (data: { [key: string]: any }): boolean => {
    let check = true;

    for (const [key, item] of Object.entries(data)) {
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
        } else if (item === '' || item === null) {
            // Kiểm tra nếu giá trị là rỗng hoặc null
            check = false;
            break;
        }
    }

    return check;
};
//
export default checkData;