//axios nos sirve para los datos desde mongo, atravez del render enviamos datos de los endpoints al frontend
const axios = require('axios');
///para realizar consultas desde aqui tambien
const Taskdb = require('../model/model');
//para los usuarios 
const User = require('../model/user');

const passport = require('passport');

exports.homeRoutes = async (req, res) => {
    const h = new Date().toISOString().slice(0, 10);
    const today = new Date(h);
    const hoy = today.toISOString();

    tasksno = await Taskdb.find({
        user: req.user.id, date: {
            $gte: hoy
        }
    }).sort({ date: 'asc' });
    //const tasks = ordenamientoselecciondate(tasksno, 2);
    tasks = tasksno;
    //{ date: ISODate("2024-03-27") }
    // { date: hoy }
    //);
    //tasks = ordburbujahoras(taskssinordenar, 0, 'start_h');
    //tasks = ordenamientoseleccion(taskssinordenar, 0, 'start_h');
    res.render('index', { tasks })
}

//para mostrar las tareas del dia de hoy 
exports.tasks_today = async (req, res) => {
    const h = new Date().toISOString().slice(0, 10);
    const today = new Date(h);
    const hoy = today.toISOString();
    const taskssinordenar = await Taskdb.find({ user: req.user.id, date: hoy });
    //{ date: ISODate("2024-03-27") }
    // { date: hoy }
    //);
    //tasks = ordburbujahoras(taskssinordenar, 0, 'start_h');
    tasks = ordenamientoseleccionstarth(taskssinordenar, 0, 'start_h');
    res.render('tasks_today', { tasks })
}


//task of the week:
exports.tasks_of_week = async (req, res) => {
    // Obtén la fecha de inicio de la semana actual
    try {
        let startOfWeek = new Date();
        startOfWeek.setHours(0, 0, 0, 0);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

        // Obtén la fecha de fin de la semana actual
        let endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 7);

        // Consulta los registros de la semana actual en la base de datos
        const tasksno = await Taskdb.find({
            user: req.user.id,
            date: {
                $gte: startOfWeek,
                $lt: endOfWeek
            }
        });


        const tasks = ordburbujafechas(tasksno, 1);
        let endw = new Date(endOfWeek);

        endw.setDate(endOfWeek.getDate());
        let startw = new Date(startOfWeek);
        startw.setDate(startOfWeek.getDate() + 1);
        //endw = endw.toDateString()
        const week = {
            startday: startw.toDateString(),
            endday: endw.toDateString()
        }

        res.render('task-of-week', { tasks, week });
        //res.json(registrosSemana);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Hubo un error al buscar los registros de la semana.' });
    }
}

///tareas del mes month task 
exports.task_month = async (req, res) => {

    // Obtén la fecha de inicio de la semana actual
    try {
        let mes = new Date();
        // Crear una consulta para buscar registros dentro del mes especificado
        const fechaInicioMes = new Date(mes.getFullYear(), mes.getMonth(), 1);
        const fechaFinMes = new Date(mes.getFullYear(), mes.getMonth() + 1, 0);

        // Consulta los registros de la semana actual en la base de datos
        const tasksno = await Taskdb.find({
            user: req.user.id,
            date: {
                $gte: fechaInicioMes,
                $lte: fechaFinMes
            }
        });

        const tasks = ordburbujafechas(tasksno, 1);

        const week = {
            start: fechaInicioMes.toDateString(),
            end: fechaFinMes.toDateString()
        }

        res.render('task_month', { tasks, week });
        //res.json(registrosSemana);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Hubo un error al buscar los registros ' });
    }
}
exports.all_tasks = async (req, res) => {

    tasksno = await Taskdb.find({
        user: req.user.id
    });

    tasks = ordburbujafechas(tasksno, 1);
    res.render('all_tasks', { tasks });
}


///vamos a implemnetar el algoritmo de insercion
function ordburbuja(datos, opc, parametro) {
    let len = datos.length;
    //let parametro = parametro;
    //let opc = opc;
    for (let i = 1; i < len; i++) {
        // let comodin = datos[i].start_h;
        for (let j = 0; j < (len - i); j++) {
            if ((datos[j].start_h) > (datos[j + 1].start_h)) {
                let comodin = datos[j];
                comodin = datos[j];
                datos[j] = datos[j + 1];
                datos[j + 1] = comodin
            }
        }
    }
    return datos;
}

