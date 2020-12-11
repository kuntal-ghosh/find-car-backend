// const { Customer, validate } = require("../models/customer");
// const auth = require("../middleware/auth");
const {Car ,validate}= require("../model/Car");

const express = require("express");
const router = express.Router();



router.get('/', async (req, res) => {

    try {
        const cars=await Car.find();
        res.send(cars);


    } catch (error) {
        console.log(error);
    }
    
})

router.get('/:name', async (req, res) => {
    const name=req.params.name;

    try {
        const cars=await Car.find({name:name});


        if (cars.length==0) 
        return res
          .status(404)
          .send("NO CAR FOUND");


        res.send(cars);


    } catch (error) {
        console.log(error);
    }
    
})


router.get('/byId/:id', async (req, res) => {
    const id=req.params.id;

    try {
        const car=await Car.find({_id: id});


        if (!car) 
        return res
          .status(404)
          .send("NO CAR FOUND");


        res.send(car);


    } catch (error) {
        console.log(error);
    }
    
})
// app.use(fileUpload());

router.post("/",async (req, res)=>{

    
    console.log(req.body.service_id);
    let file;
        console.log("end point hitted");
        console.log(req.files);
        try {
            file = req.files.file;
        } catch (error) {
            console.log(error);
        }
        const newImg = file.data;
        const encImg = newImg.toString('base64');

        const image = {
            contentType: file.mimetype,
            size: file.size,
            img: Buffer.from(encImg, 'base64')
        };
        

    let car=new Car({
        name: req.body.name,    
        details: req.body.details,
        car_image:image,
        // service_details: service[0].details,
    });

    try {
        car= await car.save(); 
        res.send(car);
    } catch (error) {
        console.log(error);
    }
   
})




router.put("/:id",async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const car = await Car.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      
    },
    { new: true }
  );

  if (!car)
    return res
      .status(404)
      .send("The car with the given ID was not found.");

  res.send(car);
});

router.delete("/:id", async (req, res) => {
  const car = await Car.findByIdAndRemove(req.params.id);

  if (!car)
    return res
      .status(404)
      .send("The car with the given ID was not found.");

  res.send(car);
});

// router.get("/:id", auth, async (req, res) => {
//   const customer = await Customer.findById(req.params.id).select("-__v");

//   if (!customer)
//     return res
//       .status(404)
//       .send("The customer with the given ID was not found.");

//   res.send(customer);
// });

module.exports = router;


