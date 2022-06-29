const {Router} = require('express');
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
    const arrayPortafolio = await Portafolio.find();
    const _id = arrayPortafolio.length + 1; 
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
            res.status(200).json({"mensaje":"registro almacenado"});
        } catch (error) {
            console.log('Error obteniendo data',error);
        }  
    }
});
router.delete('/delete', async (req,res) => {
    console.log('recibiendo data ',req.body);
    const {_id} = req.body;
    const exist = await Portafolio.findOne({_id});

    if(exist){
        try {
            Portafolio.deleteOne({_id:_id});
            res.json({"mensaje":"registro eliminado"});
        } catch (error) {
            console.log('Error obteniendo data',error);
        }
    }else{
        res.json({"mensaje":"registro no existe"});
    }
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