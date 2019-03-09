# node js and mysql REST API

creating a very simple and basic api endpoint using node js

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

you need to have node js and mysql installed in your machine.


### Installing

First download or clone this repository. Get in directory with terminal, then

```
    $ npm install
```

then create a .env modifying .env.example file

```
    APP_NAME=Node REST API
    APP_ENV=local
    APP_KEY=
    APP_DEBUG=true
    APP_URL=http://localhost
    
    HASH_SECRET=something
    
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=8889
    DB_DATABASE=homestead
    DB_USERNAME=homestead
    DB_PASSWORD=secret
    
    PORT=3000
```


then create a table named "tasks" with some dummy data in your database

```
    CREATE TABLE IF NOT EXISTS `tasks` (
     `id` int(11) NOT NULL,
     `task` varchar(200) NOT NULL,
     `status` tinyint(1) NOT NULL DEFAULT '1',
     `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    
    ALTER TABLE `tasks` ADD PRIMARY KEY (`id`);
    ALTER TABLE `tasks` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
```

and insert some dummy data

```
    INSERT INTO `tasks` (`id`, `task`, `status`, `created_at`) VALUES
    (1, 'Take Photo', 1, '2019-03-06 10:45:48'),
    (2, 'Wash Your Bike', 1, '2019-03-06 10:45:48'),
    (3, 'Sell Camera', 1, '2019-03-06 10:45:48'),
    (4, 'Buy Lenses', 1, '2019-03-06 10:45:48'),
    (5, 'Cut Your Boss Hair', 1, '2016-04-10 23:50:50');
```

## Running the tests


```
    $ node testdb.js
    Connected!
```

if it shows "Connected!" then come out and run "server.js"

```
    $ node server.js
    API server started on: 3000
```

or you can use nodemon (check installed or not)
nodemon will watch changes
```
$ npx nodemon
[nodemon] 1.18.10
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node server.js`
API server started on: 3000
```

now check [http://localhost:3000/tasks](http://localhost:3000/tasks) with [postman](https://www.getpostman.com/)

```
    [
       {
           "id": 1,
           "task": "Take Photo",
           "status": 1,
           "created_at": "2019-03-06T10:45:51.000Z"
       },
       {
           "id": 2,
           "task": "Wash Your Bike",
           "status": 1,
           "created_at": "2019-03-06T10:45:51.000Z"
       },
       {
           "id": 3,
           "task": "Sell Camera",
           "status": 1,
           "created_at": "2019-03-06T10:45:51.000Z"
       },
       {
           "id": 4,
           "task": "Buy Lenses",
           "status": 1,
           "created_at": "2019-03-06T10:45:51.000Z"
       },
       {
           "id": 5,
           "task": "Cut Your Boss Hair",
           "status": 1,
           "created_at": "2019-03-06T10:45:51.000Z"
       }
    ]
   ```


