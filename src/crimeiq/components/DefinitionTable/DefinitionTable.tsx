
import {
    createColumnHelper,
  } from '@tanstack/react-table'
import { Table } from '../Table/Table';


interface DefinitionTableProps {
    data: any;
    lugar: string;
}

export interface RegistroQR {
    id: string;
    nombre: string;
    ubicacion: string
    lat: number;
    log: number;
    observaciones: string;
    nombreArchivo: string;
    ruta_imagen_qr: string;
}



export const DefinitionTable = ({data,lugar}:DefinitionTableProps) => {
    console.log(data,lugar)

    let columns = [];
    switch (lugar) {
        case 'all-qrs':
            let columnHelper = createColumnHelper<RegistroQR>()

            columns = [
              columnHelper.accessor('id', {
                cell: info => info.getValue(),
              }),
              columnHelper.accessor('nombre', {
                header: () => 'Nombre',
                cell: info => info.renderValue(),
              }),
              columnHelper.accessor('lat', {
                header: () => 'Latitud',
                cell: info => info.renderValue(),
              }),
              columnHelper.accessor('log', {
                header: () => 'Longitud',
                cell: info => info.renderValue(),
              }),
              columnHelper.accessor('ubicacion', {
                header: () => 'Ubicacion',
              }),
              columnHelper.accessor('observaciones', {
                header: 'Descripcion',
              }),
              columnHelper.accessor('ruta_imagen_qr', {
                header: 'Enlace QR',
              }),
            ]
            return <Table columnas={columns} data={data} />
            break;
        default:
            return null;
    }
}