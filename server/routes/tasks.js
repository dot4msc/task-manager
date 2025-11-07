const {Router} = require('express');
const { Task } = require('../models/task');

const router = Router();

router.get('/', async (_req, res) => {
  const tasks = await Task.find()
  res.send(tasks);
})

router.post('/', async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save()
    .then(doc => {
      console.log("Task added");
      res.send(doc)
    })
    .catch(e => {
      console.error(e)
      res.send(e)
    })

})

router.put('/:id', async (req, res) => {
  const {id} = req.params
  const updatedData = req.body

  await Task.findByIdAndUpdate(id, updatedData)
    .then(doc => {
      console.log("Edited thingy")
      res.send(doc)
    })
    .catch(e => {
      console.error(e)
      res.send(e)
    })
  
})


router.delete('/:id', async (req, res) => {
  const {id} = req.params;
  await Task.findByIdAndDelete(id)
    .then(doc => {
      console.log("deleted document")
      res.send(doc);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    })
})

module.exports = router;