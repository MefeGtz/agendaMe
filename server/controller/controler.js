var Taskdb = require('../model/model');
const User = require('../model/user');

// create and save new task
//la apalbr async nos inica que dentro de este proceso hay funciones asincronas
exports.create = async (req, res) => {
    // validate request
    /*  if (!req.body) {
         res.status(400).send({ message: "campo requerido!" });
         return;
     }
  */
    //para validar
    const errors = [];
    if (!req.body.date) {
        errors.push({ text: "Fecha obligatoria!" });
    }
    if (!req.body.name_task) {
        errors.push({ text: "Campo obligatorio" });
    }
    if (!req.body.start_h) {
        errors.push({ text: "Campo obligatorio" });
    }
    if (!req.body.end_h) {
        errors.push({ text: "Campo obligatorio" });
    }
    if (Number(req.body.start_h) >= Number(req.body.end_h)) {
        errors.push({ text: "La hora inicial no puede ser mayor o igual a la hora final" });
    }
    if (errors.length > 0) {
        res.render('add_task', {
            errors,
            name_task: req.body.name_task,
            date: req.body.date,
            start_h: req.body.start_h,
            end_h: req.body.end_h,
            description: req.body.description
        })
    } else {
        // res.redirect('/add-task');
        // new task
        const task = new Taskdb({
            date: req.body.date,
            name_task: req.body.name_task,
            start_h: req.body.start_h,
            end_h: req.body.end_h,
            description: req.body.description,
            user: req.user.id
        });


        //peticion asincrona que no espera a que termina sino que sigue ejecutando otras tareas
        // save user in the database
        await task
            .save(task)
            .then(data => {
                // res.send(data)
                req.flash('success_msg', 'Tarea agregada correctamente');
                res.redirect('/add-task');
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "error en la creacion "
                });
            });
    }
}

exports.add_newtask = async (req, res) => {
    // validate request
    /*  if (!req.body) {
         res.status(400).send({ message: "campo requerido!" });
         return;
     }
  */
    //para validar
    const errors = [];
    if (!req.body.date) {
        errors.push({ text: "Fecha obligatoria!" });
    }
    if (!req.body.name_task) {
        errors.push({ text: "Campo obligatorio" });
    }
    if (!req.body.start_h) {
        errors.push({ text: "Campo obligatorio" });
    }
    if (!req.body.end_h) {
        errors.push({ text: "Campo obligatorio" });
    }
    if (errors.length > 0) {
        res.render('add_task', {
            errors,
            name_task: req.body.name_task,
            date: req.body.date,
            start_h: req.body.start_h,
            end_h: req.body.end_h
        })
    } else {
        // res.redirect('/add-task');
        // new task
        const task = new Taskdb({
            date: req.body.date,
            name_task: req.body.name_task,
            start_h: req.body.start_h,
            end_h: req.body.end_h,
            description: req.body.description,
            user: req.user.id
        });

        //peticion asincrona que no espera a que termina sino que sigue ejecutando otras tareas
        // save user in the database
        await task
            .save(task)
            .then(data => {
                // res.send(data)
                req.flash('success_msg', 'Tarea agregada correctamente');
                res.redirect('/add-task');
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "error en la creacion "
                });
            });
    }
}
// retrieve and return all task/ retrive and return a single task
exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        Taskdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "No encontrado " + id })
                } else {
                    res.send(data)

                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error " + id })
            })

    } else {
        Taskdb.find()
            .then(task => {
                res.send(task)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error al cargar información" })
            })
    }


}

// Update a new idetified task by task id
exports.update = (req, res) => {
    /*
   */
    const errors = [];
    if (!req.body.date) {
        errors.push({ text: "Fecha obligatoria!" });
    }
    if (!req.body.name_task) {
        errors.push({ text: "Campo obligatorio" });
    }
    if (!req.body.start_h) {
        errors.push({ text: "Campo obligatorio" });
    }
    if (!req.body.end_h) {
        errors.push({ text: "Campo obligatorio" });
    }
    if (Number(req.body.start_h) >= Number(req.body.end_h)) {
        errors.push({ text: "La hora inicial no puede ser mayor o igual a la hora final" });
    }
    if (errors.length > 0) {
        req.flash('success_msg', 'Se actualizo !!');
        return res
            .status(400)
            .send({ message: "campos obligatorios" }
            )

    }

    const id = req.params.id;
    Taskdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `no puede actualizarse ${id}. o no due encontrado!` })
            } else {
                req.flash('success_msg', 'Se actualizo !!');
                res.send(data)
                // res.redirect("/");
            }

        })
        .catch(err => {
            res.status(500).send({ message: "Error al actualizar" })
        })

}

