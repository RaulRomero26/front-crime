import { useGetAllQR } from "../../hooks/QR/useGetAllQR";
import DataTable, { TableColumn } from 'react-data-table-component';
import { TextFilterComponent } from "../Filters/Filters";
import { useMemo, useState } from "react";

interface DataRow {
	nombre: string;
	ubicacion: string;
	lat: number;
  log: number;
  observaciones: string;
  nombreArchivo: string;
  ruta_imagen_qr: string;
}

interface SubHeaderFilter {
  value: string;
  setter: (value: string) => void;
  component: React.FC<any>;
}
export const QRTable = () => {

  const [filterText, setFilterText] = useState('');
  const [filterTextUbicacion, setFilterTextUbicacion] = useState('');
  const [filterTextLat, setFilterTextLat] = useState('');
  const [filterTextLog, setFilterTextLog] = useState('');
  const [filterTextObservaciones, setFilterTextObservaciones] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);


  const { isLoading, qrs, isFetching } = useGetAllQR({perPageReq: 1000});

  if(!isFetching && !isLoading) {
    console.log(qrs.qrs[0]);//Asi accedemos a la data que nos regresa el endpoint
  }

  const filters: Record<string, SubHeaderFilter> = {
    nombre: {
      value: filterText,
      setter: setFilterText,
      component: TextFilterComponent,
    },
    ubicacion: {
      value: filterTextUbicacion,
      setter: setFilterTextUbicacion,
      component: TextFilterComponent,
    },
    lat: {
      value: filterTextLat,
      setter: setFilterTextLat,
      component: TextFilterComponent,
    },
    log: {
      value: filterTextLog,
      setter: setFilterTextLog,
      component: TextFilterComponent,
    },
    observaciones: {
      value: filterTextObservaciones,
      setter: setFilterTextObservaciones,
      component: TextFilterComponent,
    }    
  };
  
  let filteredItems: DataRow[] = [];
  
  if (qrs.qrs && qrs.qrs[0]) {
    filteredItems = qrs.qrs[0].data.filter((item: DataRow) =>
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
}, [filterText, filterTextUbicacion, filterTextLat, filterTextLog, filterTextObservaciones]);

  const columns: TableColumn<DataRow>[] = [
    {
      name: 'Nombre',
      selector: (row: DataRow) => row.nombre,
    },
    {
      name: 'Ubicacion',
      selector: (row: DataRow) => row.ubicacion,
    },
    {
      name: 'Latitud',
      selector: (row: DataRow) => row.lat,
    },
    {
      name: 'Longitud',
      selector: (row: DataRow) => row.log,
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
      name: 'Descargar Imagen',
      selector: (row: DataRow) => row.ruta_imagen_qr,
      cell: (row: DataRow) => (
        <a href={row.ruta_imagen_qr} download target="_blank">
          Descargar
        </a>
      ),
    },
  ];

  return (
    (!isFetching && !isLoading) && (
    
        <DataTable
        title="QRs Generados" 
          columns={columns} 
          data={filteredItems} 
          pagination
          subHeader
          subHeaderComponent={subHeaderComponent}
        />
     
      )
    ); 
  }
