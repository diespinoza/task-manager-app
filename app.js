const express = require('express');
const app = express();
const tasks = require('./routes/tasks');

// middleware

app.use(express.json()); //data goes into req.body

//routes
app.get('/hello', (req, res) => {
  res.send('Task Manger APP')
})

app.use('/api/v1/tasks', tasks)


/* What will the routes look like?
 * get all the tasks
 * create a new task
 * get a single task
 * update task
 * delete task
 * --Use versions for the api, its a convention for organization
 * when you create a new version, just redirect to that version
 * --Why do all the paths go down similar routes? convention
 * -- Set up the routes as well the controllers. As the app grows
 *  its not sustainable if everything is dumped into the app.js file
 *
 * - Why this setup?
 *   because we are making a REST API
 *   In this case, we are making an http interface, so other app(front end), can
 *   interact with our data.
 *   Represenational State Transfer
 *
 *   combined http verbs, route paths, and data
 *
 *  mongodb doesnt care how the data relates to each other. Instead of rows,
 *  you have collections, instead of rowsm you have documents.
 *  documents are sets of key value pairs
 */

//app.get('/api/v1/tasks')
//app.post('/api/v1/tasks')
//app.get('/api/v1/tasks/:id')
//app.patch('/api/v1/tasks/:id') //put vs patch? whats the difference?
//app.delete('/api/v1/tasks/:id')


const port = 3000;

app.listen(port, console.log(`server is listening on port ${port}...`))



