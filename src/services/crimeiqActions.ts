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

interface GenerarUsuarioResponse {
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

export const useGetAllUsuarios = async ({ perPage }:any) => {

  try {
    console.log('ACCION DATOS LIMIT:',perPage)
    const params = new URLSearchParams();
    params.append('page',perPage.toString())
    const {data} = await crimeiqApi.get(`/all-usuarios`,{params});
    console.log('DATA DE ACTIONS',data)
    return data;
  } catch (error) {
    console.log(error)
    return {};
  }

};

export const crearUsuario = async (
  formdata: any
): Promise<GenerarUsuarioResponse | undefined> => {
  try {
    const formData = new FormData();
    formData.append("role", formdata.role);
    formData.append("Nombre", formdata.Nombre);
    formData.append("Ap_paterno", formdata.Ap_paterno);
    formData.append("Ap_materno", formdata.Ap_materno);
    formData.append("username", formdata.username);
    formData.append("password", formdata.password);
    formData.append("No_tel", formdata.No_tel);
    formData.append("foto", formdata.foto[0]);

    console.log("Datos del formulario:", formdata);

    const { data } = await crimeiqApi.post("/registrar", formData);

    return data;
  } catch (error) {
    console.error("Error de red:", error);
  }
};



// --------------------- CATALOGOS ---------------------

interface GetAllCatalogoProps {
  page: number;
  perPage: number;
  catalogoBuscado: string;
}


export const getCatalogo = async ({ page, perPage, catalogoBuscado }: GetAllCatalogoProps) => {
  try {

    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('perPage', perPage.toString());
    params.append('catalogo', catalogoBuscado);

    const { data } = await crimeiqApi.get(`/catalogo`, { params });
    return data;
  } catch (error) {
    console.error("Error de red:", error);
  }

  return undefined; // Add return statement here
}


interface EditRolesUsuarioFormData{
  _id: { $oid: string };
  role:string
  catalogo?: string;
  activo?: boolean;
}

interface EditTiposTareasFormData{
  _id: { $oid: string };
  actividad:string
  catalogo?: string;
  activo?: boolean;
}


export const updateCatalogo = async (formdata:EditRolesUsuarioFormData | EditTiposTareasFormData) => {
  console.log("Datos del formulario:", formdata);
  try {
    const { data } = await crimeiqApi.put("/catalogo", formdata);
    return data;
  } catch (error) {
    console.error("Error de red:", error);
  }

  return undefined; // Add return statement here
}

export const newOptionCatalogo = async (formdata:EditRolesUsuarioFormData | EditTiposTareasFormData) => {
  console.log('Esta es la funcion post')
  console.log("Datos del formulario:", formdata);
  try {
    const { data } = await crimeiqApi.post("/catalogo", formdata);
    return data;
  } catch (error) {
    console.error("Error de red:", error);
  }

  return undefined; // Add return statement here
}