const mongoose = require('../config/db');

const taskSchema = new mongoose.Schema({
  description: {type: String, required: true},
  status: [{
    percentage: {type: Number, required: true , default: 0},
    label: {type: String, enum: ['En Proceso', 'Prioridad', 'Pausa', 'Completado'], default: 'En Proceso'},
  }],
  asignee: {type: String, required: true},
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;