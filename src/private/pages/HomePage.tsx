import { Card, Col, Flex, Progress, Row, Table, TableProps, Typography } from "antd"
import "../../index.css"
import { NonPayment } from "../components/NonPayment"
import { CarryOutOutlined, DeleteFilled, DollarOutlined } from "@ant-design/icons"
import { Key, useEffect, useState } from "react"
import { AffixPoolFinished } from "../components/modals/AffixPoolFinished"
import { DeleteNonPayment } from "../components/modals/DeleteNonPayment"
import { useQuery } from "@tanstack/react-query"
import { deleteNonPayments, DeleteNotPayment, fetchNotPayments, fetchPaymentsPerDay, Payment, UpdatePayment, UpdatePaymentList } from "../fetchs/payment"
import { DeletePaymentModal } from "../components/modals/DeletePaymentModal"


const { Title, Text} = Typography

export type columnsType = {
    title: string
    dataIndex: string
    key: string
    render?: (arg: any, dataType: dataColumnsType) => JSX.Element
}

export type dataColumnsType = {
    id: number
    name: string
    neighborhood: string
    price: number
    payment: boolean
    cleaning: boolean
}

export const HomePage  = () => {
    const [RowSelected, setRowSelected] = useState<Key[]>([])
    const [check, setCheck] = useState<number[]>([])
    const [dataColumns, setDataColumns] = useState<dataColumnsType[] | []>([])
    const [resetCheck, setResetCheck] = useState<number>(0)
    const [percent, setPercent] = useState<number>(0)
    const [dataNonPaymentsList, setDataNonPaymentsList] = useState<Payment[]>()
    const [openModalDeletePayment, setOpenModalDeletePayment] = useState<boolean>(false)
    const [cleaning, setCleaning] = useState<dataColumnsType>()

    const {isError: ErrorNonPayments, refetch, isLoading, data: dataNonPayments,} = useQuery({
        queryKey: ['notPayments'],
        queryFn: async () => fetchNotPayments(1),
    })

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
        
    useEffect(() => {
      if(dataNonPayments){
        setDataNonPaymentsList(dataNonPayments.filter(payment => payment.cleaning === true))
        console.log("data actualizada")
      }
    }, [dataNonPayments])
    
    const clientsColumns : columnsType[] = [
        {
            title: "Name ",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Neighborhood",
            dataIndex: "neighborhood",
            key: "neighborhood",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title:"Delete",
            dataIndex:"delete",
            key:"delete",
            render:(_: any, cleaning: dataColumnsType) => (
                <div style={{display:"flex", justifyContent:"center", }}>
                            <DeleteFilled 
                                style={{color: "#b61212"}} 
                                className="hover_DeleteFilled" 
                                onClick={ () => handleOpenModalDeletePayment(cleaning)}/>
                        </div>
                    )
        }
    ]
            
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
    
    const handleClicDelete = async (idUser: number, check: number[]) => {
        const listPayments: DeleteNotPayment[] = check.map(id => ({
            id,
            payment: true
        }))
        await deleteNonPayments(idUser, listPayments)
        setResetCheck(val => val + 1)
        await refetch()
        console.log("datos pedidos")
    }
    
    const paidForCleaned = async (idUser: number, payment: boolean) =>  {
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

  return (
    <div>
            <Row >
                <Col span={24} style={{padding: "10px"}}>
                    <Title style={{textAlign: "center"}}>PoolManager</Title>
                    <Row justify="center" gutter={[16, 16]}>
                        <Col xs={24} sm={12} md={8}>
                            <Row justify={"center"}>
                                <Card 
                                    style={{backgroundColor: "#63acf2", 
                                        minWidth: "223px", 
                                        minHeight: "132px",
                                        display: "inline-block"}} 
                                        bordered={false}>
                                        <Flex wrap gap={"small"} justify="space-between" align="center">
                                            <Title 
                                                level={2}  
                                                style={{fontSize: "1.2rem", color: "#e7f0f9"}} >
                                                Pools of the Day
                                            </Title>
                                            <CarryOutOutlined style={{fontSize: "1.5rem", color:"white"}}/>
                                        </Flex>
                                    <Flex wrap gap={"small"} justify="space-around" align="center">
                                        <Text 
                                            style={{fontSize: "2rem", fontWeight: 700, color: "#e7f0f9"}}> 
                                            {dataCleaning?.length}
                                        </Text>
                                        <Progress type={"circle"} percent={percent} size={45} format={(Percent)=> (
                                            <span style={{color: "white", fontWeight: "bold"}}>{Percent}%</span>
                                        )} /> 
                                    </Flex>

                                </Card>
                            </Row>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Row justify={"center"}>
                                <Card
                                    style={{backgroundColor: "#63acf2", 
                                        minWidth:"223px", 
                                        display: "inline-block",
                                        minHeight: "132px",}} 
                                        bordered={false}>
                                        <Flex wrap gap={"small"} justify="space-between" align="center">
                                            <Title 
                                                level={2} 
                                                style={{marginBottom: 0 , fontSize: "1.2rem", color: "#e7f0f9"}} >
                                                Billing
                                            </Title>
                                            <DollarOutlined style={{fontSize:"1.5rem", color:"white"}}/>
                                        </Flex>
                                    <Text 
                                        style={{fontSize: "2rem", fontWeight: 700, color: "#e7f0f9"}}> 
                                        $ {dataCleaning?.reduce((sum, client) => sum + client.price, 0)}
                                    </Text>
                                </Card>
                            </Row>
                        </Col> 
                    </Row>
                </Col>
            </Row>
            <Row style={{padding: "25px", margin: 0}}
                gutter={[15, 15]}
                >
                <Col xs={24} md={12}>
                <Title level={2}>Pools of the Day</Title>
                {(dataCleaning || LoadingCleanings) && 
                <Table 
                    rowKey={"id"}
                    loading={LoadingCleanings}
                    columns={clientsColumns} 
                    dataSource={dataColumns} 
                    rowSelection={rowSelection}
                    pagination={{pageSize: 10}}
                    size="small"
                    rowClassName={(cli, index) => {
                        const rowClass = index % 2 === 0 ? "even-row" : "odd-row"
                        if(cli.cleaning) {
                            return `${rowClass} disable-row`
                        }
                        return rowClass
                    }}
                    style={{boxShadow: "1px 1px 5px black", overflow: "hidden", borderRadius: "10px"}}
                    >
                </Table>

                }
                {ErrorCleaning && 
                <>
                <Title level={4}> Client Loading Error</Title>
                </>}
                </Col>
                <Col xs={24} md={12}>
                    <Title level={2}>Non Payments</Title>

                    {ErrorNonPayments && 
                    <>
                        <Title level={4}style={{textAlign:"center"}}>
                            Payments Loading Error
                        </Title>
                    </>}
                    {
                        dataNonPaymentsList?.length === 0 ? 
                        <Col>
                            <Title level={4} style={{}}> All your pools charged! Excelent</Title>
                        </Col>
                        :
                        <NonPayment onCheck={handleCheck} DataNonPayments={dataNonPaymentsList} loading={isLoading} resetCheck={resetCheck}/>
                    }
                </Col>
            </Row>
            { 
            RowSelected.length > 0 && (check.length > 0 || check.length === 0) && (
                <AffixPoolFinished onMarkAsNotPaid={() => paidForCleaned(1, false)} onMarkAsPaid={() => paidForCleaned(1, true)} />
            )
            }
            {   
            check.length > 0 && RowSelected.length === 0 && (
                <DeleteNonPayment handleClic={() => handleClicDelete(1, check)}/>
            )}
            <DeletePaymentModal 
                OpenModalDeletePayment={openModalDeletePayment} 
                cleaning={cleaning} 
                onCloseModalDeletePayment={() => setOpenModalDeletePayment(false)}
                onRefetchPaymentList={() => refetchCleaning()}/>
    </div>
  )
}