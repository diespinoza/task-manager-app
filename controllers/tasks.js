//why separete routes and tasks?
//the logic from the routes is places here so that app is more legible
//and organized

const getAllTasks = (req,res) => {
  res.send('get all tasks');
}

const createTask = (req,res) => {
  res.json(req.body);
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
