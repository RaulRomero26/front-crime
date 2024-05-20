/* 
    Recordemos el concepto de hook: No es mas que una funcion que puede retornar, mas funciones, variables, estados, lo que sea necesario
    esto sirve con el objetivo de aislar la logica del funcionamiento de un componente, o en este caso de la store, fuente de la verdad que
    maneja el estado global de la aplicación es decir las sesiones de los usuarios y sus permisos.

    Muy recomendable, conocer los conceptos de reducer y el patron redux para entender al 100% el codigo.
*/
//Se importan los componentes propios de redux
import { useDispatch, useSelector } from 'react-redux';
//Se importa el conector/adaptador hacia el backedn
import { authApi } from '../../api/authApi';
//se importa el helper necesario para el manejo del historial
//import { insertHistorial } from '../helpers/insertHistorial';
//Se importan las funciones y hooks de la store
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../../store/auth/authSlice'; 


interface AuthState {
    status: string;
    user: string;
    errorMessage: string;
  }
  
interface AppState {
    auth: AuthState;
  }

interface LoginArgs {
    username: string;
    password: string;
}

interface RegisterArgs {
    username: string;
    password: string;
    name: string;
}

interface ErrorWithResponse extends Error {
    response?: {
      data?: {
        msg?: string;
      };
    };
  }

export const useAuthStore = () => {
    //Se extraen de la store de authenticacion las funciones que se exponen, status, user, errorMessage
    const { status, user, errorMessage } = useSelector((state: AppState) => state.auth);
    //se importa el dispatcher de acciones de el store
    const dispatch = useDispatch();

    /* 
        Funcion encargada de iniciar el proceso de login, recibiendo como argumentos el email y password del usuario
        se cambia el estado global a checking en espera de una respuesta del backend, al solicitar dicha respuesta
        y tener una respuesta positiva se almacena la informacion necesaria del usuario en el localstorage del navegador
        recordemos que con el manejo de tokens se realiza una autenticacion pasiva para ahorrarle procesamiento al servidor

        A su vez con esas varibles inicializadas se dispara el helper para tener el registro del inicio de sesion en el historial
        y por ultimo se hace el dispatch de la accion onLogin misma que manda la informacion requerita para la parte del store que maneja
        las sesiones del usuario.

        Por el contrario si no se llega a auntenticar el usuario se dispara la accion para sacarlo del sistema, y borrar el mensaje de
        error del store
    */
    const startLogin = async({ username, password }:LoginArgs) => {
        console.log('estanis arruva del dispatch: ',{ username, password })
        dispatch( onChecking() );
        try {
            const { data } = await authApi.post('/login',{ "username": username, "password": password });
            console.log('respuesta: ',{data})
            localStorage.setItem('user',JSON.stringify(data.usuario))
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime().toString() );
            //insertHistorial({ tipo:'Inicio de Sesión' })
            dispatch( onLogin(
                {   name: data.usuario.nombre_completo, 
                    id: data.usuario.id, 
                    rol: data.usuario.rol, 
                    img: data.usuario.img, 
                    correo: data.usuario.correo, 
                }) );
            
        } catch (error) {
            console.log('error del catch', error)
            const {data} = await authApi.post('/logout');
            console.log('ANTES  DEL DISPATCH LOGOUT', data)
            dispatch( onLogout('Credenciales incorrectas') );
            //Swal.fire('Error en la autenticación', 'Credenciales incorrectas, o sesion iniciada en otro dispisitivo', 'error');//esto se deberia de quitar recuerda que el store debe de ser lineal sin extras
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }
    /* 
        Esta funcion se dispara en el registro de un usuario, actualmente no se cuenta con ese componente
        sin embargo se mantiene a posterior implementacion.
    */
    const startRegister = async({ username, password, name }:RegisterArgs) => {
        dispatch( onChecking() );
        try {
            const { data } = await authApi.post('/new',{ username, password, name });
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime().toString() );
            dispatch( onLogin(
                { 
                    name: data.name, 
                    id: data.id, 
                    rol: data.rol, 
                    img: data.img, 
                    correo: data.email,
                }) );
            
        } catch (error: unknown) {
            if (error instanceof Error) {
                const err = error as ErrorWithResponse;
                const {data} = await authApi.post('/logout');
                console.log('ANTES  DEL DISPATCH LOGOUT', data)
                dispatch( onLogout( err.response?.data?.msg || '--' ) );
                setTimeout(() => {
                    dispatch( clearErrorMessage() );
                }, 10);
            }
        }
    }

    /*
        El objetivo de esta funcion es pedir al backend la informacion de un token 
        si el token es validado por el backend con el nuevo obtenido como respuesta del mismo
        se vuelve a disparar la accion de login para poder darle al usuario mas tiempo de 
        trabajo en la aplicacion
        
        Si no hay token almacenado, o el token es invalido se saca al usuario de la aplicacion
    */
        const checkAuthToken = async() => {
            // const token = localStorage.getItem('token');
            const usuario = localStorage.getItem('user');
            console.log('USARIO DE LOCAL STORAGE',JSON.parse(usuario!))
            if ( !usuario ) {
                //const {data} = await authApi.post('/logout');
                 return dispatch( onLogout({}) );
                
            }else{
                return dispatch( onLogin(JSON.parse(usuario)) );
            }
        }
    //Funcion que maneja el cierre de sesion, limpia el almacenamiento local y redirige al usuario al login
    const startLogout = async() => {
        // const {data} = await authApi.post('/logout');
        // console.log('ANTES  DEL DISPATCH LOGOUT', data)
        localStorage.clear();
        dispatch( onLogout({}) );
    }

    
    //retorno del hook todo lo que se retorne puede ser accedible desde cualquier componente  que implemente el hook
    return {
        //* Propiedades
        errorMessage,
        status, 
        user, 

        //* Métodos
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
    };
}