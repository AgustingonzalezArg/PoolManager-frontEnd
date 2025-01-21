import { Card, Col, Flex, Progress, Row, Typography } from "antd"
import "../../index.css"
import { NonPayment } from "../components/NonPayment"
import { CarryOutOutlined, DollarOutlined } from "@ant-design/icons"
import { AffixPoolFinished } from "../components/modals/AffixPoolFinished"
import { DeleteNonPayment } from "../components/modals/DeleteNonPayment"
import { DeletePaymentModal } from "../components/modals/DeletePaymentModal"
import { PoolsDay } from "../components/PoolsDay"
import { useDataCleaning } from "../hooks/useDataCleaning"
import { useNotPayments } from "../hooks/useNotPayments"
import { useMethodHomePage } from "../hooks/useMethodHomePage"


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

    const { dataColumns,
        percent,
        dataCleaning,
        ErrorCleaning,
        refetchCleaning,
        LoadingCleanings} = useDataCleaning()

    const {
        dataNonPaymentsList, 
        ErrorNonPayments,
        isLoading} = useNotPayments()

    const {check,
        resetCheck, 
        openModalDeletePayment,
        cleaning,
        RowSelected,
        rowSelection,
        handleCheck,
        handleClicDelete,
        paidForCleaned,
        handleOpenModalDeletePayment,
        closeModalDeletePayment} = useMethodHomePage()

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
                    <PoolsDay dataColumns={dataColumns} OnHandleOpenModalDeletePayment={handleOpenModalDeletePayment} rowSelection={rowSelection} LoadingCleanings={LoadingCleanings} />
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
                onCloseModalDeletePayment={closeModalDeletePayment}
                onRefetchPaymentList={() => refetchCleaning()}/>
    </div>
  )
}