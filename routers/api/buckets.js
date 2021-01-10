const express = require("express");
const router = express.Router();


// Load Bucket model
const Bucket = require("../../models/Bucket");


router.get("/test", (req, res) => res.json({ msg: "It works!!" }));

router.post("/add", (req, res) => {
    const bucketName = req.body.bucketName;
    const label = req.body.label;
    if (bucketName){
        console.log(bucketName,label,Bucket)
        Bucket.create({ bucketName, label, list: [] }).then((lol) => {
            Bucket.find().sort({date: -1}).then(doc => res.json(doc))
        })   
    }
    else {
        res.json({msg: 'no data'})
    }
})
router.get('/all', (req,res) => {
    Bucket.find().sort({date: -1}).then(doc => res.json(doc))
})
router.post('/update/:_id', (req, res) => {
    const _id = req.params;
    const list = req.body.list;
    if (list){
        Bucket.findOneAndUpdate({ _id }, { list: list }, { new: true }).then((doc) => {
            Bucket.find().sort({ date: -1 }).then(doc => res.json(doc))
        })
    }
    else {
        res.json({msg: 'no to-do found'})
    }
})
router.delete('/:_id', (req, res) => {
    const _id = req.params;
    Bucket.findByIdAndDelete(_id).then(()=> {
        Bucket.find().sort({ date: -1 }).then(doc => res.json(doc))
    })
})

module.exports = router;