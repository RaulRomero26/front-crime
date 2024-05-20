import { useQuery } from '@tanstack/react-query'
import { crimeiqActions } from '../../../services/'
import { useState } from 'react';

interface GetAllQRProps {
    perPageReq: number
}

export const useGetAllQR = ({perPageReq}:GetAllQRProps) => {

    const [page, setPage] = useState(1);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [perPage,_setPerPage] = useState(perPageReq)

    const { isLoading, isError, error, data: qrs = [], isFetching} = useQuery({
        queryKey: ['qrs',{page,perPage}],
        queryFn: () => crimeiqActions.useGetAllQR({page,perPage}),
        staleTime: 1000 * 60 * 60,
    })
 
    const nextPage = () => {
        if(qrs.data.quizes.length === 0) return;

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
        qrs,
        page,
        nextPage,
        prevPage
    }
}
