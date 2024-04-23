//este modulo nos servira para la sesion de un usuario
const passport = require('passport');
// para este caso usaremos la autenticacion mediante el uso de la bd 
const LocalStrategy = require('passport-local').Strategy;
//necesitaremos del modelo 

const User = require('../server/model/user');

//procedemos a definir la fomra en que se consultara a la base de datos si el usuario existe
passport.use(new LocalStrategy({
    usernameField: 'email'
},
    async (email, password, done) => {
        const user = await User.findOne({ email: email });
        if (!user) {
            return done(null, false, { message: 'Usuario no encontrado' });
        } else {
            //procedemos a comrpobar si la constraseña existe mediante el metodo que ya hemos creado antes 
            const exist = await user.comparePasswords(password);
            if (exist) {
                //en la funcion done (error, existe ?, mensaje )
                return done(null, user);
            } else {
                return done(null, false, { message: 'Contraseña incorrecta' });
            }
        }
    }));

// una vez iniciada  la sesion debe de ser almacenada en un lugar temporal

passport.serializeUser((user, done) => {
    done(null, user.id);
});

//tambien es necesario un metodo relaciondo al anterior
/* passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
}); */

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});