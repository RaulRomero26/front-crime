import { useMutation, useQueryClient} from "@tanstack/react-query";
import { crimeiqActions } from "../../../services";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const useMutationTarea = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: crimeiqActions.updateTarea,
        onSuccess: (row:any, variables, context) => {
            queryClient.invalidateQueries({ queryKey: [`tareas-recurrentes`] });
            console.log({ row, variables, context });
            //queryClient.invalidateQueries({ queryKey: ['tareas'] });
            const MySwal = withReactContent(Swal)
            if(row!.success){
                MySwal.fire({
                    title: <p>Registro actualizado</p>,
                    text: "Se ha actualizado el registro correctamente",
                    icon: "success"
                    })
            }else{
                MySwal.fire({
                    title: <p>Ups! ocurrio un error</p>,
                    text: "Ha ocurrido un error",
                    icon: "error"
                    })
            }
            
        },
        onError: (error) => {
            console.error('Error en la mutación:', error);
        }

    });

    return mutation;
}

