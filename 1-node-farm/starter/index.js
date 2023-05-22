//core module
const fs = require('fs');
const http = require('http'); //giving network quality
const url = require('url'); //for creating router
const slugify = require("slugify");

//require module
const replaceTemplate = require('./module/replaceTemplate');


//Non-blocking,Asynchrounus way
/*
fs.readFile('./txt/start.txt','utf-8',(err,data1)=>{ //we need to have to have error parameter for data itself
    
    fs.readFile(`./txt/${data1}.txt`,'utf-8',(err,data2)=>{ 
        console.log(data2);
        fs.readFile(`./txt/append.txt`,'utf-8',(err,data3)=>{ 
            console.log(data3);
            fs.writeFile(`./txt/final.txt`,`${data2}\n${data3}`,'utf-8',(err,data3)=>{ 
                console.log("Your File have been written");
            }); 
        }); 
    }); 
}); // call back
console.log("Will read file");*/

///////////////////////////template/template-overiew.html
//Server
//we want to excute read json only once
//Read json data from data.json
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');

const productData = JSON.parse(data); //Read json data from data.json

const slugs = productData.map(el => slugify(el.productName,{lower : true}));

console.log(slugs);

const server = http.createServer((req,res)=>{ //res for dealing with response
    //console.log(req.url); //this let us look into URL REQUEST ---------------VERY IMPORTANT !!!----------------

    //creating route for url clicking on buttom
    const {query,pathname} = url.parse(req.url,true);

    url.parse(req.url,true);

    //overview page
    if(pathname == '/overview' || pathname == '/'){
        //Load template overview
        res.writeHead(200,{'Content-type' : 'text/html'})
        
        //loop data array productData which contain all of product, we replace it with template card json data ,el = element
        //join make array turn to string
        const cardHtml = productData.map(el => replaceTemplate(tempCard,el)).join(''); //except callback function and get it into array via loop - read more !!!
        const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardHtml);
        console.log(cardHtml);
        res.end(output);

    //Product Name
    }else if(pathname == '/product'){
        res.writeHead(200,{'Content-type' : 'text/html'})
        //create id webpage using data object replacing template product
        console.log(query.id);
        const product = productData[query.id];
        const output = replaceTemplate(tempProduct,product);
        res.end(output);
    //API
    }else if(pathname =='/api'){

        res.writeHead(200,{'Content-type' : 'application/json'})
        res.end(data); //we need this later when building html template -> send actual string
       // res.end('API');

    //Not found
    }else{
        res.writeHead(404,{
            'Content-type':'text/html'
        }); //error 404
        res.end("<h1>Page not found!</h1>");
    
    }
    //res.end("Hello from the server"); //has access to request object
}); //request response

server.listen(8000,'127.0.0.1',()=>{ //asynchronous function callback

    console.log("Listening to request on port 8000");
}) //normally we listen at 8000 = sub address on certain host
//listening come first and then get to server to respond with hello from the server
