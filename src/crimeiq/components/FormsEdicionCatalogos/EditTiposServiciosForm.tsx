
import { useForm } from 'react-hook-form';
import { useMutationCatalogo } from '../../hooks/Catalogos/useMutationCatalogo';
import { useNewOptionCatalogo } from '../../hooks/Catalogos/useNewOptionCatalogo';

interface EditTiposServicioFormData {
    _id: { $oid: string };
    servicio:string;
    direccion:string;
    catalogo?: string;
    activo?: boolean;
}

interface EditTiposServicioFormProps{
    rowData: EditTiposServicioFormData ;
    onSave: (data: EditTiposServicioFormData  | null) => void;
    isNewRegister?: boolean;
}

export const EditTiposServicioForm = ({ rowData, onSave,isNewRegister }:EditTiposServicioFormProps) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: rowData
  });

const mutationCatalogo = useMutationCatalogo();
const newOptionCatalogo = useNewOptionCatalogo();
const onSubmit = (data:EditTiposServicioFormData ) => {
    // Aquí deberías actualizar los datos en tu estado o hacer una llamada API para guardar los cambios
    console.log(data)
    data.catalogo='servicios';
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
                Servicio:
                </label>
                <input {...register("servicio", { required: true })} className='form-control'/>
            </div>
            <div className="col-md-3 form-group">
                <label className='form-label'>
                Direccion:
                </label>
                <input {...register("direccion", { required: true })} className='form-control'/>
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

