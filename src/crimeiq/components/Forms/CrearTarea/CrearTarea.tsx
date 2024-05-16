
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import "./CrearTarea.css";
import { useEffect,useState } from "react";
import { crimeiqApi } from "../../../../api/crimeiqApi";
import { useCrearTarea } from "../../../hooks/Tareas/useCrearTarea";

export const CrearTarea = () => {

  const [catalogoUsuarios, setCatalogoUsuarios] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  useEffect(() => {
    const getCatalogoUsuarios = async () => {
      try {
        const response = await crimeiqApi.post("/catalogo_usuarios");
        console.log("Catalogo de usuarios:", response.data);
        setCatalogoUsuarios(response.data.data.map((usuario: any) => ({ username: usuario.username, id: usuario._id.$oid })));
        console.log(catalogoUsuarios);
      } catch (error) {
        console.log("Error al obtener el catalogo de usuarios:", error);
      }
    };
    getCatalogoUsuarios();
  }, []);



  const tareaMutation = useCrearTarea();
  const onSubmit = (data: any) => {
    console.log("Datos del formulario:", data);
    data.estado="Pendiente";
    tareaMutation.mutate(data);
  }


  return (
    <>
      <div className="container">
        <div className="row justify-content-center" >
          <div className="col-md-8 ">
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
              <div className="form-group">
                <label  className="form-label" htmlFor="usu_asignado">Usuario:</label>
                <select
                    className="form-control"
                    id="usu_asignado"
                    
                    {...register("usu_asignado", {
                        required: "El usuario es requerido",
                    })}
                >
                    <option value="">Seleccionar usuario</option>
                    {catalogoUsuarios.map((usuario) => (
                      <option key={usuario.id} value={usuario.username}>{usuario.username}</option>
                    ))}
                </select>
                <ErrorMessage
                  errors={errors}
                  name="usu_asignado"
                  render={({ message }) => <p className="invalid-form">{message}</p>}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="titulo">Titulo de la tarea:</label>
                <input
                    className="form-control"
                    type="text"
                    id="titulo"
                    {...register("titulo", {
                    required: "El titulo es requerido",
                    })}
                />
                <ErrorMessage
                    errors={errors}
                    name="titulo"
                    render={({ message }) => <p className="invalid-form">{message}</p>}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="descripcion">Descripcion de la tarea:</label>
                <input
                    className="form-control"
                    type="text"
                    id="descripcion"
                    {...register("descripcion", {
                    required: "El descripcion es requerido",
                    })}
                />
                <ErrorMessage
                    errors={errors}
                    name="descripcion"
                    render={({ message }) => <p className="invalid-form">{message}</p>}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="fecha_hora_vencimiento">Fecha Hora Vencimiento de la tarea:</label>
                <input
                    className="form-control"
                    type="date"
                    id="fecha_hora_vencimiento"
                    {...register("fecha_hora_vencimiento", {
                    required: "El fecha_hora_vencimiento es requerido",
                    validate: value => {
                        const selectedDate = new Date(value);
                        const currentDate = new Date();
                        currentDate.setHours(0, 0, 0, 0); // Aseguramos que la comparación sea solo por la fecha, no la hora
                        return selectedDate >= currentDate || "La fecha no puede ser anterior al día de hoy";
                    }
                    })}
                />
                <ErrorMessage
                    errors={errors}
                    name="fecha_hora_vencimiento"
                    render={({ message }) => <p className="invalid-form">{message}</p>}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="tipo_tarea">Tipo de la tarea:</label>
                <input
                    className="form-control"
                    type="text"
                    id="tipo_tarea"
                    {...register("tipo_tarea", {
                    required: "El tipo_tarea es requerido",
                    })}
                />
                <ErrorMessage
                    errors={errors}
                    name="tipo_tarea"
                    render={({ message }) => <p className="invalid-form">{message}</p>}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="no_servicio">Servicio la tarea:</label>
                <input
                    className="form-control"
                    type="text"
                    id="no_servicio"
                    {...register("no_servicio", {
                    required: "El no_servicio es requerido",
                    })}
                />
                <ErrorMessage
                    errors={errors}
                    name="no_servicio"
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
