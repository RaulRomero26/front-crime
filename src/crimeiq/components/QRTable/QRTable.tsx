import { useGetAllQR } from "../../hooks/QR/useGetAllQR";
import DataTable, { TableColumn } from 'react-data-table-component';

interface DataRow {
	nombre: string;
	ubicacion: string;
	lat: number;
  log: number;
  observaciones: string;
  nombreArchivo: string;
  ruta_imagen_qr: string;
}

export const QRTable = () => {

  const { isLoading, qrs, isFetching } = useGetAllQR({perPageReq: 1000});

  if(!isFetching && !isLoading) {
    console.log(qrs.qrs[0]);//Asi accedemos a la data que nos regresa el endpoint
  }

  const columns: TableColumn<DataRow>[] = [
    {
      name: 'Nombre',
      selector: row => row.nombre,
    },
    {
      name: 'Ubicacion',
      selector: row => row.ubicacion,
    },
    {
      name: 'Latitud',
      selector: row => row.lat,
    },
    {
      name: 'Longitud',
      selector: row => row.log,
    },
    {
      name: 'Observaciones',
      selector: row => row.observaciones,
    },
    {
      name: 'Nombre Archivo',
      selector: row => row.nombreArchivo,
    },
    {
      name: 'Ruta Imagen QR',
      selector: row => row.ruta_imagen_qr,
    },
  ];

  return (
    (!isFetching && !isLoading) && (
    
        <DataTable columns={columns} data={qrs.qrs[0].data} />
     
      )
    ); 
  }
