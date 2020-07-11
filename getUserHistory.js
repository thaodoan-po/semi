var { exec } = require('child_process');
module.exports = function getDisk(ref) {
    //execute cmd to get information
    exec('last', (err, stdout, stderr) => {
        console.log(stderr);
        //reg to get disk usage
        var reg = /(^\w+)\s+(\w+.\d|\w+)\s+(\w+\s+\w+\s+\w+)\s+(\w+:\w+)\s+(\w.+)/gim;
        //get result
        var result = reg.exec(stdout);
        ref.doc('user').set({
            name: result[1],
            method: result[2],
            date: result[3],
            time: result[4],
            status: result[5]
        })
    })
}