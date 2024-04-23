///modelo para los usuarios 
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
    rol: { type: Number, default: 1 },
    cantidadtareas: { type: Number, required: false }//1 es usuario y 0 es administrador  
});

//vamos a encriptar la contraseña mediante el uso de emtodos
//metodo para encryptar
UserSchema.methods.encryptPassword = async (password) => {
    const saltos = await bcrypt.genSalt(5);
    const hash = bcrypt.hash(password, saltos);
    return hash;
}
//para comparar si a contrasñea es la misma que esta en la base de datos

UserSchema.methods.comparePasswords = async function (password) {
    //utilizamos este tipo de funcion porque con la funcion flecha no podemos hacer referencia a algo del esquema el famoso scope, sigue siendo asincrona
    return await bcrypt.compare(password, this.password);
};

const Userdb = mongoose.model("user", UserSchema)
module.exports = Userdb;