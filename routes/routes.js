'use strict';
module.exports = function(app) {
    const path = require('path');
    const middleware = require('../middleware');
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname +'/../views/front/index.html'));
    });

    var todoList = require('../controllers/appController');
    var users = require('../controllers/userController');
    // todoList Routes
    app.route('/tasks')
        .get(middleware.checkToken, todoList.list_all_tasks)
        .post(todoList.create_a_task);

    app.route('/tasks/:taskId')
        .get(middleware.checkToken, todoList.read_a_task)
        .put(middleware.checkToken, todoList.update_a_task)
        .delete(middleware.checkToken, todoList.delete_a_task);

    app.post('/register', users.check_a_user, users.create_a_user)

    app.post('/activate', users.activate_a_user)

    app.post('/login', users.login_a_user);

    app.post('/vf', middleware.checkToken, users.verifyAD)


};

