const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let FileSchema = new Schema({
    img: { data: Buffer, contentType: String }
});

module.exports = mongoose.model('item', FileSchema);