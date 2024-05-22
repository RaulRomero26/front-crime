import { useGetCatalogo } from "../../hooks/Catalogos/useGetCatalogo";

interface ModalCatalogosProps {
    catalogoBuscado: string | null;
    handleCloseModal: () => void;
}


export const ModalCatalogos = ({catalogoBuscado,handleCloseModal}:ModalCatalogosProps) => {

    const {isLoading,isFetching,catalogo} = useGetCatalogo({perPageReq:1000,catalogoBuscado:catalogoBuscado!});

    if(!isLoading && !isFetching){
        console.log('Catalogo:',catalogo)
    }
    
    return (
        <>     
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
        </>
  )
}
