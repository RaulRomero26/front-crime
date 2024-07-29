
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { useEffect, useState } from "react";
import { useCrearUsuario } from "../../../hooks/Usuarios/useCrearUsuario";
import { crimeiqApi } from "../../../../api/crimeiqApi";

export const CrearUsuario = () => {

  const [catalogoRoles, setCatalogoRoles] = useState<any[]>([]);
  const [catalogoServicios, setCatalogoServicios] = useState<any[]>([]);




  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  



  useEffect(() => {

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

    getCatalogoServicios();
  }, []);

  useEffect(() => {
    const getCatalogoRoles = async () => {
      try {
        const params = new URLSearchParams();
        params.append("catalogo", "roles-usuarios");
        params.append("page", "1");
        params.append("perPage", "1000");
        const response = await crimeiqApi.get("/catalogo", { params });

        console.log("Catalogo de usuarios:", response.data);
        setCatalogoRoles(response.data.data.map((rol: any) => ({ rol: rol.role, id: rol._id.$oid })));
        console.log(catalogoServicios);
      } catch (error) {
        console.log("Error al obtener el catalogo de servicios:", error);
      }
    }

    getCatalogoRoles();
    
  },[])

  const usuarioMutation = useCrearUsuario();
  const onSubmit = (data: any) => {
    console.log("Datos del formulario:", data);
    usuarioMutation.mutate(data);
  }


  return (
    <>
      <div className="container">
        <div className="row justify-content-center" >
          <div className="col-md-8 ">
            <form onSubmit={handleSubmit(onSubmit)}  encType="multipart/form-data" className="mt-4" >
              <div className="form-group">
                <label  className="form-label" htmlFor="role">Rol:</label>
                <select
                    className="form-control"
                    id="role"
                    
                    {...register("role", {
                        required: "El rol es requerido",
                    })}
                >
                    <option value="">Seleccionar un rol</option>
                    {catalogoRoles.map((rol) => (
                      <option key={rol.id} value={rol.rol}>{rol.rol}</option>
                    ))}
                </select>
                <ErrorMessage
                  errors={errors}
                  name="role"
                  render={({ message }) => <p className="invalid-form">{message}</p>}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="Nombre">Nombre:</label>
                <input
                    className="form-control"
                    type="text"
                    id="Nombre"
                    {...register("Nombre", {
                    required: "El Nombre es requerido",
                    })}
                />
                <ErrorMessage
                    errors={errors}
                    name="Nombre"
                    render={({ message }) => <p className="invalid-form">{message}</p>}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="Ap_paterno">Apellido Paterno</label>
                <input
                    className="form-control"
                    type="text"
                    id="Ap_paterno"
                    {...register("Ap_paterno", {
                    required: "El Apellido Paterno es requerido",
                    })}
                />
                <ErrorMessage
                    errors={errors}
                    name="Ap_paterno"
                    render={({ message }) => <p className="invalid-form">{message}</p>}
                />
              </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="Ap_materno">Apellido Materno</label>
                    <input
                        className="form-control"
                        type="text"
                        id="Ap_materno"
                        {...register("Ap_materno", {
                        required: "El Apellido Materno es requerido",
                        })}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="Ap_materno"
                        render={({ message }) => <p className="invalid-form">{message}</p>}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="username">Username</label>
                    <input
                        className="form-control"
                        type="text"
                        id="username"
                        {...register("username", {
                        required: "El Username es requerido",
                        })}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="username"
                        render={({ message }) => <p className="invalid-form">{message}</p>}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input
                        className="form-control"
                        type="text"
                        id="password"
                        {...register("password", {
                        required: "El password es requerido",
                        })}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="password"
                        render={({ message }) => <p className="invalid-form">{message}</p>}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="No_tel">Telefono</label>
                    <input
                        className="form-control"
                        type="text"
                        id="No_tel"
                        {...register("No_tel", {
                        required: "El Telefono es requerido",
                        })}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="No_tel"
                        render={({ message }) => <p className="invalid-form">{message}</p>}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="Tipo_sangre">Tipo de Sangre:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="Tipo_sangre"
                        {...register("Tipo_sangre", {
                        required: "El Telefono es requerido",
                        })}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="Tipo_sangre"
                        render={({ message }) => <p className="invalid-form">{message}</p>}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="Dir">Dirección:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="Dir"
                        {...register("Dir", {
                        required: "El Telefono es requerido",
                        })}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="Dir"
                        render={({ message }) => <p className="invalid-form">{message}</p>}
                    />
                </div>

                <div className="form-group">
                <label className="form-label" htmlFor="serv_asignado">Servicio del usuario:</label>
                <select
                    className="form-control"
                    id="serv_asignado"
                    
                    {...register("serv_asignado", {
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
                    name="serv_asignado"
                    render={({ message }) => <p className="invalid-form">{message}</p>}
                />
              </div>
             
                <div className="form-group">
                  <label className="form-label" htmlFor="foto">Imagen</label>
                  <input
                    className="form-control"
                    type="file"
                    id="foto"
                    {...register("foto")}
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
