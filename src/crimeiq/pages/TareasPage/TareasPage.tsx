import { CrearTarea, TareasRecurrentesTable, TareasTable } from "../../components";

export const TareasPage = () => {
  return (
    <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <h2 className="text-center titulo">
                    ADMINISTRAR <span className="resaltar">TAREAS</span>
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
                  ASIGNAR TAREAS
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#profile-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="profile-tab-pane"
                  aria-selected="false"
                >
                  TAREAS ASIGNADAS
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="recurrentes-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#recurrentes-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="recurrentes-tab-pane"
                  aria-selected="false"
                >
                  TAREAS RECURRENTES
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home-tab-pane"
                role="tabpanel"
                aria-labelledby="home-tab"
                tabIndex={0}
              >
               <CrearTarea/>
              </div>
              <div
                className="tab-pane fade"
                id="profile-tab-pane"
                role="tabpanel"
                aria-labelledby="profile-tab"
                tabIndex={0}
              >
                <TareasTable/>
              </div>
              <div
                className="tab-pane fade"
                id="recurrentes-tab-pane"
                role="tabpanel"
                aria-labelledby="recurrentes-tab"
                tabIndex={0}
              >
                <TareasRecurrentesTable/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TareasPage;
