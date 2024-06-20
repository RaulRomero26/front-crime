import DataTable, { TableColumn } from 'react-data-table-component';
import { TextFilterComponent } from "../Filters/Filters";
import { useMemo, useState } from "react";
import { useGetAllTareasRecurrentes } from "../../hooks/Tareas/useGetAllTareasRecurrentes";
import { useMutationTarea } from '../../hooks/Tareas/useMutationTarea';


interface DataRow {
	titulo: string;
    descripcion: string;
    estado: string;
    no_servicio: string;
    activa: boolean;
}

interface SubHeaderFilter {
  value: string;
  setter: (value: string) => void;
  component: React.FC<any>;
}
export const TareasRecurrentesTable = () => {

  const [filterTextTitulo, setFilterTextTitulo] = useState('');
  const [filterTextDescripcion, setFilterTextDescripcion] = useState('');
  const [filterTextEstado, setFilterTextEstado] = useState('');
  const [filterTextServicio, setFilterTextServicio] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const mutationTarea = useMutationTarea();

  const { isLoading, tareas, isFetching } = useGetAllTareasRecurrentes({perPageReq: 1000});

  if(!isFetching && !isLoading) {
    console.log(tareas.data);//Asi accedemos a la data que nos regresa el endpoint
  }

  const handleDeleteRow = (row: DataRow) => {
    mutationTarea.mutate({ ...row, activa: !row.activa});
  };

  const filters: Record<string, SubHeaderFilter> = {
    titulo: {
      value: filterTextTitulo,
      setter: setFilterTextTitulo,
      component: TextFilterComponent,
    },
    descripcion: {
      value: filterTextDescripcion,
      setter: setFilterTextDescripcion,
      component: TextFilterComponent,
    },
    estado: {
      value: filterTextEstado,
      setter: setFilterTextEstado,
      component: TextFilterComponent,
    },
    no_servicio: {
      value: filterTextServicio,
      setter: setFilterTextServicio,
      component: TextFilterComponent,
    }
  };
  
  let filteredItems: DataRow[] = [];
  
  if (tareas.data && tareas.data[0]) {
    filteredItems = tareas.data.filter((item: DataRow) =>
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
              <div className="col-md-2">
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
}, [filterTextTitulo, filterTextDescripcion, filterTextEstado, filterTextServicio, resetPaginationToggle]);

  const columns: TableColumn<DataRow>[] = [
    {
      name: 'Titulo',
      selector: (row: DataRow) => row.titulo,
    },
    {
      name: 'Descripción',
      selector: (row: DataRow) => row.descripcion,
    },
    {
      name: 'Estado',
      selector: (row: DataRow) => row.estado,
    },
    {
      name: 'No. Servicio',
      selector: (row: DataRow) => row.no_servicio,
    },
    {
        name: 'Activa',
        selector: (row: DataRow) => (row.activa) ? 'Activo' : 'Inactivo',
        cell: (row) => (
            <span style={{ 
                fontWeight: 'bold', 
                color: row.activa ? 'green' : 'red',
                fontSize: '18px'
            }}>
                {row.activa ? 'Activo' : 'Inactivo'}
            </span>
        )
    },
    {
        name: 'Acciones',
        cell: (row: DataRow) => (
            <div>
                <button className={row.activa ? 'btn btn-danger' : 'btn btn-success'} onClick={() => handleDeleteRow(row)}>{(row.activa) ? 'Inactivar' : 'Activar'}</button>
            </div>
        ),
    },
  ];

  return (
    (!isFetching && !isLoading) && (
    
        <DataTable
        title="Tareas Recurrentes" 
          columns={columns} 
          data={filteredItems} 
          pagination
          subHeader
          subHeaderComponent={subHeaderComponent}
        />
     
      )
    ); 
  }
