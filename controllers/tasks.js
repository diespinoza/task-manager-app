// controllers/tasks
// controller for the api for tasks
//the logic from the routes is places here so that app is more legible
//and organized

//why asynchronous wrappers for our controllers?
//we have asynchronous operations, try catch is
//useful but somewhat redundant.
// create middleware function to not repeat
// There are some npm packages that can be used
// but understand what they do by doing the basic
// loggic
//
const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const {createCustomError } = require('../errors/custom-errors');

const getAllTasks = asyncWrapper(async (req,res) => {
  const tasks = await Task.find({});
  res.status(200).json({tasks});
  //exploring options for the response
  // res.status(200).json({tasks, amount:tasks.length});
  //
  // res.status(200).json({
  // success:true,
  // data:{tasks,nbHits: tasks.length}
  // });
  //
  // res.status(200).json({
  //   status:"success",
  //   data:{tasks, nbHits: tasks.length}
  // });
})

//const getAllTasks = async (req,res) => {
//  try{
//    const tasks = await Task.find({});
//    res.status(200).json({tasks});
//    //exploring options for the response
//    // res.status(200).json({tasks, amount:tasks.length});
//    //
//    // res.status(200).json({
//    // success:true,
//    // data:{tasks,nbHits: tasks.length}
//    // });
//    //
//    // res.status(200).json({
//    //   status:"success",
//    //   data:{tasks, nbHits: tasks.length}
//    // });
//  } catch (error){
//    //if using success or status in response,
//    //make sure to edit the error response to match
//    res.status(500).json({msg: error});
//  }
//}



const createTask = asyncWrapper(async (req,res) => {
  //const task = await Task.create({name:'first task'}) //hardcoded
  const task = await Task.create(req.body)
  //201 is the succesfull post status
  res.status(201).json({ task });
})

const getTask = asyncWrapper(async (req,res, next) => {
  const {id: taskID} = req.params;
  const task = await Task.findOne({_id:taskID});
  if(!task){
    return next(createCustomError(`No task with id: ${taskID}`, 404 ));
    //new error object. manual way to do it
        // const error = new Error('Not Found');
        // error.status = 404;
        // return next(error)

    //always setup this return. Otherwise you will
    //send the wrong response
        // return res.status(404).json({msg:`No task with id: ${taskID}`});
  }
  res.status(200).json({task});
})

const updateTask = asyncWrapper(async (req,res) => {
  //looking for id but also need body
  //Have to pass in options since validators wont
  //work right away nor the items updated
  const { id: taskID } = req.params
  //the returned object if the old one, need options
  const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
    new: true,
    runValidators: true,
  });

  if(!task){
    return next(createCustomError(`No task with id: ${taskID}`, 404 ));
    // return res.status(404).json({msg:`No task with id: ${taskID}`});
  }
  //passing data because need info to update
  //res.status(200).json({ id:taskID,data:req.body})
  res.status(200).json({task})
})

const deleteTask = asyncWrapper( async (req,res) => {
  const {id:taskID} = req.params;
  const task = await Task.findOneAndDelete({_id:taskID});
  if(!task){
    return next(createCustomError(`No task with id: ${taskID}`, 404 ));
    // return res.status(404).json({msg:`No task with id: ${taskID}`});
  }
  //responding with task to see in the API
  //but you are not limited to responding with the
  //task. The frontend doesnt always care about the
  //data, it just needs to know the status if the
  //request was successful

  res.status(200).json({task});
  //  res.status(200).send(); // a simple response
  //res.status(200).json({task:null, status:'success'});// another simple response
})

//exports is an object since we will be adding more functions
module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
}
