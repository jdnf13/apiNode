const mongoose = require ('mongoose');

const dataSchema = mongoose.model('Users', {
    _id:        {type:  Number},
    name:       {type:  String},    
    lastname:   {type:  String},
    mail:       {type:  String},
    rol:        {type:  String},
    password:   {type:  String},
    phone:      {type:  String},
    address:    {type:  String},
    city:       {type:  String}
});  

// asigno modelo
const Users = dataSchema;
module.exports = Users;