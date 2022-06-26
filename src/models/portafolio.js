const mongoose = require ('mongoose');
const Schema  = mongoose.Schema;

const dataSchema = new Schema({
    producto: String,
    valor: String   
});

// modelo
const Productos = mongoose.model('Productos',dataSchema);

module.exports = Productos;