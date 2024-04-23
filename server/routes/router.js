const express = require('express')
const route = express.Router(); //objeto para crear rutas
const services = require('../services/render');
const controller = require('../controller/controler');
//para las autentiaciones con helper
const { isAuthenticated } = require('../helpers/auth');

/**
 * @description Root Route
 * @method GET /
 */
route.get("/", isAuthenticated, services.homeRoutes);

/**
 * @description Root Route
 * @method GET /add-task
 */
route.get("/add-task", isAuthenticated, services.add_task);
//route.post("/add-task", isAuthenticated, controller.add_newtask);


/**
 * @description Root Route
 * @method GET /update-task
 */
route.get("/update-task", isAuthenticated, services.update_task);
//para actualizar con put
route.put('/update-task/:id', isAuthenticated, controller.updateTask);


///test de ruta
route.get("/about", services.about_app);

/**
 * @description Root Route
 * @method GET /user
 */
route.get('/signin', services.usersignin);

route.get("/signup", services.usersignup);

//task today
route.get('/task-today', isAuthenticated, services.tasks_today);
//API

///task of week
route.get('/task-of-week', isAuthenticated, services.tasks_of_week);

//task of mont
route.get('/task-mont', isAuthenticated, services.task_month)

route.get('/all-tasks', isAuthenticated, services.all_tasks);
//repportes 
route.get('/reportes', isAuthenticated, services.report);

route.post('/add-task', isAuthenticated, controller.create);

route.get('/task-all', isAuthenticated, services.tasks_today);
route.get('/api/tasks', controller.find);
//route.get('/api/tasks/:id', controller.find);
route.put('/api/tasks/:id', controller.update);
route.delete('/api/tasks/:id', controller.delete);


module.exports = route;
