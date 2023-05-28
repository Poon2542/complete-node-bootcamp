
const mongoose = require('mongoose');
const slugify = require('slugify');
const tourSchema = new mongoose.Schema({ //basic describing data
    name : {
        type : String,
        //validator - if the value is actually there
        required : [true,'A tour must have a name'], //primary key we need this ??
        unique : true,
        trim : true,
        maxLength : [40,'A tour name must have less or equal than 40 characters'],
        minlength : [10,'A tour name must have more or equal than 10 characters']
    },
    slug : {
        type : String
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
        required : [true,'A tour must have a difficulty'],
        //lock difficulty to only 3 stage - enum
        enum : {
            values : ['easy','medium','difficult'],
            message : 'Difficulty is either : asy, medium , difficult'
        }
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
        default : Date.now(),
        select: false
    },
    startDates : [Date], //different date that tours start-- WHY ???
    secretTour : {
        type : Boolean,
        default : false
    }
    
    //MongoDB neet to parse daa that we get in and parse it as a date
});
//create tour out of our tour schema
tourSchema.virtual('durationWeeks').get(function() {

    return this.duration / 7;
});

//MONGODB middleware
//pre-save hook
tourSchema.pre('save',function(next) {
    this.slug = slugify(this.name, {lower : true}) //convert all name to lower case
    console.log(this)
    next();
});

/*
//pre-save middleware
tourSchema.pre('save',function(next) {
    console.log('Will save document...');
    next();
});

//pre-save document
tourSchema.pre('save',function(doc,next) {
    console.log(doc);
    next();
});*/

//QUERY MIDDLEWARE - create secrect tour field
tourSchema.pre(/^find/,function(next){ //trigger everything that start with find
//tourSchema.pre('find',function(next){
    this.find({ secretTour : { $ne : true}});
    
    this.start = Date.now(); //current time in milli second
    next();
});

//get all doc that return from query
tourSchema.post(/^find/,function(docs,next){ //for every find in field
    console.log(`Query took ${Date.now() - this.start} millisecond!`);
    //print all tour that found in console.log document
    //console.log(docs);
    next();
});

//AGGREGATUIB MIDDLEWARE - Tell that what pipeline are we using
tourSchema.pre('aggregate',function(next) {
    this.pipeline().unshift({ $match: {secretTour: {$ne : true}}}) //add array
    
    console.log(this);
    next();
});

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