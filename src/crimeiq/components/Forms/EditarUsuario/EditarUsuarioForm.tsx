
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";
import { useMutationUsuario } from '../../../hooks/Usuarios/useMutationUsuario';
import { useEffect, useState } from 'react';
import { crimeiqApi } from '../../../../api/crimeiqApi';


interface EditarUsuarioFormData{
    _id?: { $oid: string };
    Nombre: string;
    Ap_materno: string;
    Ap_paterno: string;
    username: string;
    No_tel: string;
    Foto: string;
    activo: boolean;
    Dir: string;
    Tipo_sangre: string;
    serv_asignado: string;
    password?: string;
    role: string;
}

interface EditarUsuarioFormProps{
    rowData: EditarUsuarioFormData;
    onSave: (data: EditarUsuarioFormData | null) => void;
}

export const EditarUsuarioForm = ({ rowData, onSave }:EditarUsuarioFormProps) => {
    console.log('SERVICIO ASIGNADO:', rowData.serv_asignado)
    const [catalogoRoles, setCatalogoRoles] = useState<any[]>([]);
    const [catalogoServicios, setCatalogoServicios] = useState<any[]>([]);

    const { register, handleSubmit, reset,setValue, formState: { errors }, } = useForm({
        defaultValues: {
            ...rowData,
            password: undefined,
        }
    });
const mutationUsuario = useMutationUsuario();


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


useEffect(() => { 
    setValue('serv_asignado', rowData.serv_asignado) }
    , [rowData.serv_asignado,catalogoServicios]);

const onSubmit = (data:EditarUsuarioFormData) => {
    // Aquí deberías actualizar los datos en tu estado o hacer una llamada API para guardar los cambios
    console.log(data)
    mutationUsuario.mutate(data);
    onSave(data);
};

const handleCancel = () => {
    reset();
    onSave(null);
};
  // Si la mutación fue exitosa, cierra el formulario
  if (mutationUsuario.isSuccess ) {
    onSave(null);
  }

return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="row">
            <div className="col-md-3 form-group">
                <label className='form-label'>
                id:
                </label>
                <input {...register("_id.$oid", { required: false })} disabled className='form-control'/>
            </div>
                   
        <div className="col-md-3 form-group">
            <label  className="form-label" htmlFor="role">Rol:</label>
            <select
                className="form-control"
                id="role"
                value={rowData.role}
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
        <div className="col-md-3 form-group">
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
        <div className="col-md-3 form-group">
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
        <div className="col-md-3 form-group">
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
        <div className="col-md-3 form-group">
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
        <div className="col-md-3 form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
                className="form-control"
                type="text"
                id="password"
                {...register("password")}
                />
            <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => <p className="invalid-form">{message}</p>}
                />
        </div>
        <div className="col-md-3 form-group">
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

        <div className="col-md-3 form-group">
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

        <div className="col-md-6 form-group">
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

        <div className="col-md-3 form-group">
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
        
        <div className="col-md-3 form-group">
            <label className="form-label" htmlFor="foto">Imagen</label>
            <input
            className="form-control"
            type="file"
            id="foto"
            {...register("Foto")}
            />
        </div>
        
        </div>

        <div className="row d-flex justify-content-center my-3">
            <div className="col-md-2">
                <button type="button" className='btn btn-success me-2' onClick={handleSubmit(onSubmit)}>Save</button>
                <button type="button" className="btn btn-danger" onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </div>
    </form>
);
};

