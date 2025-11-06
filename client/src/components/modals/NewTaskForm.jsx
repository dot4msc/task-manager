import { useState } from 'react'
import './NewTaskForm.css'
import Button from '../Button'

export default function NewTaskForm({setShowModal, onAddTask}) {

  const [percentage, setPercentage] = useState(0);
  const [label, setLabel] = useState("EN PROCESO");
  const [description, setDescription] = useState("");
  const [asignee, setAsignee] = useState("");

  const [selectStyle, setSelectStyle] = useState({backgroundColor: "yellow", color: "darkorange"});

  function handleSelect(e) {
    if(e.target.value === "EN PROCESO"){
      setSelectStyle({backgroundColor: "yellow", color:"darkorange"})
    }
    else {
      setSelectStyle({backgroundColor: "lightgreen", color:"darkgreen"})
    }

    setLabel(e.target.value);
  }

  function handleSubmit(e){
    e.preventDefault();
    console.log(percentage + " " + label + " " + description + " " + asignee)
    if([label, description, asignee].some(field => !field)) {
      console.log("Please enter all values")
      return;
    }

    const task ={
      description: description,
      status: {
        label: label,
        percentage: percentage
      },
      asignee: asignee
    };

    setShowModal(false);
    onAddTask(task);
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

          <Button type="submit" fn={handleSubmit} text="+ Agregar Tarea"/>
        </form>
      </div>
    </div>
  )
}