//para fechas
//de menor a mayor > 
function ordburbujafechas(datos, opc,) {
    let len = datos.length;
    //let parametro = parametro;
    //let opc = opc;
    for (let i = 1; i < len; i++) {
        // let comodin = datos[i].start_h;
        for (let j = 0; j < (len - i); j++) {
            if ((datos[j].date) > (datos[j + 1].date)) {
                let comodin = datos[j];
                comodin = datos[j];
                datos[j] = datos[j + 1];
                datos[j + 1] = comodin
            }
        }
    }
    return datos;
}

///algoritmo ordenamiento, para hora iniccial hora final, y fecha
function ordenamientoseleccionstarth(datos, opc, parametro) {
    let len = datos.length;
    for (let i = 0; i < len; i++) {
        let posmax = i
        for (let j = i + 1; j < len; j++) {
            //swich case:
            switch (opc) {
                case opc == 1:
                    //Declaraciones ejecutadas cuando el resultado de expresión coincide con el 1 mayor a menor
                    if ((datos[posmax].start_h) < (datos[j].start_h)) {
                        posmax = j
                    }
                    break;
                case opc == 2:
                    //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor2
                    if ((datos[posmax].start_h) > (datos[j].start_h)) {
                        posmax = j
                    }
                    break;
                default:
                    //
                    if ((datos[posmax].start_h) > (datos[j].start_h)) {
                        posmax = j
                        break;
                    }
            }
            let comodin = datos[i]
            datos[i] = datos[posmax]
            datos[posmax] = comodin
        }

    }
    return datos
}


function ordenamientoseleccionendh(datos, opc, parametro) {
    let len = datos.length;
    for (let i = 0; i < len; i++) {
        let posmax = i
        for (let j = i + 1; j < len; j++) {
            //swich case:
            switch (opc) {
                case opc == 1:
                    //Declaraciones ejecutadas cuando el resultado de expresión coincide con el 1 mayor a menor
                    if ((datos[posmax].end_h) < (datos[j].end_h)) {
                        posmax = j
                    }
                    break;
                case opc == 2:
                    //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor2
                    if ((datos[posmax].end_h) > (datos[j].end_h)) {
                        posmax = j
                    }
                    break;
                default:
                    //
                    if ((datos[posmax].end_h) > (datos[j].end_h)) {
                        posmax = j
                        break;
                    }
            }
            let comodin = datos[i]
            datos[i] = datos[posmax]
            datos[posmax] = comodin
        }

    }
    return datos
}

function ordenamientoselecciondate(datos, opc, parametro) {
    let len = datos.length;
    for (let i = 0; i < len; i++) {
        let posmax = i
        for (let j = i + 1; j < len; j++) {
            //swich case:
            switch (opc) {
                case opc == 1:
                    //Declaraciones ejecutadas cuando el resultado de expresión coincide con el 1 mayor a menor
                    if ((datos[posmax].date) < (datos[j].date)) {
                        posmax = j
                    }
                    break;
                case opc == 2:
                    //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor2
                    if ((datos[posmax].date) > (datos[j].date)) {
                        posmax = j
                    }
                    break;
                default:
                    //
                    if ((datos[posmax].date) > (datos[j].date)) {
                        posmax = j
                        break;
                    }
            }
            let comodin = datos[i]
            datos[i] = datos[posmax]
            datos[posmax] = comodin
        }

    }
    return datos
}


///algoritmo de insercion, para hora inical, final y la fecha;
function ordenamientoinsercion(datos) {
    let len = datos.length;
    //"2"
    for (let i = 1; i < len; i++) {
        let poscomodin = i;
        let comodin = datos[i];
        console.log(comodin)
        for (let j = i - 1; j >= 0; j--) {
            console.log(datos[j].start_h)
            console.log(comodin.start_h)
            if ((datos[j].start_h) > (comodin.start_h)) {
                //intercambio de valores
                datos[j + 1] = datos[j];
                datos[j] = comodin;
            } else {
                j = (-1);
            }
        }
    }
}

