const express = require('express'); //start modoule router
const fs = require('fs');

const tourController = require('./../controller/tourController'); //.. move up 1 level
const tourRouter = express.Router(); //we call inside router as tour

//tourRouter.param('id',tourController.checkID); //if paramitter that send back is id it will ping id

//create a checkBody middleware
//check if body contain the name and price property
//if not 400 (bad request)
//Add it to the post handler stack

tourRouter
    .route('/') 
    .get(tourController.getAllTours)
    .post(tourController.updateToursId); //do check body first before updatetour

tourRouter
    .route('/:id')
    .get(tourController.getOneTours)
    .patch(tourController.changeToursId)
    .delete(tourController.deleteToursId);

module.exports = tourRouter; //exoort router out to use in other module