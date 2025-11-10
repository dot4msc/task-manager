import { useState } from 'react'
import './EditTaskForm.css'
import Button from '../Button'

export default function EditTaskForm({task, onSave, onClose}) {
  const [percentage, setPercentage] = useState(task.status.percentage);
  const [label, setLabel] = useState(task.status.label);
  const [description, setDescription] = useState(task.description);
  const [asignee, setAsignee] = useState(task.asignee);

  const [selectStyle, setSelectStyle] = useState(task.status.label === "EN PROCESO" ? {backgroundColor: "yellow", color: "darkorange"} : {backgroundColor: "lightgreen", color: "darkgreen"});

  function handleSelect(e) {
    if(e.target.value === "EN PROCESO"){
      setSelectStyle({backgroundColor: "yellow", color:"darkorange"})
    }
    else {
      setSelectStyle({backgroundColor: "lightgreen", color:"darkgreen"})
    }

    setLabel(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if([label, description, asignee].some(field => !field)) {
      console.log("Please enter all values")
      return;
    }

    const updatedTask = {
      ...task,
      description,
      asignee,
      status: {
        ...task.status,
        percentage,
        label
      }
    }

    onSave(updatedTask);
  }

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <form>
          <label htmlFor="percentage-input">Porcentaje: (0-100)</label>
          <input value={percentage} onChange= {(e) => setPercentage(e.target.value)}id="percentage-input" type="number" placeholder="(0-100)"/>

          <br/>

          <label htmlFor="status-select">Estatus: </label>
          <select value={label} onChange={handleSelect} style={selectStyle} id="status-select">
            <option style={{backgroundColor: "yellow", color: "darkorange"}} value="EN PROCESO">EN PROCESO</option>
            <option style={{backgroundColor: "lightgreen", color: "darkgreen"}} value="COMPLETADO">COMPLETADO</option>
          </select>

          <br/>

          <label htmlFor="description-textarea">Descripción: </label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={10} id="description-textarea" placeholder='Descripción'></textarea>
          
          <br/>

          <label htmlFor="asignee-input">Asignee: </label>
          <input value={asignee} onChange={(e) => setAsignee(e.target.value)} id = "asignee-input" type='text'/>

          <div className='control-buttons'>
            <Button type="submit" fn={handleSubmit} text="Guardar Cambios"/>
            <Button fn={onClose} text="Cancelar"/>
          </div>
        </form>
      </div>
    </div>
  )
}