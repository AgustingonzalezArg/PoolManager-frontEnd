import { NonPayment } from "../components/NonPayment"

export const fetchNotPayments = async (userId: number): Promise<NonPayment[]> => {
    return await fetch(`http://localhost:3000/payments/notpayments/${userId}`)
    .then(res => {
        if(!res.ok) throw new Error("Payments loading error")
        return res.json()
    })
}