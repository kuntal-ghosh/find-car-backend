const Joi = require('joi');
const mongoose = require('mongoose');


const Car=mongoose.model('Car',new mongoose.Schema({
    name:{ 
        type:String,
        required:true,
        
    },
   
     
    details:{
        type:String,
        required:false,
    },
    
    car_image:{
        
    }
    // service_details:{
      
    // }

}));

function validateCar(car) {
  const schema =Joi.object({
    name: Joi.string().required(),
    details: Joi.string().required(),
    car_image: Joi.required(),
    
  })
  
  

  return schema.validate(car);
}



exports.Car= Car; 
exports.validate = validateCar;