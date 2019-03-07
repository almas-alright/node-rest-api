'use strict';
module.exports = function(app) {
    var path = require('path');
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname +'/../views/front/index.html'));
    });

    var todoList = require('../controllers/appController');
    var users = require('../controllers/userController');
    // todoList Routes
    app.route('/tasks')
        .get(todoList.list_all_tasks)
        .post(todoList.create_a_task);

    app.route('/tasks/:taskId')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);

    app.route('/register')
        .post(users.create_a_user);

    app.route('/login')
       .post(users.login_a_user);


};
