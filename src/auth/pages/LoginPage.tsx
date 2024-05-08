//se importan los componentes propios de react
import { useEffect } from 'react';
//se importan las bibliotecas de terceros
import Swal from 'sweetalert2';
//se importan los hook personalizados 
import { useAuthStore, useForm } from '../../hooks';
//se importan las hojas de estilo necesarias para el componente
import './LoginPage.css';
import Logo from '../../assets/4.png';
import Logo1 from '../../assets/Logo_L.png';

//Se debe de tener un pseudo estado pristine del formulario, de otra forma se entra en un bucle de re-renderizado
const loginFormFields = {
    loginEmail:    '',
    loginPassword: '',
}
/*
    El componente es el formulario de login, junto con la funcionalidad fraccionada en hooks para hacer la 
    determinacion de si el usuario existe, asi como de que permismos tiene acceso dicho usuario.
    Asi mismo este componente es uno de los principales que usa la store de la aplicación utilizando el 
    patron redux.
*/
export const LoginPage = () => {
    
    //Se  extran del store las funciones, estados, etc que se exponen a la aplicacion
    const { startLogin, errorMessage} = useAuthStore();
    //Se extraen del hook useForm este hook es el encargado de manejar la información y funcionalidad del formulario
    const { formState: { loginEmail, loginPassword }, onInputChange:onLoginInputChange } = useForm( loginFormFields );
    //funcion para manipular el submit del formulario.
    const loginSubmit = ( event: any ) => {
            event.preventDefault();
            startLogin({ username: loginEmail, password: loginPassword });//esta funcion proviene del store, es bastante descriptiva.
    }

    //Este efecto se usa para mostral el alert cuando se encuentra un error al realizar la authenticacion del usuario
    useEffect(() => {
        if ( errorMessage !== undefined && errorMessage.length > 0) {
            Swal.fire('Error en la autenticación', errorMessage, 'error');
        }    
    }, [errorMessage])
    //El formulario se liga a las funciones del hook, las funcion del submit, y las funcion para detectar cambios en los input
    return (
        <>        
             <div className="container-fondo">
            <div className="container-fluid">
                <div className="container-center ms-5 me-5 row d-flex">
                    <div className="col-md-5 align-self-center">
                        <img src={Logo1} alt="Logo" className='logo' />
                    </div>
                        <div className="col-md-5 container-login align-self-center mx-auto">
                               <div className="row">
                                <div className="col-md-11 ms-4">
                                    
                                </div>
                               </div>
                               <div className="row ">
                                    <h3 className='text-center'>Iniciar Sesión</h3>
                                    <form onSubmit={ loginSubmit } >
                                            <div className="col-md-12 d-flex justify-content-center">

                                                <div className="form-group mb-2">
                                                    <input 
                                                        type="text"
                                                        className="form-control "
                                                        placeholder="Correo"
                                                        name="loginEmail"
                                                        value={ loginEmail }
                                                        onChange={ onLoginInputChange }
                                                    />
                                                </div>
                                            </div>
                                        <div className="col-md-12 d-flex justify-content-center">

                                            <div className="form-group mb-2">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Contraseña"
                                                    name="loginPassword"
                                                    value={ loginPassword }
                                                    onChange={ onLoginInputChange }
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12 d-flex justify-content-center">

                                            <div className="mb-5">
                                                <input 
                                                    type="submit"
                                                    className="btnSubmit"
                                                    value="Acceder" 
                                                />
                                            </div>
                                        </div>
                                    </form>
                               </div>
                               
                        </div>
                        
                    </div>

                    <div style={{ position: 'fixed', bottom: '0', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#222', color: 'white', textAlign: 'center', padding: '10px', width: '100%', fontSize: '10px' }}>
                        <img src={Logo} alt="4" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                        Copyright: 2024 Todos los derechos reservados ©
                    </div>
                </div>
            </div>
        </>

    )
}