exports.updateTask = async (req, res) => {
    //para validar
    const errors = [];
    if (!req.body.date) {
        errors.push({ text: "Fecha obligatoria!" });
    }
    if (!req.body.name_task) {
        errors.push({ text: "Campo obligatorio" });
    }
    if (!req.body.start_h) {
        errors.push({ text: "Campo obligatorio" });
    }
    if (!req.body.end_h) {
        errors.push({ text: "Campo obligatorio" });
    }
    if (Number(req.body.start_h) >= Number(req.body.end_h)) {
        errors.push({ text: "La hora inicial no puede ser mayor o igual a la hora final" });
    }

    const task = {
        _id: req.body.id,
        name_task: req.body.name_task,
        date: req.body.date,
        start_h: req.body.start_h,
        end_h: req.body.end_h,
        description: req.body.description
    }

    if (errors.length > 0) {
        res.render('update_task', {
            errors, task
        })
    } else {
        const id = req.params.id;
        await Taskdb.findByIdAndUpdate(req.params.id, req.body).then(data => {
            if (!data) {
                res.status(404).send({ message: `no puede actualizarse. o no due encontrado!` })
            } else {
                req.flash('success_msg', 'Se actualizo !!');
                // res.send(data)
                res.redirect("/");
            }

        })
            .catch(err => {
                res.status(500).send({ message: "Error al actualizar", id })

            })
        // req.flash('success_msg', 'Se actualizo !!');


    }
}

// Delete a task with specified user id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Taskdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `NO se ha podido eliminar el registro id ${id} o el id no es correcto` })
            } else {
                req.flash('success_msg', 'Se elimino el registro!!');
                res.send({
                    message: "registro eliminado correctamente!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el registro: " + id
            });
        });
}

exports.deleteuser = (req, res) => {
    const id = req.params.id;

    User.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `NO se ha podido eliminar el registro id ${id} o el id no es correcto` })
            } else {
                req.flash('success_msg', 'Se elimino el Usuario!!');
                res.send({
                    message: "registro eliminado correctamente!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el registro: " + id
            });
        });
}


//para regfistrar un nuevo usuario
exports.add_user = async (req, res) => {
    //vamos a requerir los datos de cada campo del fomrulrio para validarlos 
    const { name, email, password, confirmpassword, rol } = req.body;
    const errors = [] //arreglo para capturar los errores
    if (password != confirmpassword) {
        errors.push({ text: "Las contraseñas no coinciden" });
    }
    if (password.length < 6) {
        errors.push({ text: 'La contraseña debe contener al menos 6 caracteres' });
    }
    //en caso de existir errores , se renderiza la vista con el mensaje de error y los valores anteriores
    if (errors.length > 0) {
        res.render('add_user', { errors, name, email, password, confirmpassword, rol });
    } else {
        //para que no se repita el correo 
        const useremail = await User.findOne({ email: email });
        if (useremail) {
            req.flash("error_msg", "El correo ya esta registrado");
            res.render('add_user', { errors, name, email, password, confirmpassword, rol });
        } else {
            //si no hay errores , se envia una peticion post a la api para crear un nuevo usuario  
            // en este caso creamos directamente un usuario:
            const newUser = new User({ name, email, password })
            newUser.rol = rol;
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save()
            req.flash('success_msg', 'Se ha registrado correctamente !!')
            res.redirect('/usuarios')
        }
        //console.log(req.body);
        //res.send('ok')
    }

}

//para actualizar usuario desde administrador :
exports.update_user = async (req, res) => {
    //vamos a requerir los datos de cada campo del fomrulrio para validarlos 
    const { name, email, password, rol } = req.body;
    const errors = [] //arreglo para capturar los 
    if (password != "") {
        if (password.length < 6) {
            errors.push({ text: 'La contraseña debe contener al menos 6 caracteres' });
        }
        const contra = 'empy'
    }
    //en caso de existir errores , se renderiza la vista con el mensaje de error y los valores anteriores
    if (errors.length > 0) {
        res.render('update_user', { errors, name, email, password, rol });
    } else {
        //si no hay errores , se envia una peticion post a la api para crear un nuevo usuario  
        // en este caso creamos directamente un usuario:  
        const id = req.params.id;
        contra = req.body.password;

        if (password != "") {
            userp = new User({ password });
            userp.password = await userp.encryptPassword(password)

            user = {
                name: req.body.name,
                email: req.body.email,
                password: userp.password,
                rol: req.body.rol
            };
        } else {
            user = {
                name: req.body.name,
                email: req.body.email,
                rol: req.body.rol
            };
        }
        console.log(id, user)

        await User.findByIdAndUpdate(req.params.id, user).then(data => {
            if (!data) {
                res.status(404).send({ message: `no puede actualizarse. o no due encontrado!` })
            } else {
                req.flash('success_msg', 'Se actualizo !!');

                // res.send(data)
                res.redirect('/usuarios')
            }

        })
            .catch(err => {
                res.status(500).send({ message: "Error al actualizar", id })

            });





        // req.flash('success_msg', 'Se actualizo !!');
    }
    //console.log(req.body);
    //res.send('ok')
}

