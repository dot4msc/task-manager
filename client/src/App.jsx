import "./App.css"
import Button from "./components/Button"
import NewTaskForm from "./components/modals/NewTaskForm"
import Table from "./components/Table"
import { useEffect, useState } from "react"

export default function App() {

  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(import.meta.env.VITE_SERVER_URL)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setLoading(false)
      })
  },[])

  function onAddTask(task){

    fetch(import.meta.env.VITE_SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then(res=>{
        if(!res.ok){
          throw new Error(res.statusText + ": " + res.status);
        }
        return res.json()
      })
      .then((data) => {
        setData(apiData => [...apiData, data])
      })
      .catch(error => console.log(error))
  }

  if (loading) return <p>Loading...</p>;
  
  return(
    <>
      <Table data={data}/>
      <Button text="+ Agregar Tarea" fn={() => setShowModal(true)}/>
      {showModal && (
        <NewTaskForm setShowModal={setShowModal} onAddTask={onAddTask}/>
      )}
    </>
  )
}