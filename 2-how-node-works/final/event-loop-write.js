const fs = require('fs');


setTimeout(() =>console.log('timer 1 finished',0));
setImmediate(() => console.log('Immediate 1 finished')); //call back = console.log

fs.readfile('Text-file.txt', () =>{

    console.log('I/0 finished');
});

console.log('Hello from the top level code'); //top level code get excuted first then all other call back start running