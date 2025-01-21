import { Key, useState } from "react"
import { dataColumnsType } from "../pages/HomePage"
import { deleteNonPayments, DeleteNotPayment, UpdatePayment, UpdatePaymentList } from "../fetchs/payment"
import { useNotPayments } from "./useNotPayments"
import { useDataCleaning } from "./useDataCleaning"
import { TableProps } from "antd"

export const useMethodHomePage = () => {
    const [check, setCheck] = useState<number[]>([])
    const [resetCheck, setResetCheck] = useState<number>(0)
    const [openModalDeletePayment, setOpenModalDeletePayment] = useState<boolean>(false)
    const [cleaning, setCleaning] = useState<dataColumnsType>()
    const [RowSelected, setRowSelected] = useState<Key[]>([])
    const {refetch} = useNotPayments()
    const {dataCleaning, refetchCleaning} = useDataCleaning()

    const rowSelection: TableProps<dataColumnsType>['rowSelection'] = {
        selectedRowKeys: RowSelected,
        onChange: (selectedRowKeys: React.Key[]) => {
            setRowSelected(selectedRowKeys)
            console.log(selectedRowKeys)
        }
    };

    const handleCheck = (check: number[]): void => {
        setCheck(check)
        console.log(check)
    }
    
    const handleClicDelete = async (idUser: number, check: number[]): Promise<void> => {
        const listPayments: DeleteNotPayment[] = check.map(id => ({
            id,
            payment: true
        }))
        await deleteNonPayments(idUser, listPayments)
        setResetCheck(val => val + 1)
        await refetch()
        console.log("datos pedidos")
    }
    
    const paidForCleaned = async (idUser: number, payment: boolean): Promise<void> =>  {
        const clientsSelected = dataCleaning?.filter(client => RowSelected.includes(client.id))
        if(clientsSelected) {
            const listUpdatePaymentData: UpdatePayment[] = clientsSelected.map(cleaning => ({
                id: cleaning.id,
                cleaning: true,
                payment,
            }))
            const Payments = await UpdatePaymentList(idUser, listUpdatePaymentData)
            console.log("Payments Updated", Payments)
            refetchCleaning()
            refetch()
            setRowSelected([])
        }
    }
    
    const handleOpenModalDeletePayment = (cleaning:dataColumnsType ):void => {
        setOpenModalDeletePayment(true)
        setCleaning(cleaning)
    }

    const closeModalDeletePayment = ():void => {
        setOpenModalDeletePayment(false)
    }

    return {
    check,
    resetCheck, 
    openModalDeletePayment,
    cleaning,
    RowSelected,
    rowSelection,
    handleCheck,
    handleClicDelete,
    paidForCleaned,
    handleOpenModalDeletePayment,
    closeModalDeletePayment,
    }
}