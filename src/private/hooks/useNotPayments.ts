import { useQuery } from "@tanstack/react-query"
import { fetchNotPayments, Payment } from "../fetchs/payment"
import { useEffect, useState } from "react"

export const useNotPayments = () => {
    const [dataNonPaymentsList, setDataNonPaymentsList] = useState<Payment[]>()

    const {isError: ErrorNonPayments, refetch, isLoading, data: dataNonPayments,} = useQuery({
        queryKey: ['notPayments'],
        queryFn: async () => fetchNotPayments(1),
    })

    useEffect(() => {
    if(dataNonPayments){
        setDataNonPaymentsList(dataNonPayments.filter(payment => payment.cleaning === true))
        console.log("data actualizada")
    }
    }, [dataNonPayments])

    return {
        dataNonPayments,
        dataNonPaymentsList, 
        ErrorNonPayments,
        refetch, 
        isLoading
    }
}
