module.exports = function followCPU(ref) {
    const { exec } = require('child_process');
    var sendEmail = require('./sendEmail');
    var startTime = new Date().getTime();
    var follow = setInterval(() => {
        var script = exec('top -bn1 | grep "Cpu(s)" && top -bn1 | grep "top -"', (error, stdout, stderr) => {
            var reg = /(\d+|\d+.\d+)\s(id)/gim;
            var reg2 = /\d+:\d+:\d+/gim;
            var temp = reg.exec(stdout);
            var time = reg2.exec(stdout);
            var cpu = 100 - temp[1];
            cpu = cpu.toFixed(2);
            if (Number(cpu) < 70) {
                clearInterval(follow);
            }
            console.log(cpu);
            var loopTime = new Date().getTime();
            if (loopTime - startTime > 30000 && Number(cpu) > 70) {
                ref.doc('cpu/warning/' + cpu + '').set({
                    time: time[0]
                });
                sendEmail(cpu, time[0]);
                clearInterval(follow);
            }
        })
    }, 1000);
}