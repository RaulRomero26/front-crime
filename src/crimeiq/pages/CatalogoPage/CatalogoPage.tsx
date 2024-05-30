import { useParams } from "react-router-dom";
import { useGetCatalogo } from "../../hooks/Catalogos/useGetCatalogo";
import { TiposTareaTable } from "../../components/TablasCatalogos/TiposTareaTable";
import { RolesUsuarioTable } from "../../components/TablasCatalogos/RolesUsuarioTable";
import { TiposServiciosTable } from "../../components/TablasCatalogos/TiposServiciosTable";


const renderComponentBasedOnTitle = (titulo:string, data:any) => {
    console.log('llame al renderizado de tabla')
    switch (titulo) {
        case "tipos-tareas":
            return <TiposTareaTable data={data.data}/>;
        case "roles-usuarios":
            return <RolesUsuarioTable data={data.data}/>;
        case "servicios":
            return <TiposServiciosTable data={data.data}/>;
        default:
            return null;
    }
};
    


export const CatalogoPage = () => {


    const {titulo} = useParams();
    console.log(titulo)

    const {isLoading,isFetching,catalogo} = useGetCatalogo({perPageReq:1000,catalogoBuscado:titulo!});
    if(!isLoading && !isFetching){
        console.log('Catalogo:',catalogo)
    }

    
        

  return (
    <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <h2 className="text-center titulo">
                        ADMINISTRAR <span className="resaltar">CATALOGO</span>
                    </h2>
                </div>
            </div>
        </div>
        <div className="container-fluid container-form">
            <div className="row  d-flex justify-content-center">
                <div className="col-md-10 mt-4">
                    {renderComponentBasedOnTitle(titulo || '', catalogo || {})}
                </div>
            </div>
        </div>
    </>
    
  )
}
