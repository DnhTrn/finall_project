const checkProcess=(per:any)=>{
    let status;
    let state;
    if (per === -1) {
        status = 'Cancel';
        state = 'cancel';
    } else if (per === 0) {
        status = 'Register';
        state = 'register';
    } else if (per === 5) {
        status = `Approved (${per}%)`;
        state = 'approved';
    } else if (per > 5 && per < 35) {
        status = `Beginning (${per}%)`;
        state = 'beginner';
    } else if (per >= 35 && per < 95) {
        status = `Stating (${per}%)`;
        state = 'start';
    } else if (per >= 95 && per <= 100) {
        status = `Done (${per}%)`;
        state = 'done';
    } else {
        status = 'Cancel';
        state = 'cancel';
    }

    return {status,state,per};
}
export default checkProcess;