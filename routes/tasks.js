const express = require('express');
//what is router?
const router = express.Router();

//once you have the routes set up. test it out in postman
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
} = require('../controllers/tasks');

//pass in the tasks
router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

/*
router.route('/').get((req,res) => {
  res.send('all items');
})
*/

// what does this do?
module.exports = router;

