let express = require('express');
let router = express.Router();
let Joi = require("joi");
let Course = require('../schema/course.schema');

router.get('/courses', async(req,res) => {
    let courses = await Course.find();
    res.send(courses);
});

// data read code by id concept

router.get('/course/:id', async(req,res) => {
    let course = await Course.findById(req.params.id);
    if(!course){return res.status(403).send({message:"Invalid course id"})};
    res.send({course:course});
});


// data create code concept

router.post('/createcourse', async(req,res) => {
    let result = ValidationError(req.body)  //req.body.name
    if(result.error){return res.status(400).send(result.error.details[0].message)}
    let newcourse = new Course({
        name : req.body.name
    });
    let course = await newcourse.save();
    res.send({newcourse:course});
});



// data update code concept

router.put('/updatecourse/:id', async(req,res) => {
    let course = await Course.findById(req.params.id);
    if(!course){return res.status(403).send({message:"Invalid course id"})}
    course.name = req.body.name;
    await course.save();
    res.send({message:"course updated", course:course})
});


// data delete code concept

router.delete('/removecourse/:id', async(req,res) => {
    let course = await Course.findByIdAndRemove(req.params.id);
    if(!course){return res.status(403).send({message:"Invalid course id"})};
    res.send({message:"course removed"})
});


function ValidationError(error){
    let schema = Joi.object({
        name:Joi.string().min(3).max(12).required(),
    });
    return schema.validate(error);
}



module.exports = router;