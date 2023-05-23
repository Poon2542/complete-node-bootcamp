const fs = require('fs');
const server = require('http').createServer();

server.on('request',(req,res) =>{
    //solution 1
    //read a file into var ,nd send it back
    /*fs.readFile('test-file.txt',(err,data) => {

        if(err) console.log(err);
        res.end(data);
    });*/

    //solution 2 - stream
    //when we recieve each chunk of data,we send it as stream
    /*const readable = fs.createReadStream('test-file.txt')
    readable.on("data",chunk =>{ //send chunk !!
        res.write(chunk); // response is writable stream
        //read 1 piece of file the send it as it avaliable
    });
    readable.on('end',() =>{    //end happen when data has finish loading
        res.end();
    });
    readable.on("error",err=>{
        console.log(err);
        res.statusCode = 500;
        console.log("File not found!");
    });*/

    //solution 3 - stop load data before crash
    //using pipe data
    const readable = fs.createReadStream("text-file.txt");
    readable.pipe(res);
    
});

server.listen(8000,'127.0.0.1',()=>{
    console.log('listening...');
});