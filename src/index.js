const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
app.use(cors());

//configuraciones
app.set('json spaces',2);//identado para json

//uso de morgan para ver peticiones desde consola
app.use(morgan('dev'));
//Uso de express para soportar Json
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Conexion a la Base de datos
const mongoose = require('mongoose');
const user = 'cafezen_admin';
const password = 'Daryin231508';
const bdatos = 'portafolio';
const url = `mongodb+srv://${user}:${password}@cafezen.ppzxezy.mongodb.net/${bdatos}?retryWrites=true&w=majority`

mongoose.connect(url,
  {useUnifiedTopology:true})
  .then(() => console.log('Data Base Conected'))
  .catch(e => console.log(e));

//Rutas importadas del archivo index.js de rutes
app.use(require('./rutas/routes'))

//Empieza servidor por el puerto definido
const port = 3003;
app.listen(port,"0.0.0.0", () =>{
    console.log(`Listening...port ${port}`)
});