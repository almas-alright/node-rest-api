'use strict';
module.exports = function(app) {
    const path = require('path');
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname +'/../views/front/index.html'));
    });

    var todoList = require('../controllers/appController');
    var users = require('../controllers/userController');
    // todoList Routes
    app.route('/tasks', verifyToken)
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

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }

}
