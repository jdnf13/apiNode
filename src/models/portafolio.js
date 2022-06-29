const mongoose = require ('mongoose');
const Schema  = mongoose.Schema;

const dataSchema = new Schema({
    _id:Number,
    producto: String,
    valor: String   
});

// modelo
const Productos = mongoose.model('Productos',dataSchema);

module.exports = Productos;