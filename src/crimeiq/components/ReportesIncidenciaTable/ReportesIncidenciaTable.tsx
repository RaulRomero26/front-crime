import DataTable, { TableColumn } from 'react-data-table-component';
import { TextFilterComponent } from "../Filters/Filters";
import { useMemo, useState } from "react";
import { useGetAllReportesIncidencia } from "../../hooks/ReportesIncidencia/useGetAllReportesIncidencia";


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
export const ReportesIncidenciaTable = () => {

  const [filterTextTitulo, setFilterTextTitulo] = useState('');
  const [filterTextDescripcion, setFilterTextDescripcion] = useState('');
  const [filterTextFechaHoraVencimiento, setFilterTextFechaHoraVencimiento] = useState('');
  const [filterTextEstado, setFilterTextEstado] = useState('');
  const [filterTextServicio, setFilterTextServicio] = useState('');
  const [filterTextUsuarioAsignado, setFilterTextUsuarioAsignado] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);


  const { isLoading, reportes, isFetching } = useGetAllReportesIncidencia({perPageReq: 1000});

  if(!isFetching && !isLoading) {
    console.log(reportes.data);//Asi accedemos a la data que nos regresa el endpoint
  }

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
  
  if (reportes.data && reportes.data[0]) {
    filteredItems = reportes.data.filter((item: DataRow) =>
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
    
        <DataTable
        title="Reportes de Incidencia" 
          columns={columns} 
          data={filteredItems} 
          pagination
          subHeader
          subHeaderComponent={subHeaderComponent}
        />
     
      )
    ); 
  }
