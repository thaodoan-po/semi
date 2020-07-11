var keepCalling = true;
setTimeout(() => {
    keepCalling = false;
}, 10000);
while(keepCalling){
    console.log('do something');
}