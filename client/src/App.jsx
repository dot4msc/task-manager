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
    setData(apiData => [...apiData, task])
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