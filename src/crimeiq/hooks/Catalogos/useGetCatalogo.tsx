import { useQuery } from '@tanstack/react-query'
import { crimeiqActions } from '../../../services/'
import { useState } from 'react';

interface GetAllCatalogoProps {
    perPageReq: number
    catalogoBuscado: string;
}

export const useGetCatalogo = ({perPageReq,catalogoBuscado}:GetAllCatalogoProps) => {

    const [page, setPage] = useState(1);
    const [perPage,_setPerPage] = useState(perPageReq)

    const { isLoading, isError, error, data: catalogo = [], isFetching} = useQuery({
        queryKey: [`catalogo-${catalogoBuscado}`,{page,perPage,catalogoBuscado}],
        queryFn: () => crimeiqActions.getCatalogo({page,perPage,catalogoBuscado}),
        staleTime: 1000 * 60 * 60,
    })
 
    const nextPage = () => {
        if(catalogo.data.quizes.length === 0) return;

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
        catalogo,
        page,
        nextPage,
        prevPage
    }
}
