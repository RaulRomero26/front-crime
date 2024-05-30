
import { useForm } from 'react-hook-form';
import { useMutationCatalogo } from '../../hooks/Catalogos/useMutationCatalogo';
import { useNewOptionCatalogo } from '../../hooks/Catalogos/useNewOptionCatalogo';

interface EditTiposTareaFormData {
    _id: { $oid: string };
    actividad:string
    catalogo?: string;
    activo?: boolean;
}

interface EditTiposTareaFormProps{
    rowData: EditTiposTareaFormData ;
    onSave: (data: EditTiposTareaFormData  | null) => void;
    isNewRegister?: boolean;
}

export const EditTiposTareaForm = ({ rowData, onSave,isNewRegister }:EditTiposTareaFormProps) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: rowData
  });

const mutationCatalogo = useMutationCatalogo();
const newOptionCatalogo = useNewOptionCatalogo();
const onSubmit = (data:EditTiposTareaFormData ) => {
    // Aquí deberías actualizar los datos en tu estado o hacer una llamada API para guardar los cambios
    console.log(data)
    data.catalogo='tipos-tareas';
    if(isNewRegister){
        newOptionCatalogo.mutate(data);
    }else{
        mutationCatalogo.mutate(data);
    }
    onSave(data);
   
};

const handleCancel = () => {
    reset();
    onSave(null);
};
  // Si la mutación fue exitosa, cierra el formulario
  if (mutationCatalogo.isSuccess || newOptionCatalogo.isSuccess) {
    onSave(null);
  }

return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row d-flex justify-content-center mt-4">
            <div className="col-md-3 form-group">
                <label className='form-label'>
                id:
                </label>
                <input {...register("_id.$oid", { required: false })} disabled className='form-control'/>
            </div>
            <div className="col-md-3 form-group">
                <label className='form-label'>
                Actividad:
                </label>
                <input {...register("actividad", { required: true })} className='form-control'/>
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

