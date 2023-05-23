const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();

setTimeout(() => console.log("Timer 1 finished"),0);
setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile("test-file.txt",() => {
    console.log("I/0 finished");
    console.log("-------------------");

    setTimeout(() => console.log("Timer 2 finished"),0);
    setTimeout(() => console.log("Timer 3 finished"),0);
    setImmediate(() => console.log("Immediate 2 finished"));

    process.nextTick(() => console.log('Process.nextTick')) //this will start first because -> nexTick will be the first in queue
    crypto.pbkdf2('password','salt',100000,1024,'sha512',() => {
        console.log(Date.now() - start,"Passowrd encrypted");
    })
    crypto.pbkdf2('password','salt',100000,1024,'sha512',() => {
        console.log(Date.now() - start,"Passowrd encrypted");
    })
    crypto.pbkdf2('password','salt',100000,1024,'sha512',() => {
        console.log(Date.now() - start,"Passowrd encrypted");
    })
    crypto.pbkdf2('password','salt',100000,1024,'sha512',() => {
        console.log(Date.now() - start,"Passowrd encrypted");
    })
    
});

console.log("Hello From the top-level code");