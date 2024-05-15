import { useQuery } from '@tanstack/react-query'
import { crimeiqActions } from '../../../services/'
import { useState } from 'react';

interface GetAllReportesTareasProps {
    perPageReq: number
}

export const useGetAllReportesIncidencia = ({perPageReq}:GetAllReportesTareasProps) => {

    const [page, setPage] = useState(1);
    const [perPage,setPerPage] = useState(perPageReq)

    const { isLoading, isError, error, data: reportes = [], isFetching} = useQuery({
        queryKey: ['reportes',{page,perPage}],
        queryFn: () => crimeiqActions.useGetAllReportesIncidencia({page,perPage}),
        staleTime: 1000 * 60 * 60,
    })
 
    const nextPage = () => {
        if(reportes.data.quizes.length === 0) return;

        setPage(page +1)
    }

    const prevPage = () => {
        if(page > 1) setPage(page -1);
    }
 
    return {
        error,
        isError,
        isFetching,
        isLoading,
        reportes,
        page,
        nextPage,
        prevPage
    }
}
