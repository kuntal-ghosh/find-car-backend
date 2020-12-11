const express = require('express');
const app = express();
const  port=process.env.PORT || 8000;
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const ObjectID = require("mongodb").ObjectID;
const cors = require("cors");
// const fileUpload = require('express-fileupload');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(fileUpload());


require('./startup/Routes')(app);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cd3jp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

 mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log(`Connected to ${process.env.DB_NAME}...`));


    

app.listen(port,()=>{
console.log(`listening to port ${port}`);
})


// const MongoClient = require('mongodb').MongoClient;
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
