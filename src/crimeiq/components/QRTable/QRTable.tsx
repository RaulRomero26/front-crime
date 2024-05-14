import { useGetAllQR } from "../../hooks/QR/useGetAllQR";
import { GenerateTable } from "../GenerateTable/GenerateTable";


export const QRTable = () => {

  const { isLoading, qrs, isFetching } = useGetAllQR({perPageReq: 1000});

  if(!isFetching && !isLoading) {
    console.log(qrs.qrs[0]);//Asi accedemos a la data que nos regresa el endpoint
  }

  return (
    (!isFetching && !isLoading) && (
      <GenerateTable lugar='all-qrs' data={qrs.qrs[0].data} />
    )
  );
  
  }
