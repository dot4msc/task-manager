const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const TasksRoute = require("./routes/tasks")

app.use(cors());
app.use(express.json());

app.use('/tasks', TasksRoute);

app.listen(PORT, () => {
  console.log("Server running at http://localhost:" + PORT);
})