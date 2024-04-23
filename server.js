const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const moment = require('moment');
const connectDB = require('./server/database/connection');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash'); //enviar mensajes entre multiples vistas
//para el inicion de sesion y manejo de sesiones 
const passport = require('passport');
//llamammos el archivo de config para passport;



const app = express();

dotenv.config({ path: '.env' })
const PORT = process.env.PORT || 9000



// mongodb connection
connectDB();
require('./config/passport');
//nos dirigimos a la srutas de inicio de sesion


// log requests timepo de respuesta 
app.use(morgan('tiny'));

//middlewares
// parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }))
app.use(methodOverride('_method')); //para que los formularios puedan usar otros metodos como put y lo enviamos con un metodo oculto
app.use(session({
    secret: 'secretdat',
    resave: true,
    saveUninitialized: true
})); //se deben configurar ciertos parametros de session, nos permitiran guardar los datos del usuario
// set view engine

//invocamos el uso de passport
app.use(passport.initialize());
app.use(passport.session()); //permite mantener la sesion

app.use(flash());

// para hacer uso de ellas  y pasar mensajes 
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg'); //en el metodo de insertar vamos hacer uso de estos mesajes
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null; //para que de forma global tengamos los datos del usuario que esta loggeado
    next();
});

app.set("view engine", "ejs")
//app.engine('.hbs')
app.set("views", path.resolve(__dirname, "views"))

app.locals.moment = moment; //todas lasplantillas podran usar moment
// load assets  direccuin de imagenes y archivos css
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

//lload routers
app.use(require('./server/routes/router'));
app.use(require('./server/routes/users'));
app.listen(3000, () => console.log("Server on port", 3000));
/* 



*/