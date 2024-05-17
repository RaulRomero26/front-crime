import { CrearUsuario, UsuariosTable } from "../../components";

export const UsuariosPage = () => {
  return (
    <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <h2 className="text-center titulo">
                    ADMINISTRAR <span className="resaltar">USUARIOS</span>
                    </h2>
                </div>
            </div>
        </div>
      <div className="container-fluid container-form">

        <div className="row justify-content-center align-items-center">
          <div className="col-md-12 mt-3">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="home-tab-pane"
                  aria-selected="true"
                >
                  AGREGAR USUARIOS
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="repoalerta-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#repoalerta-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="repoalerta-tab-pane"
                  aria-selected="true"
                >
                    LISTAR USUARIOS
                </button>
              </li>
            </ul>
          </div>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home-tab-pane"
                role="tabpanel"
                aria-labelledby="home-tab"
                tabIndex={0}
              >
               <CrearUsuario/>
              </div>
            <div className="tab-content" id="reportesAlertas">
              <div
                className="tab-pane fade"
                id="repoalerta-tab-pane"
                role="tabpanel"
                aria-labelledby="repoalerta-tab"
                tabIndex={0}
              >
               <UsuariosTable/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsuariosPage;
