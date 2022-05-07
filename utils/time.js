const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}
/**
 * 时间戳转化为年 月 日 时 分 秒
 * ts: 传入时间戳
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致
 */
function tsFormatTime(timestamp, format) {

    const formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    let returnArr = [];

    let date = new Date(timestamp);
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    returnArr.push(year, month, day, hour, minute, second);

    returnArr = returnArr.map(formatNumber);

    for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
}


/**获取当前系统时间 */
function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()

    return [year, month, day].map(formatNumber2).join('-') + ' ' + [hour, minute, second].map(formatNumber2).join(':')
}

function formatNumber2(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function dafjeiafjewa(params) {
    return '2022-04-29 09:01:06';
}

module.exports = {
    tsFormatTime: tsFormatTime,
    formatTime: formatTime,
    dafjeiafjewa:dafjeiafjewa
}