const EventEmitter = require('events');
const http = require('http');

class Sales extends EventEmitter{ //get all event from newSale
    constructor(){
        super();
    }

}
const myEmitter = new Sales();  //emitter can emit name event then react accordingly

myEmitter.on('newSale',()=>{ // call back function of newSale event will be here

    console.log("There is a new sale");
}) 
myEmitter.on('newSale',stock=>{

    console.log(`there are now ${stock} items left in stock.`);
})

myEmitter.emit('newSale',9);

myEmitter.emit('newSale'); //emit event call newSale
myEmitter.emit('newSale');
myEmitter.emit('newSale'); //can setup multiple listener for event

////////////////
const server = http.createServer();
server.on('request',(req,res) =>{

    console.log('Request Received');
    res.end('Request received'); //end message to website
}); //this is listening (the code is listening

server.on('request',(req,res) =>{

    res.end('another request'); 
});


server.on('close',(req,res) =>{

    res.end('Server closed'); 
});

server.listen(8000,'127.0.0.1',()=>{
    
    console.log('waiting for requests...');
})