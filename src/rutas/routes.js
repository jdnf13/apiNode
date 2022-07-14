const {Router} = require('express');
const mongoose = require ('mongoose');
const router = Router();
const Portafolio  = require('../models/portafolio');
//rutas de acceso
router.get('/productos-get', async (req,res) => {
    try {
        console.log('intentando obtener data',Portafolio);
        const arrayPortafolio = await Portafolio.find()
        const data = {"data":arrayPortafolio};
        res.json(data);
    } catch (error) {
        console.log('Error obteniendo data',error);
    }    
});
router.post('/insert', async (req,res) => {
    console.log('recibiendo data ',req.body);
    const {producto,valor} = req.body;
    const _id = Math.random(); 
    const exist = await Portafolio.findOne({_id});
    const exist_producto = await Portafolio.findOne({producto});

    if(exist || exist_producto){
        res.status(500).json({"mensaje":"el registro ya fue almacenado anteriormente"});
    }else{
        try {
            Portafolio.insertMany([
                {
                    _id:_id,
                    "producto":producto,
                    "valor":valor
                },
            ],{w:"majority",wtimeout:100});
            res.status(200).json({"mensaje":"registro almacenado con exito"});
            console.log('registro almacenado con exito--> ',_id,' - ',producto,' - ',valor);
        } catch (error) {
            console.log('Error obteniendo data',error);
        }  
    }
});

//Modelo para el DELETE solamente
const Producto = mongoose.model('Producto', {
    _id:{type:Number},
    producto: { type: String },
    valor: { type: String }
});   

router.delete('/delete', (req,res) => {
    let _id = req.body._id;   

    Producto.findByIdAndDelete(_id, function (err, docs) {
        if (err){
            return res.status(500).json({"mensaje":"el registro no se elimino correctamente"})        }
        else{
            return res.status(200).json({"mensaje":"el registro se elimino correctamente","documento":docs})
        }
    });
});
router.put('/actualizar', async (req,res) => {
    try {
        
        const {_id,producto,valor} = req.body;
        if(producto && valor && _id){
            const exist = await Portafolio.findOne({producto});
            if(exist && exist._id !== _id){
                return res.status(500).json({"mensaje":"el registro no existe"});
            }
            const insert = await Portafolio.update(
                {_id:_id},
                {
                    $set: {
                    producto: producto,
                    valor: valor
                    }
                });
            return res.status(200).json({"mensaje":"el registro se actualizo","data":insert});
        }
        return res.status(500).json({"mensaje":"datos requeridos"});

    } catch (error) {
        return res.status(500).json({"mensaje":"Error interno"});
    }
});
module.exports = router