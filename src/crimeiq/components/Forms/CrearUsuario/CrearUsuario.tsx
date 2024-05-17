
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { useState } from "react";
import { useCrearUsuario } from "../../../hooks/Usuarios/useCrearUsuario";

export const CrearUsuario = () => {

  const [catalogoRoles, setCatalogoRoles] = useState<any[]>(['Administrador','Guardia']);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  


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
                      <option key={rol} value={rol}>{rol}</option>
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
