const {Router} = require('express');
const Tasks = require('../models/task');

const router = Router();

router.get('/', async (_req, res) => {
  const tasks = await Tasks.find()
  res.send(tasks);
})

module.exports = router;