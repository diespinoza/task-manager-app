//why separete routes and tasks?
//the logic from the routes is places here so that app is more legible
//and organized

//
const Task = require('../models/Task')

const getAllTasks = (req,res) => {
  res.send('get all tasks');
}

const createTask = async (req,res) => {
  try{
    //const task = await Task.create({name:'first task'})
    const task = await Task.create(req.body)
    //201 is the succesfull post status
    res.status(201).json({ task });
  } catch (error){
    //500 is general server error
    res.status(500).json({msg: error});
    console.log(error);
  }
}

const getTask = (req,res) => {
  res.json({id:req.params.id});
}

const updateTask = (req,res) => {
  res.send('update a task');
}

const deleteTask = (req,res) => {
  res.send('delete a task');
}

//exports is an object since we will be adding more functions
module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
}
