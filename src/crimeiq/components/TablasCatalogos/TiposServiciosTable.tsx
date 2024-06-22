import DataTable, { TableColumn } from 'react-data-table-component';
import { TextFilterComponent } from "../Filters/Filters";
import { useMemo, useState } from "react";
import { useMutationCatalogo } from '../../hooks/Catalogos/useMutationCatalogo';
import { EditTiposServicioForm } from '../FormsEdicionCatalogos/EditTiposServiciosForm';


interface DataRow {
    _id: { $oid: string };
  	servicio: string;
    direccion: string;
    activo?: boolean;
  }

interface SubHeaderFilter {
  value: string;
  setter: (value: string) => void;
  component: React.FC<any>;
}
export const TiposServiciosTable = ({data}:any) => {

  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [filterTextServicio, setFilterTextServicio] = useState('');
  const [filterTextDireccion, setFilterTextDireccion] = useState('');
  const [editRow, setEditRow] = useState <DataRow | null>(null);

  const [isNewRegister, setIsNewRegister] = useState<boolean>(false);
  const mutationCatalogo = useMutationCatalogo();

  const filters: Record<string, SubHeaderFilter> = {
    servicio: {
      value: filterTextServicio,
      setter: setFilterTextServicio,
      component: TextFilterComponent,
    },
    direccion: {
      value: filterTextDireccion,
      setter: setFilterTextDireccion,
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
  const handleNewRegister = () => {
    setEditRow({ _id: { $oid: '' }, servicio: '',direccion: '',activo:true }); // Puedes establecer esto a los valores predeterminados para un nuevo registro
    setIsNewRegister(true);
  };
  const handleDeleteRow = (row: DataRow) => {
    mutationCatalogo.mutate({ ...row, activo: !row.activo, catalogo: 'servicios'});
  };

const subHeaderComponent = useMemo(() => {
  return (
    <>
      <div className="row">
        <div className="col">
          <button className="btn btn-primary me-2" onClick={handleNewRegister}>
            Agregar Servicio
          </button>
        </div>
      </div>

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
}, [filterTextServicio,filterTextDireccion, resetPaginationToggle]);

  const columns: TableColumn<DataRow>[] = [
    {
      name: 'Id',
      selector: (row: DataRow) => row._id.$oid,
    },
    {
      name: 'Servicio',
      selector: (row: DataRow) => row.servicio,
    },
    {
      name: 'Direccion',
      selector: (row: DataRow) => row.direccion,
    },
    {
      name: 'Estado',
      selector: (row: DataRow) => (row.activo) ? 'Activo' : 'Inactivo',
      cell: (row) => (
        <span style={{ 
            fontWeight: 'bold', 
            color: row.activo ? 'green' : 'red',
            fontSize: '18px'
        }}>
            {row.activo ? 'Activo' : 'Inactivo'}
        </span>)
    },
    {
      name: 'Acciones',
      cell: (row: DataRow) => (
          <div>
              <button className='btn btn-warning me-2' onClick={() => setEditRow(row)}>Editar</button>
              <button className={row.activo ? 'btn btn-danger' : 'btn btn-success'} onClick={() => handleDeleteRow(row)}>{(row.activo) ? 'Inactivar' : 'Activar'}</button>
          </div>
      ),
  },
  ];

  return (
    <>
      {editRow && <EditTiposServicioForm isNewRegister={isNewRegister} rowData={editRow} onSave={setEditRow} />}
      <DataTable
        title="Servicios Disponibles" 
        columns={columns} 
        data={filteredItems} 
        pagination
        subHeader
        subHeaderComponent={subHeaderComponent}
      />
    </>
    ); 
  }
