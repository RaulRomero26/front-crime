//Se realizan las importaciónes necesarias para el funcionamiento de la función
import axios from 'axios'; //,{ InternalAxiosRequestConfig }
//Se importa el helper que expone las variables de entorno
import { getEnvVariables } from '../helpers/getEnvVariables';
//Llamando a dicha funcion se obtiene la variable necesaria
const { VITE_BACKEND_SERVER_AUTH } = getEnvVariables()
//Se crea y exporta la funcion que genera nuestro intermediario entre el frontend
//y el backend
export const authApi = axios.create({
    baseURL: VITE_BACKEND_SERVER_AUTH
});

//Con nuestra funcion creada se le añade la posibilidad de interceptar las solicitudes
//del backend al servidor añadoendole los headers y el x-token necesario pra el backend
// authApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//     config.headers['x-token'] = localStorage.getItem('token')!;
//     config.headers['x-user'] = localStorage.getItem('user')!;

//     return config;
// });

//De igual manera se añade el interceptor de las respuestas, para que en caso de respuestas
// con status 400, manejadas por el servidor sacar al usuario no autenticado de la aplicación
  authApi.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          window.location.href = '/scanner';
        }
      });
  