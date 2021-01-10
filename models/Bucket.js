const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BucketSchema = new Schema({
    bucketName: {
        type: String,
        required: true
    },
    label: {
        type: String,
    },
    list: {
        type: Array,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Bucket = mongoose.model("buckets", BucketSchema);
