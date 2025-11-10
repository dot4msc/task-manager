import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import { useEffect, useMemo, useState } from 'react'
import "./Table.css"
import EditTaskForm from './modals/EditTaskForm';
import DeleteButton from './DeleteButton';

export default function Table({data}) {

  const [_tasks, setTasks] = useState(data);
  const [selectedTask, setSelectedTask] = useState(null);
  
  const columns = useMemo(() => [
    { header: '#', cell: info => info.row.index + 1},
    { header: 'Estatus', accessorFn: row => row.status.percentage},
    { header: 'Descripción', accessorKey: 'description'},
    { header: 'Asignación', accessorKey: 'asignee'},
    { header: 'Borrar', cell: info => <DeleteButton onDelete={(e) => handleDelete(e,info)}/>}
  ])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  function handleDelete(e,info) {
    e.stopPropagation();
    setTasks((prev) => prev.filter(task => task._id !== info.row.original._id))

    fetch(`${import.meta.env.VITE_SERVER_URL}/${info.row.original._id}`,{
      method: 'DELETE'
    })
      .then(res => {
        if(!res.ok) {
          throw new Error(res.statusText);
        }
      })
      .catch((error) => console.log(error))
    
  }

  function handleRowClick(row) {
    setSelectedTask(row.original);
  }

  function handleSave(updatedTask) {
    setTasks((prev) => prev.map((t) => {
      if(t._id == updatedTask._id) {
        return updatedTask;
      }
      else {
        return t
      }
    }))

    fetch(`${import.meta.env.VITE_SERVER_URL}/${updatedTask._id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTask),
    })
      .then(res => {
        if(!res.ok) {
          throw new Error(res.status)
        }
      })
      .then(data => console.log("Got data: ", data))
      .catch(error => console.error(error));
    
    setSelectedTask(null)
  }

 
  return (
    <>
      <table className="task-table">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            
            <tr onClick={() => handleRowClick(row)} key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedTask && (
        <EditTaskForm
          task={selectedTask}
          onSave={handleSave}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </>
  )
}