const express = require('express');
const bodyParser = require('body-parser');
const cars = require('../routes/Cars');
const cors = require("cors");

const fileUpload = require('express-fileupload');



module.exports = function(app) {

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(fileUpload());
    app.use('/api/cars',cars);
    


}