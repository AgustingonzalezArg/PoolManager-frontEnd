import { Client } from "../pages/Clients"

export type CreatePayment = {
    idClient: number
    date: Date
    price: number
    cleaning: boolean
    payment: boolean
}

export type Payment = {
    id: number
    name: string
    date: string
    price: number
    payment: boolean
    cleaning: boolean
    client: Client
}

export type UpdatePayment = {
    id: number
    cleaning: boolean
    payment: boolean
}

export type DeleteNotPayment = {
    id: number
    payment: true
}

export const fetchNotPayments = async (userId: number): Promise<Payment[]> => {
    return await fetch(`http://localhost:3000/payments/notpayments/${userId}`)
    .then(res => {
        if(!res.ok) throw new Error("Payments loading error")
        return res.json()
    })
}

export const fetchPaymentsPerDay = async (userId: number, date: string): Promise<Payment[]> => {
    return await fetch(`http://localhost:3000/payments/day/${userId}/${date}`)
    .then(res => {
        if(!res.ok) throw new Error("Payments loading error")
        return res.json()
    })
}

export const fetchPaymentsPerMonth = async (userId: number, month: number): Promise<Payment[]> => {
    return await fetch(`http://localhost:3000/payments/month/${userId}/${month}`)
    .then(res => {
        if(!res.ok) throw new Error("Payments loading error")
        return res.json()
    })
}

export const deleteNonPayments = async (idUser: number, paymentsList: DeleteNotPayment[]): Promise<Payment[]> => {
    return await fetch(`http://localhost:3000/payments/${idUser}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(paymentsList)
    })
    .then(res => {
        if(!res.ok) throw new Error("change payment error")
        return res.json()
    })
}

export const newPayment = async (idUser: number, listClientData: CreatePayment[]): Promise<CreatePayment[]> => {
    return await fetch(`http://localhost:3000/payments/${idUser}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(listClientData)
    })
    .then(res => {
        if(!res.ok) throw new Error("change payment error")
        return res.json()
    })
}

export const UpdatePaymentList = async (idUser: number, updatePaymentList: UpdatePayment[]): Promise<CreatePayment[]> => {
    return await fetch(`http://localhost:3000/payments/${idUser}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(updatePaymentList)
    })
    .then(res => {
        if(!res.ok) throw new Error("change payment error")
        return res.json()
    })
}

export const deletePayments = async (idUser: number, paymentId: number): Promise<any> => {
    return await fetch(`http://localhost:3000/payments/delete/${idUser}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify({paymentId})
    })
    .then(res => {
        if(!res.ok) throw new Error("remove payment error")
        return res.json()
    })
}