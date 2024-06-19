
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import "./CrearTarea.css";
import { useEffect,useState } from "react";
import { crimeiqApi } from "../../../../api/crimeiqApi";
import { useCrearTarea } from "../../../hooks/Tareas/useCrearTarea";

export const CrearTarea = () => {

  const [catalogoUsuarios, setCatalogoUsuarios] = useState<any[]>([]);
  const [catalogoTipoTareas, setCatalogoTipoTareas] = useState<any[]>([]);
  const [catalogoServicios, setCatalogoServicios] = useState<any[]>([]);
  const [esRecurrente, setEsRecurrente] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  useEffect(() => {
    const getCatalogoUsuarios = async () => {
      try {
        const params = new URLSearchParams();
        params.append("catalogo", "usuarios");
        const response = await crimeiqApi.get("/catalogo_activo", { params });

        console.log("Catalogo de usuarios:", response.data);
        setCatalogoUsuarios(response.data.data.map((usuario: any) => ({ username: usuario.username, id: usuario._id.$oid })));
        console.log(catalogoUsuarios);
      } catch (error) {
        console.log("Error al obtener el catalogo de usuarios:", error);
      }
    };
   

    const getCalogoTipoTareas = async () => {
      try {
        const params = new URLSearchParams();
        params.append("catalogo", "tipos-tareas");
        const response = await crimeiqApi.get("/catalogo_activo", { params });

        console.log("Catalogo de tipo de tareas:", response.data);
        setCatalogoTipoTareas(response.data.data.map((tarea: any) => ({ actividad: tarea.actividad, id: tarea._id.$oid })));
        console.log(catalogoTipoTareas);
      } catch (error) {
        console.log("Error al obtener el catalogo de tipo de tareas:", error);
      }
    }

    const getCatalogoServicios = async () => {
      try {
        const params = new URLSearchParams();
        params.append("catalogo", "servicios");
        const response = await crimeiqApi.get("/catalogo_activo", { params });

        console.log("Catalogo de servicios:", response.data);
        setCatalogoServicios(response.data.data.map((servicio: any) => ({ servicio: servicio.servicio, id: servicio._id.$oid })));
        console.log(catalogoServicios);
      } catch (error) {
        console.log("Error al obtener el catalogo de servicios:", error);
      }
    }

    getCatalogoUsuarios();
    getCalogoTipoTareas();
    getCatalogoServicios();
  }, []);



  const tareaMutation = useCrearTarea();
  const onSubmit = (data: any) => {
    console.log("Datos del formulario:", data);
    data.recurrente=esRecurrente;
    data.estado="Pendiente";
    data.activa=true;
    console.log('Se le hablo a la mutacion');
    tareaMutation.mutate(data);
  }

  console.log(errors);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center" >
          <div className="col-md-8 ">
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
              <div className="form-group">
                <label className="form-label" htmlFor="recurrente">¿Es una tarea recurrente?</label>
                <input
                  type="checkbox"
                  id="recurrente"
                  onChange={() => setEsRecurrente(!esRecurrente)}
                />
              </div>

              {esRecurrente && (
                <div className="form-group">
                  <label className="form-label">Días de la semana:</label>
                  {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((day) => (
                    <div key={day}  className="me-2" style={{ display: 'inline-block', width: 'auto' }}>
                      <input
                        className="form-check-input"
                       
                        type="checkbox"
                        id={`${day}`}
                        {...register(`dias_semana.${day}`)}
                      />
                      <label htmlFor={`${day}`}>{day}</label>
                    </div>
                  ))}
                </div>
              )}

              <div className={`form-group ${!esRecurrente ? '' : 'd-none'}`}>
                <label  className="form-label" htmlFor="usu_asignado">Usuario:</label>
                <select
                    className="form-control"
                    id="usu_asignado"
                    
                    {...register("usu_asignado", {
                        required: !esRecurrente ? "El usuario es requerido" : false
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
                <label className="form-label" htmlFor="observaciones">Observaciones de la tarea:</label>
                <input
                    className="form-control"
                    type="text"
                    id="observaciones"
                    {...register("observaciones")}
                />
              </div>
              <div className={`form-group ${!esRecurrente ? '' : 'd-none'}`}>
                <label className="form-label" htmlFor="fecha_hora_vencimiento">Fecha Hora Vencimiento de la tarea:</label>
                <input
                  className="form-control"
                  type="date"
                  id="fecha_hora_vencimiento"
                  {...register("fecha_hora_vencimiento", {
                      required: !esRecurrente ? "El fecha_hora_vencimiento es requerido" : false,
                      validate: !esRecurrente ? value => {
                          const selectedDate = new Date(value);
                          const currentDate = new Date();
                          currentDate.setHours(0, 0, 0, 0); // Aseguramos que la comparación sea solo por la fecha, no la hora
                          return selectedDate >= currentDate || "La fecha no puede ser anterior al día de hoy";
                      } : undefined
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
                <select
                    className="form-control"
                    id="tipo_tarea"
                    
                    {...register("tipo_tarea", {
                        required: "El tipo es requerido",
                    })}
                >
                    <option value="">Seleccionar Tipo de Tarea</option>
                    {catalogoTipoTareas.map((tarea) => (
                      <option key={tarea.id} value={tarea.actividad}>{tarea.actividad}</option>
                    ))}
                </select>
                <ErrorMessage
                    errors={errors}
                    name="tipo_tarea"
                    render={({ message }) => <p className="invalid-form">{message}</p>}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="no_servicio">Servicio la tarea:</label>
                <select
                    className="form-control"
                    id="no_servicio"
                    
                    {...register("no_servicio", {
                        required: "El servicio es requerido",
                    })}
                >
                    <option value="">Seleccionar el Servicio</option>
                    {catalogoServicios.map((servicio) => (
                      <option key={servicio.id} value={servicio.servicio}>{servicio.servicio}</option>
                    ))}
                </select>
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
