
import { useForm } from 'react-hook-form';
import { useMutationCatalogo } from '../../hooks/Catalogos/useMutationCatalogo';

interface EditRolesUsuarioFormData{
    _id: { $oid: string };
    role:string
    catalogo?: string;
}

interface EditRolesUsuarioFormProps{
    rowData: EditRolesUsuarioFormData;
    onSave: (data: EditRolesUsuarioFormData | null) => void;
}

export const EditRolesUsuarioForm = ({ rowData, onSave }:EditRolesUsuarioFormProps) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: rowData
  });

const mutationCatalogo = useMutationCatalogo();

const onSubmit = (data:EditRolesUsuarioFormData) => {
    // Aquí deberías actualizar los datos en tu estado o hacer una llamada API para guardar los cambios
    console.log(data)
    data.catalogo='roles-usuarios';
    mutationCatalogo.mutate(data);
    onSave(data);
   
};

const handleCancel = () => {
    reset();
    onSave(null);
};
  // Si la mutación fue exitosa, cierra el formulario
  if (mutationCatalogo.isSuccess) {
    onSave(null);
  }

return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row d-flex justify-content-center mt-4">
            <div className="col-md-3 form-group">
                <label className='form-label'>
                id:
                </label>
                <input {...register("_id.$oid", { required: true })} disabled className='form-control'/>
            </div>
            <div className="col-md-3 form-group">
                <label className='form-label'>
                Role:
                </label>
                <input {...register("role", { required: true })} className='form-control'/>
            </div>
        </div>
        <div className="row d-flex justify-content-center my-3">
            <div className="col-md-2">
                <button type="submit" className='btn btn-success me-2'>Save</button>
                <button type="button" className="btn btn-danger" onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </div>
    </form>
);
};

