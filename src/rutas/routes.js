const {Router}      =   require('express');
const router        =   Router();
const Portafolio    =   require('../models/portafolio');
const Users         =   require('../models/users');

//rutas de acceso

/**LOGIN USER */

router.post('/login', async (req,res) => {

    const {email,password} = req.body;
            
        try {
            const arrayLogin = await Users.find();
            let isLogin = false;
            let data = []
            if(arrayLogin){
                arrayLogin.map(item =>{
                    if(item.mail === email && item.password === password){
                        isLogin = true;
                        data.push(item);
                    }
                });
            }

            console.log('is login?   ',isLogin);
            if(isLogin === true){
                res.status(200).json({"data":data[0],"mensaje":"Login Exitoso","estado_p":200});
            }else{
                res.status(500).json({"data":{'login':'fallido'},"mensaje":"Datos incorrectos"});
            }
        } catch (error) {            
            console.log(error);
            res.status(500).json({"mensaje":error,"data":{'mensaje':'Error en los datos suministrados'}});
        } 
    
   
});

/**TRAER TODOS LOS PRODUCTOS*/
router.get('/productos-get', async (req,res) => {
    try {
        const arrayPortafolio = await Portafolio.find()
        const data = {"data":arrayPortafolio};
        res.status(200).json({"data":data.data,"mensaje":"Consulta Exitosa"});
    } catch (error) {
        res.status(500).json({"mensaje":error,"data":null});
    }    
});

/**AGREGAR UN PRODUCTO NUEVO*/
router.post('/insert', async (req,res) => {
    const {codigo,producto,detalle,linea,valor,descuento,promocion} = req.body;
    const _id = Math.random(); 
    const exist = await Portafolio.findOne({_id});
    const exist_producto = await Portafolio.findOne({producto:producto,codigo:codigo});

    if(exist || exist_producto){
        res.status(500).json({"mensaje":"el registro ya fue almacenado anteriormente","data":exist});
    }else{
        if(codigo && producto && linea && valor && descuento){
            try {
                Portafolio.insertMany([
                    {
                        _id:_id,
                        codigo:codigo,
                        producto:producto,
                        detalle:detalle,
                        linea:linea,
                        valor:valor,
                        descuento:descuento,
                        promocion:promocion,
                    },
                ],{w:"majority",wtimeout:100});
                res.status(200).json({"mensaje":"registro almacenado con exito",
                                      "data":[{_id:_id,"producto":producto,"valor":valor}]});
            } catch (error) {
                res.status(500).json({"mensaje":error,"data":null});
            } 
        }else{
            res.status(500).json({"mensaje":"Todos los campos son requeridos","data":null});
        }
    }
});

/**BORRAR UN PRODUCTO*/
router.delete('/delete', (req,res) => {
    let _id = req.body._id;   

    Portafolio.findByIdAndDelete(_id, function (err, docs) {
        if (err){
            return res.status(500).json({"mensaje":"el registro no se elimino correctamente","data":err})        }
        else{
            if(docs)
                return res.status(200).json({"mensaje":"el registro se elimino correctamente","data":docs})
            else
                return res.status(404).json({"mensaje":"el registro no se encontro","data":null})
        }
    });
});

/**MODIFICAR UN PRODUCTO*/
router.put('/actualizar', async (req,res) => {
    const {_id,codigo,producto,detalle,linea,valor,descuento,promocion} = req.body;
    try {
        console.log('data enviada desde api --',req.body)
        if(codigo && producto && linea && valor && descuento){
            console.log('data recibida --',req.body)
            const exist = await Portafolio.findOne({_id:_id});
            if(exist && exist._id !== _id){
                console.log('error 1');
                return res.status(500).json({"mensaje":"el registro no existe","data":[{_id:_id,"producto":producto,"valor":valor}]});
            }
            const insert = await Portafolio.updateOne(
                {_id:_id},
                {
                    $set: {
                        _id:_id,
                        codigo:codigo,
                        producto:producto,
                        detalle:detalle,
                        linea:linea,
                        valor:valor,
                        descuento:descuento,
                        promocion:promocion,
                    }
                });
            return res.status(200).json({"mensaje":"el registro se actualizo","data":[{_id:_id,"producto":producto,"valor":valor}]});
        }else
            return res.status(500).json({"mensaje":"datos requeridos","data":[{_id:_id,"producto":producto,"valor":valor}]});

    } catch (error) {
        console.log('error 3');
        return res.status(500).json({"mensaje":"Error interno","data":null});
    }
});

//Exportamos las rutas de los servicios
module.exports = router