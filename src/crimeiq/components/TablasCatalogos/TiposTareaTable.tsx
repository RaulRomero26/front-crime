import DataTable, { TableColumn } from 'react-data-table-component';
import { TextFilterComponent } from "../Filters/Filters";
import { useMemo, useState } from "react";


interface DataRow {
    _id: { $oid: string };
  	actividad: string;
  }

interface SubHeaderFilter {
  value: string;
  setter: (value: string) => void;
  component: React.FC<any>;
}
export const TiposTareaTable = ({data}:any) => {
  
    console.log('entre al componente de tipos tarea')
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [filterTextActividad, setFilterTextActividad] = useState('');

  const filters: Record<string, SubHeaderFilter> = {
    role: {
      value: filterTextActividad,
      setter: setFilterTextActividad,
      component: TextFilterComponent,
    },
  };
  
  let filteredItems: DataRow[] = [];
  
  if (data ) {
    filteredItems = data.filter((item: DataRow) =>
      (Object.keys(filters) as Array<keyof DataRow>).every(key =>
        filters[key].value === '' || String(item[key]).toLowerCase().includes(filters[key].value.toLowerCase())
      )
    );
  }


const subHeaderComponent = useMemo(() => {
  return (
    <>
      <div className="row">
        
          {Object.keys(filters).map(key => {
            const FilterComponent = filters[key].component;
            return (
              <div className="col">
              <FilterComponent
                key={key}
                id={`filtro_${key}`}
                onFilter={(e:any) => filters[key].setter(e.target.value)}
                onClear={() => {
                  if (filters[key].value) {
                    setResetPaginationToggle(!resetPaginationToggle);
                    filters[key].setter("");
                  }
                }}
                filterText={filters[key].value}
                placeholder={`Filtrar ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                />
              </div>
            );
          })}
      </div>

    </>
  );
}, [filterTextActividad, resetPaginationToggle]);

const columns: TableColumn<DataRow>[] = [
    {
            name: 'Id',
            selector: (row: DataRow) => row._id.$oid,
    },
    {
        name: 'Actividad',
        selector: (row: DataRow) => row.actividad,
    },
    {
        name: 'Acciones',
        cell: (row: DataRow) => (
            <div>
                <button className='btn btn-warning me-2'>Editar</button>
                <button className='btn btn-danger'>Eliminar</button>
            </div>
        ),
    },
];

  return (
      <DataTable
        title="Tipos de actividad" 
        columns={columns} 
        data={filteredItems} 
        pagination
        subHeader
        subHeaderComponent={subHeaderComponent}
      />
    ); 
  }
