import { useMutation, useQueryClient } from "@tanstack/react-query";
import { crimeiqActions } from '../../../services/';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const useCrearUsuario = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: crimeiqActions.crearUsuario,
        onSuccess: (usuario, variables, context) => {
            console.log({ usuario, variables, context });
            queryClient.invalidateQueries({ queryKey: ['usuarios'] });
            const MySwal = withReactContent(Swal)
            if(usuario!.success){
                MySwal.fire({
                    title: <p>Registro creado</p>,
                    text: "Se ha creado el registro correctamente",
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
