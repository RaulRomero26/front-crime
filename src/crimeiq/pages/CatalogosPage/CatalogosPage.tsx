import { Link } from "react-router-dom";

interface ModalProps {
    catalogo: string | null;
}

export const CatalogosPage = () => {



return (
    <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <h2 className="text-center titulo">
                        ADMINISTRAR <span className="resaltar">CATALOGOS</span>
                    </h2>
                </div>
            </div>
        </div>
        <div className="container-fluid container-form">
            <div className="row">
                <div className="col-md-4 mt-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">TIPOS DE TAREA</h5>
                            <p className="card-text">
                                Aquí puedes administrar los tipos de tarea que existen.
                            </p>
                            <Link to="../catalogos/tipos-tareas" className="btn btn-primary">
                                Ir a Catálogo
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mt-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">ROLES DE USUARIOS</h5>
                            <p className="card-text">
                                Aquí puedes administrar los roles de usuarios.
                            </p>
                            <Link to="../catalogos/roles-usuarios" className="btn btn-primary">
                                Ir a Catálogo
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mt-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">SERVICIOS</h5>
                            <p className="card-text">
                                Aquí puedes administrar los servicios con los que se cuenta actualmente
                            </p>
                            <Link to="../catalogos/servicios" className="btn btn-primary">
                                Ir a Catálogo
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
);
}
