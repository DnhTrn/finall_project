function formatDate(inputDate) {
    // Ví dụ: inputDate là "01/12/2024" (DD/MM/YYYY)
    const [day, month, year] = inputDate.split('/');
    return `${year}-${month}-${day}`; // Trả về "2024-12-01"
}
export default formatDate;