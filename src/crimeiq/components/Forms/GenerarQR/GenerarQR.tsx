
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import "./GenerarQR.css";
import { useCrearQR } from "../../../hooks/QR/useCrearQR";

export const GenerateQR = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const qrMutation = useCrearQR();
  const onSubmit = (data: any) => {
    console.log("Datos del formulario:", data);
    qrMutation.mutate(data);
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-center" >
          <div className="col-md-8 ">
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
              <div className="form-group">
                <label  className="form-label" htmlFor="nombre">Nombre:</label>
                <input
                  className="form-control"
                  type="text"
                  id="nombre"
                  {...register("nombre", {
                    required: "El nombre es requerido",
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="nombre"
                  render={({ message }) => <p className="invalid-form">{message}</p>}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="ubicacion">
                  Ubicación: (Dirección/Local/Casa):
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="ubicacion"
                  {...register("ubicacion", {
                    required: "La ubicación es requerida",
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="ubicacion"
                  render={({ message }) => <p className="invalid-form">{message}</p>}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="coordenadas">Coordenadas:</label>
                <input
                  className="form-control"
                  type="text"
                  id="lat"
                  placeholder="Lat"
                  {...register("lat", {
                    required: "La latitud es requerida",
                    pattern: {
                      value: /^-?\d+\.\d+$/,
                      message: "Formato de latitud incorrecto",
                    },
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="lat"
                  render={({ message }) => <p className="invalid-form">{message}</p>}
                />
                <input
                 className="form-control"
                  type="text"
                  id="log"
                  placeholder="Log"
                  {...register("log", {
                    required: "La longitud es requerida",
                    pattern: {
                      value: /^-?\d+\.\d+$/,
                      message: "Formato de longitud incorrecto",
                    },
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="log"
                  render={({ message }) => <p className="invalid-form">{message}</p>}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="observaciones">Recomendaciones del punto:</label>
                <textarea
                  className="form-control"
                  id="observaciones"
                  {...register("observaciones")}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="nombreArchivo">Nombre del Archivo Qr:</label>
                <input
                  className="form-control"
                  type="text"
                  id="nombreArchivo"
                  {...register("nombreArchivo", {
                    required: "El nombre es requerido",
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="nombreArchivo"
                  render={({ message }) => <p className="invalid-form">{message}</p>}
                />
              </div>
              <button className="btn btn-success my-3" type="submit">CREAR</button>
            </form>
          </div>
        </div>
      </div>
      </>
  );
};
