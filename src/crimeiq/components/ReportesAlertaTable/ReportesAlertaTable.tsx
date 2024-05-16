import DataTable, { TableColumn } from 'react-data-table-component';
import { TextFilterComponent } from "../Filters/Filters";
import { useMemo, useState } from "react";
import { useGetAllReportesIncidencia } from "../../hooks/ReportesIncidencia/useGetAllReportesIncidencia";
import { useGetAllAlertas } from '../../hooks/Alertas/useGetAllAlertas';


interface DataRow {
  Usuario: string;
  fecha: string;
  hora: string;
  latitud: number;
  longitud: number;
}

interface SubHeaderFilter {
  value: string;
  setter: (value: string) => void;
  component: React.FC<any>;
}
export const ReportesAlertaTable = () => {

    const [filterTextUsuario, setFilterTextUsuario] = useState('');
    const [filterTextFecha, setFilterTextFecha] = useState('');
    const [filterTextHora, setFilterTextHora] = useState('');
    const [filterTextLatitud, setFilterTextLatitud] = useState('');
    const [filterTextLongitud, setFilterTextLongitud] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);


  const { isLoading, alertas, isFetching } = useGetAllAlertas({perPageReq: 1000});

  if(!isFetching && !isLoading) {
    console.log(alertas.data);//Asi accedemos a la data que nos regresa el endpoint
  }

  const filters: Record<string, SubHeaderFilter> = {
    Usuario: {
      value: filterTextUsuario,
      setter: setFilterTextUsuario,
      component: TextFilterComponent,
    },
    fecha: {
      value: filterTextFecha,
      setter: setFilterTextFecha,
      component: TextFilterComponent,
    },
    hora: {
      value: filterTextHora,
      setter: setFilterTextHora,
      component: TextFilterComponent,
    },
    latitud: {
      value: filterTextLatitud,
      setter: setFilterTextLatitud,
      component: TextFilterComponent,
    },
    longitud: {
      value: filterTextLongitud,
      setter: setFilterTextLongitud,
      component: TextFilterComponent,
    }
  };
  
  let filteredItems: DataRow[] = [];
  
  if (alertas.data ) {
    filteredItems = alertas.data.filter((item: DataRow) =>
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
}, [filterTextUsuario, filterTextFecha, filterTextHora, filterTextLatitud, filterTextLongitud, resetPaginationToggle]);

  const columns: TableColumn<DataRow>[] = [
    {
      name: 'Usuario',
      selector: (row: DataRow) => row.Usuario,
    },
    {
    name: 'Fecha',
    selector: (row: DataRow) => row.fecha,
    },
    {
    name: 'Hora',
    selector: (row: DataRow) => row.hora,
    },
    {
    name: 'Latitud',
    selector: (row: DataRow) => row.latitud,
    },
    {
    name: 'Longitud',
    selector: (row: DataRow) => row.longitud,
    }
  ];

  return (
    (!isFetching && !isLoading) && (
    
        <DataTable
        title="Reportes Botón de Alerta" 
          columns={columns} 
          data={filteredItems} 
          pagination
          subHeader
          subHeaderComponent={subHeaderComponent}
        />
     
      )
    ); 
  }
