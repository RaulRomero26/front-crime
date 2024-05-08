import { useMutation } from "@tanstack/react-query";
import { crimeiqActions } from '../../../services/';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const useCrearQR = () => {


    const mutation = useMutation({
        mutationFn: crimeiqActions.generarQR,
        onSuccess: (qr, variables, context) => {
            console.log({ qr, variables, context });
            const MySwal = withReactContent(Swal)
            if(qr!.ok){
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
