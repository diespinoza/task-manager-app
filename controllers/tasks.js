// controllers/tasks
// controller for the api for tasks
//the logic from the routes is places here so that app is more legible
//and organized

//
const Task = require('../models/Task')

const getAllTasks = async (req,res) => {
  try{
    const tasks = await Task.find({});
    res.status(200).json({tasks});
  } catch (error){
    res.status(500).json({msg: error});
  }
}

const createTask = async (req,res) => {
  try{
    //const task = await Task.create({name:'first task'}) //hardcoded
    const task = await Task.create(req.body)
    //201 is the succesfull post status
    res.status(201).json({ task });
  } catch (error){
    //500 is general server error
    res.status(500).json({msg: error});
    console.log(error);
  }
}

const getTask = async (req,res) => {
  try{
    const {id: taskID} = req.params;
    const task = await Task.findOne({_id:taskID});
    if(!task){
      //always setup this return. Otherwise you will
      //send the wrong response
      return res.status(404).json({msg:`No task with id: ${taskID}`});
    }

    res.status(200).json({task});
  } catch(error){
    //if the ID has the wrong syntax
    res.status(500).json({msg: error});
  }
}

const updateTask = async (req,res) => {
  //looking for id but also need body
  //Have to pass in options since validators wont
  //work right away nor the items updated
  try{
    const { id: taskID } = req.params
    //the returned object if the old one, need options
    const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
      new: true,
      runValidators: true,
    });

    if(!task){
      return res.status(404).json({msg:`No task with id: ${taskID}`});
    }
    //passing data because need info to update
    //res.status(200).json({ id:taskID,data:req.body})
    res.status(200).json({task})
  } catch(error){
    res.status(500).json({msg: error});
  }
}

const deleteTask = async (req,res) => {
  try{
    const {id:taskID} = req.params;
    const task = await Task.findOneAndDelete({_id:taskID});
    if(!task){
      return res.status(404).json({msg:`No task with id: ${taskID}`});
    }

    //responding with task to see in the API
    //but you are not limited to responding with the
    //task. The frontend doesnt always care about the
    //data, it just needs to know the status if the
    //request was successful

    res.status(200).json({task});
  //  res.status(200).send(); // a simple response

  //res.status(200).json({task:null, status:'success'});// another simple response
  } catch(error){
    res.status(500).json({msg: error});
  }
}

//exports is an object since we will be adding more functions
module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
}
