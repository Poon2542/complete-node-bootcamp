//PATH TO RUN THIS COMMAND = node models/import-dev-data.js

const dotenv = require('dotenv');
dotenv.config({path : './config.env'}); //enviorment var
const fs = require('fs');
const Tour = require('./../models/tourModel')

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

//READ JSON FILE
const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json','utf-8')); //JSON.parse = convert string to data set, This case we're using DIRECT DIRECTORY

//Not - direct directory
//tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'));

//IMPORT DATA INTO DB
const importData = async () =>{
    try{
        await Tour.create(tours)
        console.log('Data successfully loaded');
    }catch (error){
        console.log(err);
    }
};

//DELETE ALL DATA FROM COLLECTION
const deleteData = async() =>{
    try{
        await Tour.deleteMany(); // delete all data by not fill any value
        console.log('Data successfully deleted!')
    }catch (err){
        console.log(err);
    }
}

//node models/import-dev-data.js --import
if(process.argv[2] ==='--import'){
    importData();
//node models/import-dev-data.js --delete
}else if(process.argv[2] === '--delete'){
    deleteData();
}

console.log(process.argv);