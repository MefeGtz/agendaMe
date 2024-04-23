const express = require('express')
const route = express.Router();
const services = require('../services/render');
const controller = require('../controller/controler');
//aqi van la srutas de autenticacion de usuari

const { isAuthenticated } = require('../helpers/auth');
//simplemente lo agregamos en cada ruta

//route.get('/users/signin', services.usersignin);
//route.get('/users/signup', services.usersignup)

route.post('/signup', services.signup);



route.post('/signin', services.signin);

//para el logout
route.get('/logout', isAuthenticated, function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/signin');
    });
});

///movimiento de datos de usuarios :
route.get('/usuarios', isAuthenticated, services.users);

//agregar ususarios desde sesion ;
route.get('/add-user', isAuthenticated, services.add_user);
route.post('/add_user', isAuthenticated, controller.add_user);


//actualizar usuarios 
route.get('/update-user/:id', isAuthenticated, services.update_user);

route.put("/update-user/:id", isAuthenticated, controller.update_user);

route.delete('/api/users/:id', controller.deleteuser);




module.exports = route;