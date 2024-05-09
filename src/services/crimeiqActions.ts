import { crimeiqApi } from "../api/crimeiqApi";

interface GenerarQrResponse {
  ok: boolean;
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
