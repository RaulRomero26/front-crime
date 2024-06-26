import { ReportesAlertaTable, ReportesIncidenciaTable, ReportesIncidenteTable } from "../../components";

export const ReportesIncidenciaPage = () => {
  return (
    <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <h2 className="text-center titulo">
                    ADMINISTRAR REPORTES<span className="resaltar">INCIDENCIA</span>
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
                  REPORTES RECORRIDOS
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
                  REPORTES ALERTAS
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="repoinci-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#repoinci-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="repoinci-tab-pane"
                  aria-selected="true"
                >
                  REPORTES INCIDENTES
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
               <ReportesIncidenciaTable/>
              </div>
            <div className="tab-content" id="reportesAlertas">
              <div
                className="tab-pane fade"
                id="repoalerta-tab-pane"
                role="tabpanel"
                aria-labelledby="repoalerta-tab"
                tabIndex={0}
              >
               <ReportesAlertaTable/>
              </div>
            </div>
            <div className="tab-content" id="reportesIncidentes">
              <div
                className="tab-pane fade"
                id="repoinci-tab-pane"
                role="tabpanel"
                aria-labelledby="repoinci-tab"
                tabIndex={0}
              >
               <ReportesIncidenteTable/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportesIncidenciaPage;
