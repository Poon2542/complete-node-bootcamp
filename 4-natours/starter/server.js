const dotenv = require('dotenv');
dotenv.config({path : './config.env'}); //enviorment var
const app = require('./app');

const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose.connect(DB,{
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify : false
}).then(con =>{
    console.log(con.connections);
    console.log("DB connection Successful");
});



const port = process.env.PORT || 3000;
app.listen(port,() =>{

    console.log(`App running on ${port}...`);
});

