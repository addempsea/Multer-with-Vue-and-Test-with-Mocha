let mongoose = require('mongoose');
const Schema = mongoose.Schema;
let fileSchema = new Schema({
    image: {type: String, required: true }
});

module.exports = mongoose.model('file', fileSchema);