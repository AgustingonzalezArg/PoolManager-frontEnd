import { useQuery } from "@tanstack/react-query";
import { fetchPaymentsPerDay } from "../fetchs/payment";
import { useEffect, useState } from "react";
import { dataColumnsType } from "../pages/HomePage";

export const useDataCleaning = () => {
    const [dataColumns, setDataColumns] = useState<dataColumnsType[] | []>([])
    const [percent, setPercent] = useState<number>(0)

    const {isError: ErrorCleaning, refetch: refetchCleaning, isLoading: LoadingCleanings, data: dataCleaning  } = useQuery({
        queryKey: ['clients'],
        queryFn: async () => fetchPaymentsPerDay(1, new Date().toISOString().split('T')[0])
    })
    
    useEffect(() => {
            if (dataCleaning && Array.isArray(dataCleaning)) {
                const newDataColumns: dataColumnsType[] = dataCleaning.map(pool => ({
                    id: pool?.id ?? null,
                    name: pool?.client?.name ?? 'Unknown',
                    neighborhood: pool?.client?.neighborhood ?? 'Unknown',
                    price: pool?.price ?? 0,
                    cleaning: pool?.cleaning ?? false,
                    payment: pool?.payment ?? false
                }));
                setDataColumns(newDataColumns);
                const poolsFinished = newDataColumns.filter(pool => pool.cleaning === true)
                setPercent(Math.round((poolsFinished.length *100) / newDataColumns.length))
            };
        }, [dataCleaning]);
         
    return {
        dataColumns,
        percent,
        dataCleaning,
        ErrorCleaning,
        refetchCleaning,
        LoadingCleanings
    }
}