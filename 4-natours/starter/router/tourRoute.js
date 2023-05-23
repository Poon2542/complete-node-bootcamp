const express = require('express'); //start modoule router
const fs = require('fs');

const tourController = require('./../controller/tourController'); //.. move up 1 level
const tourRouter = express.Router(); //we call inside router as tour

tourRouter
    .route('/') 
    .get(tourController.getAllTours)
    .post(tourController.updateToursId);

tourRouter
    .route('/:id')
    .get(tourController.getOneTours)
    .patch(tourController.changeToursId)
    .delete(tourController.deleteToursId);

module.exports = tourRouter; //exoort router out to use in other module