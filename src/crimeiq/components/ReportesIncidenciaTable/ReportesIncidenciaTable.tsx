import DataTable, { TableColumn } from 'react-data-table-component';
import { TextFilterComponent } from "../Filters/Filters";
import { useMemo, useState } from "react";
import { useGetAllReportesIncidencia } from "../../hooks/ReportesIncidencia/useGetAllReportesIncidencia";


interface DataRow {
  nombre: string;
  ubicacion: string;
  observaciones: string;
  nombreArchivo: string;
  fechaEscaneo: string;
  horaEscaneo: string;
  Nom_reportante: string;
  serv_asignado: string;
}

interface SubHeaderFilter {
  value: string;
  setter: (value: string) => void;
  component: React.FC<any>;
}
export const ReportesIncidenciaTable = () => {

  const [filterTextPuntoVigilancia, setFilterTextPuntoVigilancia] = useState('');
  const [filterTextUbicacion, setFilterTextUbicacion] = useState('');
  const [filterTextObservaciones, setFilterTextObservaciones] = useState('');
  const [filterTextNombreArchivo, setFilterTextNombreArchivo] = useState('');
  const [filterTextFechaEscaneo, setFilterTextFechaEscaneo] = useState('');
  const [filterTextHoraEscaneo, setFilterTextHoraEscaneo] = useState('');
  const [filterTextUsuario, setFilterTextUsuario] = useState('');
  const [filterTextServAsignado, setFilterTextServAsignado] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);


  const { isLoading, reportes, isFetching } = useGetAllReportesIncidencia({perPageReq: 1000});

  if(!isFetching && !isLoading) {
    console.log(reportes.data);//Asi accedemos a la data que nos regresa el endpoint
  }

  const filters: Record<string, SubHeaderFilter> = {
    nombre: {
      value: filterTextPuntoVigilancia,
      setter: setFilterTextPuntoVigilancia,
      component: TextFilterComponent,
    },
    ubicacion: {
      value: filterTextUbicacion,
      setter: setFilterTextUbicacion,
      component: TextFilterComponent,
    },
    observaciones: {
      value: filterTextObservaciones,
      setter: setFilterTextObservaciones,
      component: TextFilterComponent,
    },
    nombreArchivo: {
      value: filterTextNombreArchivo,
      setter: setFilterTextNombreArchivo,
      component: TextFilterComponent,
    },
    fechaEscaneo: {
      value: filterTextFechaEscaneo,
      setter: setFilterTextFechaEscaneo,
      component: TextFilterComponent,
    },
    horaEscaneo: {
        value: filterTextHoraEscaneo,
        setter: setFilterTextHoraEscaneo,
        component: TextFilterComponent,
      },     
    Nom_reportante: {
      value: filterTextUsuario,
      setter: setFilterTextUsuario,
      component: TextFilterComponent,
    },   
    serv_asignado: {
      value: filterTextServAsignado,
      setter: setFilterTextServAsignado,
      component: TextFilterComponent,
    }    
  };
  
  let filteredItems: DataRow[] = [];
  
  if (reportes.data ) {
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
}, [filterTextPuntoVigilancia, filterTextUbicacion, filterTextObservaciones, filterTextNombreArchivo, filterTextFechaEscaneo, filterTextHoraEscaneo, filterTextUsuario, filterTextServAsignado, resetPaginationToggle]);

  const columns: TableColumn<DataRow>[] = [
    {
      name: 'Punto de Vigilancia',
      selector: (row: DataRow) => row.nombre,
    },
    {
      name: 'Ubicación',
      selector: (row: DataRow) => row.ubicacion,
    },
    {
      name: 'Observaciones',
      selector: (row: DataRow) => row.observaciones,
    },
    {
      name: 'Nombre Archivo',
      selector: (row: DataRow) => row.nombreArchivo,
    },
    {
      name: 'Fecha Escaneo',
      selector: (row: DataRow) => row.fechaEscaneo,
    },
    {
      name: 'Hora Escaneo',
      selector: (row: DataRow) => row.horaEscaneo,
    },
    {
      name: 'Usuario',
      selector: (row: DataRow) => row.Nom_reportante,
    },
    {
      name: 'Servicio Asignado',
      selector: (row: DataRow) => row.serv_asignado,
    }
  ];

  return (
    (!isFetching && !isLoading) && (
    
        <DataTable
        title="Reportes Escaneo de QR's" 
          columns={columns} 
          data={filteredItems} 
          pagination
          subHeader
          subHeaderComponent={subHeaderComponent}
        />
     
      )
    ); 
  }
