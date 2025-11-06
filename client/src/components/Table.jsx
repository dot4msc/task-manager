import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import { useMemo } from 'react'

import "./Table.css"
export default function Table({data}) {

  const columns = useMemo(() => [
    { header: '#', cell: info => info.row.index + 1},
    { header: 'Estatus', accessorFn: row => row.status.percentage},
    { header: 'Descripción', accessorKey: 'description'},
    { header: 'Asignación', accessorKey: 'asignee'},
  ])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
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
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}