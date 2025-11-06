import { useState } from 'react'
import './NewTaskForm.css'

export default function NewTaskForm() {
  const [selectStyle, setSelectStyle] = useState({backgroundColor: "yellow", color: "darkorange"})
  
  function handleStyle(e) {
    if(e.target.value === "EN PROCESO"){
      setSelectStyle({backgroundColor: "yellow", color:"darkorange"})
    }
    else {
      setSelectStyle({backgroundColor: "lightgreen", color:"darkgreen"})
    }
  }
  
  return(
    <div className='modal-overlay'>
      <div className='modal'>
        <form>
          <label htmlFor="percentage-input">Porcentaje: (0-100)</label>
          <input id="percentage-input" type="number" placeholder="(0-100)"/>

          <br/>

          <label htmlFor="status-select">Estatus: </label>
          <select onChange={handleStyle} style={selectStyle} id="status-select">
            <option style={{backgroundColor: "yellow", color: "darkorange"}} value="EN PROCESO">EN PROCESO</option>
            <option style={{backgroundColor: "lightgreen", color: "darkgreen"}} value="COMPLETADO">COMPLETADO</option>
          </select>

          <br/>

          <label htmlFor="description-textarea">Descripción: </label>
          <br/>
          <textarea rows={10} id="description-textarea" placeholder='Descripción'></textarea>
        </form>
      </div>
    </div>
  )
}