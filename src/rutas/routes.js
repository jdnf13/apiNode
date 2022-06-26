const {Router} = require('express');
const router = Router();
const Portafolio  = require('../models/portafolio');
//const _ = require('underscore');
//rutas de acceso
router.get('/', async (req,res) => {
    //console.log('llamado a ruta');
    try {
        console.log('intentando obtener data',Portafolio);
        const arrayPortafolio = await Portafolio.find()
        const data = {"data":arrayPortafolio};
        res.json(data);
        //console.log(data);
    } catch (error) {
        console.log('Error obteniendo data',error);
    }    
});
module.exports = router