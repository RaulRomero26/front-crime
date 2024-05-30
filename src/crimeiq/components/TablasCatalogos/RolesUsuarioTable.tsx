import DataTable, { TableColumn } from 'react-data-table-component';
import { TextFilterComponent } from "../Filters/Filters";
import { EditRolesUsuarioForm } from '../FormsEdicionCatalogos/EditRolesUsuarioForm';
import { useMemo, useState } from "react";
import { useMutationCatalogo } from '../../hooks/Catalogos/useMutationCatalogo';


interface DataRow {
    _id: { $oid: string };
  	role: string;
    activo?: boolean;
  }

interface SubHeaderFilter {
  value: string;
  setter: (value: string) => void;
  component: React.FC<any>;
}
export const RolesUsuarioTable = ({data}:any) => {

  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [filterTextRol, setFilterTextRol] = useState('');
  const [editRow, setEditRow] = useState <DataRow | null>(null);

  const [isNewRegister, setIsNewRegister] = useState<boolean>(false);
  const mutationCatalogo = useMutationCatalogo();

  const filters: Record<string, SubHeaderFilter> = {
    role: {
      value: filterTextRol,
      setter: setFilterTextRol,
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
    setEditRow({ _id: { $oid: '' }, role: '',activo:true }); // Puedes establecer esto a los valores predeterminados para un nuevo registro
    setIsNewRegister(true);
  };
  const handleDeleteRow = (row: DataRow) => {
    mutationCatalogo.mutate({ ...row, activo: !row.activo, catalogo: 'roles-usuarios'});
  };

const subHeaderComponent = useMemo(() => {
  return (
    <>
      <div className="row">
        <div className="col">
          <button className="btn btn-primary me-2" onClick={handleNewRegister}>
            Agregar Rol
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
}, [filterTextRol, resetPaginationToggle]);

  const columns: TableColumn<DataRow>[] = [
    {
      name: 'Id',
      selector: (row: DataRow) => row._id.$oid,
    },
    {
      name: 'Rol',
      selector: (row: DataRow) => row.role,
    },
    {
      name: 'Estado',
      selector: (row: DataRow) => (row.activo) ? 'Activo' : 'Inactivo',
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
      {editRow && <EditRolesUsuarioForm isNewRegister={isNewRegister} rowData={editRow} onSave={setEditRow} />}
      <DataTable
        title="Roles de Usuario" 
        columns={columns} 
        data={filteredItems} 
        pagination
        subHeader
        subHeaderComponent={subHeaderComponent}
      />
    </>
    ); 
  }
