import { useState } from "react";
import { ModalCatalogos } from "../../components/ModalCatalogos/ModalCatalogos";

interface ModalProps {
    catalogo: string | null;
}

export const CatalogosPage = () => {
const [showModal, setShowModal] = useState(false);
const [catalogoSeleccionado, setCatalogoSeleccionado] = useState<string | null>(null);

const handleOpenModal = (props:ModalProps) => {
    setCatalogoSeleccionado(props.catalogo);
    setShowModal(true);
};

const handleCloseModal = () => {
    setShowModal(false);
};

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
                            <button className="btn btn-primary" onClick={() => handleOpenModal({"catalogo":"usuarios"})}>
                                Ir a Catálogo
                            </button>
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
                            <button className="btn btn-primary" onClick={() => handleOpenModal({"catalogo":"tipos-roles"})}>
                                Ir a Catálogo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {showModal && (
                <ModalCatalogos catalogoBuscado={catalogoSeleccionado} handleCloseModal={handleCloseModal}/>
            )}
    </>
);
}