exports.add_task = (req, res) => {
    const errors = [];
    const { name_task, date, start_h, end_h, description } = req.body;
    res.render('add_task', { errors, name_task, start_h, end_h, date, description });
}

exports.update_task = async (req, res) => {
    //res.render('update_task');
    //alternativa sin axios 
    //const task = await Taskdb.findById(req.params.id);
    //res.render("update_task", { task })

    //con axios
    axios.get('http://localhost:3000/api/tasks', { params: { id: req.query.id } })
        .then(function (taskdata) {
            const errors = [];
            res.render("update_task", { task: taskdata.data, errors })
        })
        .catch(err => {
            res.send(err);
        });
}

exports.about_app = (req, res) => {
    //res.send('about_app');
    res.render('about');
}

//rutas de autenticación
//para usuarios
exports.users = async (req, res) => {
    const usrs = await User.find();

    // Iterar sobre cada usuario
    for (const usuario of usrs) {
        // Calcular la cantidad de tareas para el usuario actual
        const cantidadTareas = await Taskdb.countDocuments({ user: usuario._id });
        // Actualizar el documento del usuario con la cantidad de tareas
        await User.updateOne(
            { _id: usuario._id },
            { $set: { cantidadtareas: cantidadTareas } }
        );
        console.log(`Se actualizó la cantidad de tareas para el usuario ${usuario._id}: ${cantidadTareas}`);
    }

    console.log('Se han actualizado todos los usuarios con la cantidad de tareas.');
    const users = await User.find();

    res.render('usuarios', { users });
}

//crear usuarios con la sesion
exports.add_user = (req, res) => {
    const errors = [];
    //variables para que  el formulario pueda enviar los datos  al servidor
    const { name, email, password, confirmpassword, rol } = req.body;
    res.render('add_user', { errors, name, email, password, confirmpassword, rol });
}

exports.update_user = async (req, res) => {
    const errors = [];
    //variables para que  el formulario pueda enviar los datos  al servidor
    const user = await User.findById(req.params.id);
    const password = ""
    const confirmpassword = "";

    res.render('update_user', { errors, user });
}
exports.usersignin = (req, res) => {
    const errors = [];
    res.render('signin', { errors });
}

exports.usersignup = (req, res) => {
    const errors = [];
    //variables para que  el formulario pueda enviar los datos  al servidor
    const { name, email, password, confirmpassword } = req.body;
    res.render('signup', { errors, name, email, password, confirmpassword });
}

//para regfistrar un nuevo usuario
exports.signup = async (req, res) => {
    //vamos a requerir los datos de cada campo del fomrulrio para validarlos 
    const { name, email, password, confirmpassword } = req.body;
    const errors = [] //arreglo para capturar los errores
    if (password != confirmpassword) {
        errors.push({ text: "Las contraseñas no coinciden" });
    }
    if (password.length < 6) {
        errors.push({ text: 'La contraseña debe contener al menos 6 caracteres' });
    }
    //en caso de existir errores , se renderiza la vista con el mensaje de error y los valores anteriores
    if (errors.length > 0) {
        res.render('signup', { errors, name, email, password, confirmpassword });
    } else {
        //para que no se repita el correo 
        const useremail = await User.findOne({ email: email });
        if (useremail) {
            req.flash("error_msg", "El correo ya esta registrado");
            res.redirect('/signup')
        } else {
            //si no hay errores , se envia una peticion post a la api para crear un nuevo usuario  
            // en este caso creamos directamente un usuario:
            const newUser = new User({ name, email, password })
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save()
            req.flash('success_msg', 'Se ha registrado correctamente !!')
            res.redirect('/signin')
        }
        //console.log(req.body);
        //res.send('ok')
    }

}

//para la autenticacion de usuarios: y haremos uso del metodo de autenticacion 
exports.signin = (passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true
}));

//para reportes 
exports.report = async (req, res) => {
    const tasks = await Taskdb.find({ user: req.user.id });
    res.render('reportes', { tasks });
}

// Make a get request to /api/users
/*  axios.get('http://localhost:3000/api/users')
     .then(function (response) {
         res.render('index', { users: response.data });
     })
     .catch(err => {
         res.send(err);
     })
*/



/** 


exports.update_user = (req, res) =>{
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
} */