const mongoose = require ('mongoose');

const dataSchema = mongoose.model('Producto', {
    _id:        {type:  Number},
    codigo:     {type:  String},    
    producto:   {type:  String},
    linea:      {type:  String},
    valor:      {type:  Number},
    descuento:  {type:  Number}
});  

// asigno modelo
const Producto = dataSchema;
module.exports = Producto;








/**
 * Lo mismo pero con Schema (Esquemas), la ultima vez no funciono el delete
 * 
 * const mongoose = require ('mongoose');
const Schema  = mongoose.Schema;

const dataSchema = new Schema({
    _id:Number,
    producto: String,
    valor: String   
});

// modelo
const Productos = mongoose.model('Productos',dataSchema);

module.exports = Productos;
 */