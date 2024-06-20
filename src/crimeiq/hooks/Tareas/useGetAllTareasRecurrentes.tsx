import { useQuery } from '@tanstack/react-query'
import { crimeiqActions } from '../../../services/'
import { useState } from 'react';

interface GetAllTareasProps {
    perPageReq: number
}

export const useGetAllTareasRecurrentes = ({perPageReq}:GetAllTareasProps) => {

    const [page, setPage] = useState(1);
    const [perPage,_setPerPage] = useState(perPageReq)

    const { isLoading, isError, error, data: tareas = [], isFetching} = useQuery({
        queryKey: ['tareas-recurrentes',{page,perPage}],
        queryFn: () => crimeiqActions.useGetAllTareasRecurrentes({page,perPage}),
        staleTime: 1000 * 60 * 60,
    })
 
    const nextPage = () => {
        if(tareas.data.quizes.length === 0) return;

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
        tareas,
        page,
        nextPage,
        prevPage
    }
}
