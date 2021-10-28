// app.js
// main application code
const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();

//model for db
const Task = require('./models/Task');

// middleware
app.use(express.static('./public')) //serve static files
app.use(express.json()); //data goes into req.body

//routes
app.get('/hello', async (req, res) => {
  try{
    //this was an experiment with using schemas in the main
    //app.js code
    const tasks = await Task.find({});
    res.status(200).json({tasks})

  } catch (error){

  }
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
 *  once pushed to heroku, make mongoDB access from anywhere.
 *  Mongodb collections have a dynamic schemes. So documents in the same
 *  collection don't need to have the same setup field or destructor.
 *
 *  why mongoose?
 *  Mongoose will setup a consistent structure
 *  comes with many goodies that make development easier
 *  mongoose 6.xx.xx has no more deprecation warnings
 *  idea: connect to db first, then start the server.
 *
 * only the properties that we setup in the schema will be passed to the database
 * current setup has no validation. you can pass in empty routers.
 *
 *
 *
 */

//app.get('/api/v1/tasks')
//app.post('/api/v1/tasks')
//app.get('/api/v1/tasks/:id')
//app.patch('/api/v1/tasks/:id') //put vs patch? whats the difference?
//app.delete('/api/v1/tasks/:id')


const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch(error) {
    console.log(error);
  }
}


start()

