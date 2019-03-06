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

then create a database in your mysql and replace these with your credentials 

```
    host: "<your db host>",
    user: "<your db user>",
    password: "<your db password>",
    database: '<your db name>',
    port: '<your db port>'
```

in both file named "db.js" and "server.js" and also in "testdb.js" if you face connection problem to test/check for several times to make sure your db connection is working as well or not.

then create a table names "tasks" with some dummy data in your database

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
    (1, 'Take Photo', 1, '2016-04-10 23:50:40'),
    (2, 'Wash Your Bike', 1, '2016-04-10 23:50:40'),
    (3, 'Sell Camera', 1, '2016-04-10 23:50:40'),
    (4, 'Buy Lenses', 1, '2016-04-10 23:50:40'),
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

now check [http://localhost:3000/tasks](http://localhost:3000/tasks) with [postman](https://www.getpostman.com/)

```
    [
       {
           "id": 1,
           "task": "Take Photo",
           "status": 1,
           "created_at": "2016-04-10T17:50:40.000Z"
       },
       {
           "id": 2,
           "task": "Wash Your Bike",
           "status": 1,
           "created_at": "2016-04-10T17:50:40.000Z"
       },
       {
           "id": 3,
           "task": "Sell Camera",
           "status": 1,
           "created_at": "2016-04-10T17:50:40.000Z"
       },
       {
           "id": 4,
           "task": "Buy Lenses",
           "status": 1,
           "created_at": "2016-04-10T17:50:40.000Z"
       },
       {
           "id": 5,
           "task": "Cut Your Boss Hair",
           "status": 1,
           "created_at": "2016-04-10T17:50:50.000Z"
       }
    ]
   ```


