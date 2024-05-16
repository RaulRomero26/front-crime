import { crimeiqApi } from "../api/crimeiqApi";


interface GenerarQrResponse {
  success: boolean;
  data: any;
  // Agrega aquí otras propiedades que pueda tener la respuesta
}

interface GenerarTareaResponse {
  success: boolean;
  data: any;
  // Agrega aquí otras propiedades que pueda tener la respuesta
}

export const generarQR = async (
  formdata: any
): Promise<GenerarQrResponse | undefined> => {
  try {
    const { data } = await crimeiqApi.post("/generar_qr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formdata,
    });
    return data;
  } catch (error) {
    console.error("Error de red:", error);
  }

  return undefined; // Add return statement here
};

export const useGetAllQR = async ({ perPage }:any) => {

  try {
    console.log('ACCION DATOS LIMIT:',perPage)
    const params = new URLSearchParams();
    params.append('page',perPage.toString())
    const {data} = await crimeiqApi.get(`/all-qr`,{params});
    console.log('DATA DE ACTIONS',data)
    return data;
  } catch (error) {
    console.log(error)
    return {};
  }

};

export const useGetAllTareas = async ({ perPage }:any) => {

  try {
    console.log('ACCION DATOS LIMIT:',perPage)
    const params = new URLSearchParams();
    params.append('page',perPage.toString())
    const {data} = await crimeiqApi.get(`/all-tareas`,{params});
    console.log('DATA DE ACTIONS',data)
    return data;
  } catch (error) {
    console.log(error)
    return {};
  }

};

export const crearTarea = async (
  formdata: any
): Promise<GenerarTareaResponse | undefined> => {
  try {
    console.log(formdata)
    const { data } = await crimeiqApi.post("/crear_tarea", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formdata,
    });
    return data;
  } catch (error) {
    console.error("Error de red:", error);
  }

  return undefined; // Add return statement here
};

export const useGetAllReportesIncidencia = async ({ perPage }:any) => {

  try {
    console.log('ACCION DATOS LIMIT:',perPage)
    const params = new URLSearchParams();
    params.append('page',perPage.toString())
    const {data} = await crimeiqApi.get(`/recorridos`,{params});
    console.log('DATA DE ACTIONS',data)
    return data;
  } catch (error) {
    console.log(error)
    return {};
  }

};

export const useGetAllAlertas = async ({ perPage }:any) => {

  try {
    console.log('ACCION DATOS LIMIT:',perPage)
    const params = new URLSearchParams();
    params.append('page',perPage.toString())
    const {data} = await crimeiqApi.get(`/all-alertas`,{params});
    console.log('DATA DE ACTIONS',data)
    return data;
  } catch (error) {
    console.log(error)
    return {};
  }

};