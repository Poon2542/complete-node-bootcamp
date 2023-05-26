
const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({ //basic describing data
    name : {
        type : String,
        //validator - if the value is actually there
        required : [true,'A tour must have a name'], //primary key we need this ??
        unique : true
    },
    duration:{
        type : Number,
        required : [true,'A tour must have a durations']
    },
    maxGroupSize: {
        type : Number,
        required : [true,'A tour must have a group size']
    },
    difficulty:{
        type : String,
        required : [true,'A tour must have a difficulty']
    },
    ratingsAverage : { //no required value because it's not user value who specify this review
        type : Number,
        default : 4.5
    },
    ratingsQuantity : {
        type : Number,
        default : 0
    },
    price : {
        type : Number,
        required : [true,'A tour must have a price']
    },
    priceDiscount : Number,
    summary:{
        type : String,
        trims : true //only work for a string
        
    },
    description : {
        type : String,
        trim : true,
        required : [true,'A tour must have a description']
    },
    imageCover : {
        type:String,
        required : [true,'A tour must have a cover image']
    },
    images : [String], //as an array of string of image so that we can get later
    createdAt : {  //timestamp set by the time that user add new tour
        type : Date,
        default : Date.now()
    },
    startDates : [Date] //different date that tours start-- WHY ???
    //MongoDB neet to parse daa that we get in and parse it as a date
});
//create tour out of our tour schema
const Tour = mongoose.model('Tour',tourSchema); //always use uppercase on name of model

module.exports = Tour;

/* Testing db
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
}); //catch err*/