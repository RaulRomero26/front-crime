import DataTable, { TableColumn } from 'react-data-table-component';
import { TextFilterComponent } from "../Filters/Filters";
import { useMemo, useState } from "react";
import { useGetAllUsuarios } from "../../hooks/Usuarios/useGetAllUsuarios";


interface DataRow {
	Nombre: string;
    Ap_materno: string;
    Ap_paterno: string;
    username: string;
    No_tel: string;
    Foto: string;
}

interface SubHeaderFilter {
  value: string;
  setter: (value: string) => void;
  component: React.FC<any>;
}
export const UsuariosTable = () => {

    const [filterTextNombre, setFilterTextNombre] = useState('');
    const [filterTextAp_materno, setFilterTextAp_materno] = useState('');
    const [filterTextAp_paterno, setFilterTextAp_paterno] = useState('');
    const [filterTextUsername, setFilterTextUsername] = useState('');
    const [filterTextNo_tel, setFilterTextNo_tel] = useState('');
    
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);


  const { isLoading, usuarios, isFetching } = useGetAllUsuarios({perPageReq: 1000});

  if(!isFetching && !isLoading) {
    console.log(usuarios.data);//Asi accedemos a la data que nos regresa el endpoint
  }

  const filters: Record<string, SubHeaderFilter> = {
    Nombre: {
      value: filterTextNombre,
      setter: setFilterTextNombre,
      component: TextFilterComponent,
    },
    Ap_materno: {
      value: filterTextAp_materno,
      setter: setFilterTextAp_materno,
      component: TextFilterComponent,
    },
    Ap_paterno: {
      value: filterTextAp_paterno,
      setter: setFilterTextAp_paterno,
      component: TextFilterComponent,
    },
    username: {
      value: filterTextUsername,
      setter: setFilterTextUsername,
      component: TextFilterComponent,
    },
    No_tel: {
      value: filterTextNo_tel,
      setter: setFilterTextNo_tel,
      component: TextFilterComponent,
    },

  };
  
  let filteredItems: DataRow[] = [];
  
  if (usuarios.data && usuarios.data[0]) {
    filteredItems = usuarios.data.filter((item: DataRow) =>
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
}, [filterTextNombre, filterTextAp_materno, filterTextAp_paterno, filterTextUsername, filterTextNo_tel, resetPaginationToggle]);

  const columns: TableColumn<DataRow>[] = [
    {
      name: 'Nombree',
      selector: (row: DataRow) => row.Nombre,
    },
    {
      name: 'Apellido Paterno',
      selector: (row: DataRow) => row.Ap_paterno,
    },
    {
      name: 'Apellido Materno',
      selector: (row: DataRow) => row.Ap_materno,
    },
    {
      name: 'Username',
      selector: (row: DataRow) => row.username,
    },
    {
      name: 'Telefono',
      selector: (row: DataRow) => row.No_tel,
    },

  ];

  return (
    (!isFetching && !isLoading) && (
    
        <DataTable
        title="Usuarios Creados" 
          columns={columns} 
          data={filteredItems} 
          pagination
          subHeader
          subHeaderComponent={subHeaderComponent}
        />
     
      )
    ); 
  }
