import DataTable, { TableColumn } from 'react-data-table-component';
import { TextFilterComponent } from "../Filters/Filters";
import { useCallback, useMemo, useState } from "react";
import { useGetAllTareas } from "../../hooks/Tareas/useGetAllTareas";


interface DataRow {
	titulo: string;
    descripcion: string;
    fecha_hora_vencimiento: string;
    estado: string;
    no_servicio: string;
    usu_asignado: string;
}

interface SubHeaderFilter {
  value: string;
  setter: (value: string) => void;
  component: React.FC<any>;
}
export const TareasTable = () => {

  const [filterTextTitulo, setFilterTextTitulo] = useState('');
  const [filterTextDescripcion, setFilterTextDescripcion] = useState('');
  const [filterTextFechaHoraVencimiento, setFilterTextFechaHoraVencimiento] = useState('');
  const [filterTextEstado, setFilterTextEstado] = useState('');
  const [filterTextServicio, setFilterTextServicio] = useState('');
  const [filterTextUsuarioAsignado, setFilterTextUsuarioAsignado] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [refreshKey, _setRefreshKey] = useState(0);


  const { isLoading, tareas, isFetching,handleRefresh } = useGetAllTareas({perPageReq: 1000});

  if(!isFetching && !isLoading) {
    console.log(tareas.data);//Asi accedemos a la data que nos regresa el endpoint
  }

  const handleRefreshButtonClick = useCallback(() => {
    handleRefresh();
  }, [handleRefresh]);

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
    fecha_hora_vencimiento: {
      value: filterTextFechaHoraVencimiento,
      setter: setFilterTextFechaHoraVencimiento,
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
    },
    usu_asignado: {
        value: filterTextUsuarioAsignado,
        setter: setFilterTextUsuarioAsignado,
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
}, [filterTextTitulo, filterTextDescripcion, filterTextFechaHoraVencimiento, filterTextEstado, filterTextServicio, filterTextUsuarioAsignado, resetPaginationToggle]);

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
      name: 'Fecha Hora Vencimiento',
      selector: (row: DataRow) => row.fecha_hora_vencimiento,
    },
    {
      name: 'Estado',
      selector: (row: DataRow) => row.estado,
      cell: (row) => (
        <span style={{ 
            fontWeight: 'bold', 
            color: row.estado =='Pendiente' ? 'red' : 'green',
            fontSize: '18px'
        }}>
            {row.estado}
        </span>
    )
    },
    {
      name: 'No. Servicio',
      selector: (row: DataRow) => row.no_servicio,
    },
    {
      name: 'Usuario Asignado', 
      selector: (row: DataRow) => row.usu_asignado,
    },
  ];

  return (
    (!isFetching && !isLoading) && (
      <div className="row">
         <div className="col-md-12 my-2">
            <button className="btn btn-primary" onClick={handleRefreshButtonClick}>
              Actualizar
            </button>
          </div>
          <div className="col">
          <DataTable
            title="Tareas Asignadas" 
              columns={columns} 
              data={filteredItems} 
              pagination
              subHeader
              subHeaderComponent={subHeaderComponent}
              key={`table-refresh-${refreshKey}`}
            />
          </div>
      </div>
     
        
     
      )
    ); 
  }
