import { useState } from "react";

interface ModalProps {
    catalogo: string;
}

export const CatalogosPage = () => {
const [showModal, setShowModal] = useState(false);
const [modalProps, setModalProps] = useState<ModalProps | null>(null);

const handleOpenModal = (props:ModalProps) => {
    setModalProps(props);
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
                            <button className="btn btn-primary" onClick={() => handleOpenModal({"catalogo":"tipos-tarea"})}>
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
                <div className="modal show d-block" tabIndex={1}>
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                <p>Modal body text goes here.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
    </>
);
}
