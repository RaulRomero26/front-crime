import DataTable, { TableColumn } from 'react-data-table-component';
import { TextFilterComponent } from "../Filters/Filters";
import { useMemo, useState } from "react";
import { useGetAllReportesIncidente } from '../../hooks/ReportesIncidencia/useGetAllReportesIncidente';


interface DataRow {
  fecha: string;
  hora: string;
  descripcion: string;
  nivelGravedad: string;
  tipoIncidente: string;
  testigos: string;
  accionesVigilante: string;
  notaSupervisor: string;
  estadoIncidente: string;
  infoAdicional: string;
  Nom_Reportante: string;
}

interface SubHeaderFilter {
  value: string;
  setter: (value: string) => void;
  component: React.FC<any>;
}
export const ReportesIncidenteTable = () => {

    const [filterTextfecha, setFilterTextfecha] = useState('');
    const [filterTexthora, setFilterTexthora] = useState('');
    const [filterTextdescripcion, setFilterTextdescripcion] = useState('');
    const [filterTextnivelGravedad, setFilterTextnivelGravedad] = useState('');
    const [filterTexttipoIncidente, setFilterTexttipoIncidente] = useState('');
    const [filterTexttestigos, setFilterTexttestigos] = useState('');
    const [filterTextaccionesVigilante, setFilterTextaccionesVigilante] = useState('');
    const [filterTextnotaSupervisor, setFilterTextnotaSupervisor] = useState('');
    const [filterTextestadoIncidente, setFilterTextestadoIncidente] = useState('');
    const [filterTextinfoAdicional, setFilterTextinfoAdicional] = useState('');
    const [filterTextNom_Reportante, setFilterTextNom_Reportante] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);


  const { isLoading, reportes, isFetching } = useGetAllReportesIncidente({perPageReq: 1000});

  if(!isFetching && !isLoading) {
    console.log(reportes.data);//Asi accedemos a la data que nos regresa el endpoint
  }

  const filters: Record<string, SubHeaderFilter> = {
    fecha: {
      value: filterTextfecha,
      setter: setFilterTextfecha,
      component: TextFilterComponent,
    },
    hora: {
      value: filterTexthora,
      setter: setFilterTexthora,
      component: TextFilterComponent,
    },
    descripcion: {
      value: filterTextdescripcion,
      setter: setFilterTextdescripcion,
      component: TextFilterComponent,
    },
    nivelGravedad: {
      value: filterTextnivelGravedad,
      setter: setFilterTextnivelGravedad,
      component: TextFilterComponent,
    },
    tipoIncidente: {
      value: filterTexttipoIncidente,
      setter: setFilterTexttipoIncidente,
      component: TextFilterComponent,
    },
    testigos: {
      value: filterTexttestigos,
      setter: setFilterTexttestigos,
      component: TextFilterComponent,
    },
    accionesVigilante: {
      value: filterTextaccionesVigilante,
      setter: setFilterTextaccionesVigilante,
      component: TextFilterComponent,
    },
    notaSupervisor: {
      value: filterTextnotaSupervisor,
      setter: setFilterTextnotaSupervisor,
      component: TextFilterComponent,
    },
    estadoIncidente: {
      value: filterTextestadoIncidente,
      setter: setFilterTextestadoIncidente,
      component: TextFilterComponent,
    },
    infoAdicional: {
      value: filterTextinfoAdicional,
      setter: setFilterTextinfoAdicional,
      component: TextFilterComponent,
    },
    Nom_Reportante: {
      value: filterTextNom_Reportante,
      setter: setFilterTextNom_Reportante,
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
}, [filterTextfecha, filterTexthora, filterTextdescripcion, filterTextnivelGravedad, filterTexttipoIncidente, filterTexttestigos, filterTextaccionesVigilante, filterTextnotaSupervisor, filterTextestadoIncidente, filterTextinfoAdicional, filterTextNom_Reportante, resetPaginationToggle]);

  const columns: TableColumn<DataRow>[] = [
    {
      name: 'Fecha',
      selector: (row: DataRow) => row.fecha,
    },
    {
      name: 'Hora',
      selector: (row: DataRow) => row.hora,
    },
    {
      name: 'Descripcion',
      selector: (row: DataRow) => row.descripcion,
    },
    {
      name: 'Nivel de Gravedad',
      selector: (row: DataRow) => row.nivelGravedad,
    },
    {
      name: 'Tipo de Incidente',
      selector: (row: DataRow) => row.tipoIncidente,
    },
    {
      name: 'Testigos',
      selector: (row: DataRow) => row.testigos,
    },
    {
      name: 'Acciones del Vigilante',
      selector: (row: DataRow) => row.accionesVigilante,
    },
    {
      name: 'Nota del Supervisor',
      selector: (row: DataRow) => row.notaSupervisor,
    },
    {
      name: 'Estado del Incidente',
      selector: (row: DataRow) => row.estadoIncidente,
    },
    {
      name: 'Información Adicional',
      selector: (row: DataRow) => row.infoAdicional,
    },
    {
      name: 'Nombre del Reportante',
      selector: (row: DataRow) => row.Nom_Reportante,
    }

  ];

  return (
    (!isFetching && !isLoading) && (
    
        <DataTable
        title="Reportes Incidentes" 
          columns={columns} 
          data={filteredItems} 
          pagination
          subHeader
          subHeaderComponent={subHeaderComponent}
        />
     
      )
    ); 
  }
