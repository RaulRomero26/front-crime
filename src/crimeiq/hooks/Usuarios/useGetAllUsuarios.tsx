import { useQuery } from '@tanstack/react-query'
import { crimeiqActions } from '../../../services/'
import { useState } from 'react';

interface GetAllUsuariosProps {
    perPageReq: number
}

export const useGetAllUsuarios = ({perPageReq}:GetAllUsuariosProps) => {

    const [page, setPage] = useState(1);
    const [perPage,setPerPage] = useState(perPageReq)

    const { isLoading, isError, error, data: usuarios = [], isFetching} = useQuery({
        queryKey: ['usuarios',{page,perPage}],
        queryFn: () => crimeiqActions.useGetAllUsuarios({page,perPage}),
        staleTime: 1000 * 60 * 60,
    })
 
    const nextPage = () => {
        if(usuarios.data.quizes.length === 0) return;

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
        usuarios,
        page,
        nextPage,
        prevPage
    }
}
