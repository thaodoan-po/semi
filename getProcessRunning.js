var { exec } = require('child_process');
module.exports = function getProcessRunning(ref) {
    //execute cmd to get information
    exec('ps -eo pid,comm,cmd,%mem,%cpu --sort=-%mem', (err, stdout, stderr) => {
        var reg = /^\s+(\d+)\s(\w+-\w+|\w+)\s+(\/.*?)\s+(\d+.{2})\s+(\d+.{2})$/gim;
        var temp;
        var process = {};
        while (temp = reg.exec(stdout)) {
            process[temp[1]] = {
                cmd: temp[2],
                dir: temp[3],
                mem: temp[4],
                cpu: temp[5]
            }
        }
        ref.set(process)
    })
}