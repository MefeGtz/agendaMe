//objeto con multiples metodos para la autenticacion 
const helpers = {};
helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'No ha iniciado sesión');
    res.redirect('/signin');
}
module.exports = helpers;
//este middleware verifica si el usuario esta logueado o no, si lo está llama al siguiente middleware sino redir    