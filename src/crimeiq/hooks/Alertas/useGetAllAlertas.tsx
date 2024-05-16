import { useQuery } from '@tanstack/react-query'
import { crimeiqActions } from '../../../services/'
import { useState } from 'react';

interface GetAllAlertasProps {
    perPageReq: number
}

export const useGetAllAlertas = ({perPageReq}:GetAllAlertasProps) => {

    const [page, setPage] = useState(1);
    const [perPage,setPerPage] = useState(perPageReq)

    const { isLoading, isError, error, data: alertas = [], isFetching} = useQuery({
        queryKey: ['alertas',{page,perPage}],
        queryFn: () => crimeiqActions.useGetAllAlertas({page,perPage}),
        staleTime: 1000 * 60 * 60,
    })
 
    const nextPage = () => {
        if(alertas.data.quizes.length === 0) return;

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
        alertas,
        page,
        nextPage,
        prevPage
    }
}
