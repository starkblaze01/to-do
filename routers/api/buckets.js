const express = require("express");
const router = express.Router();

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const Bucket = require("../../models/Bucket");

// @route GET api/users/test
// @desc Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "It works!!" }));

router.post("/add", (req, res) => {
    const bucketName = req.body.bucketName;
    const label = req.body.label;
    if (bucketName){
        console.log(bucketName,label,Bucket)
        Bucket.create({ bucketName, label, list: [] }).then(() => res.json({msg: 'success'}))   
    }
    else {
        console.log('no data')
        res.json({msg: 'no data'})
    }
})
router.get('/all', (req,res) => {
    Bucket.find().then(doc => res.json(doc))
})
router.post('/update/:_id', (req, res) => {
    const _id = req.params;
    let list = req.body.list
    list = {
        description: 'hello there', done: false
    }
    if (list){
        Bucket.findOneAndUpdate({ _id }, { list: list }, { new: true }).then((doc) => res.json(doc))
    }
    else {
        res.json({msg: 'no to-do found'})
    }
})

module.exports = router;