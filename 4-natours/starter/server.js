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

const tourSchema = new mongoose.Schema({ //basic describing data
    name : {
        type : String,
        //validator - if the value is actually there
        required : [true,'A tour must have a name'], //primary key we need this ??
        unique : true
    },
    rating : {
        type : Number,
        default : 4.5
    },
    price : {
        type : Number,
        required : [true,'A tour must have a price']
    }
});
//create tour out of our tour schema
const Tour = mongoose.model('Tour',tourSchema); //always use uppercase on name of model

const testTour = new Tour({ //create new object out of a class - instance of Tour module
    name: 'Pikachu',
    rating: 4.7,
    price: 497
});
//console.log(process.env); //print out global variable

testTour.save().then(doc =>{ //save to db ,//what is then function ??
    console.log(doc);
}).catch(err =>{
    console.log("ERROR !! : ",err)
}); //catch err

const port = process.env.PORT || 3000;
app.listen(port,() =>{

    console.log(`App running on ${port}...`);
});

