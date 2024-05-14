
import { useReactTable,  
        getCoreRowModel,
        HeaderContext,  
        createColumnHelper,
        flexRender, 
        Column, 
        AccessorKeyColumnDefBase,
        IdIdentifier} from '@tanstack/react-table';


        type ColumnType<T extends object> = (AccessorKeyColumnDefBase<T, number> & Partial<IdIdentifier<T, number>> & { footer: (props: HeaderContext<T, number>) => any }) | (AccessorKeyColumnDefBase<T, number> & Partial<IdIdentifier<T, number>> & { footer: (props: HeaderContext<T, number>) => any });

interface TableProps<T extends object> {
    columnas: ColumnType<T>[];
    data: T[];
}

export function Table<T extends object>({ columnas, data }: TableProps<T>) {
    const table = useReactTable<T>({
        data,
        columns: columnas,
        getCoreRowModel: getCoreRowModel(),
      })
    return (
        <div className="p-2">
        <table>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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
          <tfoot>
            {table.getFooterGroups().map(footerGroup => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
        <div className="h-4" />
      </div>
    );
}