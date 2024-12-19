import { Card, Col, Flex, Progress, Row, Table, TableProps, Typography } from "antd"
import "../../index.css"
import { NonPayment } from "../components/NonPayment"
import { CarryOutOutlined, DollarOutlined } from "@ant-design/icons"
import { Key, useState } from "react"
import { AffixPoolFinished } from "../components/modals/AffixPoolFinished"
import { DeleteNonPayment } from "../components/modals/DeleteNonPayment"
import { useQuery } from "@tanstack/react-query"

const { Title, Text} = Typography

export type columnsType = {
    title: string
    dataIndex: string
    key: string
}

type ClientsType = {
    id: number; 
    name: string;
    neighborhood: string;
    price: number;
    periodicity: number;
    CleanToday: boolean
    CleanTomorrow: boolean
    phoneNumber: string;
}

const fetchNotPayments = async (userId: number): Promise<NonPayment[]> => {
    return await fetch(`http://localhost:3000/payments/notpayments/${userId}`)
    .then(res => {
        if(!res.ok) throw new Error("Payments loading error")
        return res.json()
    })
}

const fetchClients = async (userId: number): Promise<ClientsType[]> => {
    return await fetch(`http://localhost:3000/clients/cleantoday/${userId}`)
    .then(res => {
        if(!res.ok) throw new Error("Clients loading error")
        return res.json()
    })
}

export const HomePage  = () => {
    const {isError: ErrorNonPayments, refetch, isLoading, data: dataNonPayments} = useQuery({
        queryKey: ['notPayments'],
        queryFn: async () => fetchNotPayments(17)
    })

    const {isError: ErrorClients, refetch: refetchClient, isLoading: LoadingClients, data: dataClients  } = useQuery({
        queryKey: ['clients'],
        queryFn: async () => fetchClients(17)
    })
    const [RowSelected, setRowSelected] = useState<Key[]>([])
    const [check, setCheck] = useState<number[]>([])

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
        }
    ]

    const rowSelection: TableProps<DataType>['rowSelection'] = {
        selectedRowKeys: RowSelected,
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            setRowSelected(selectedRowKeys)
        }
      };
      

    const handleCheck = (check: number[]): void => {
        setCheck(check)
        console.log(check)
    }

    const handleClicDelete = async (idUser: number, check: number[]) => {
        await fetch(`http://localhost:3000/payments/${idUser}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({check})
        })
        .then(res => {
            if(!res.ok) throw new Error("change payment error")
            return res.json
        })
        console.log("elementos borrados")
        setCheck([])
        refetch()
 
     }

  return (
    <div>
            <Row >
                <Col span={24} style={{padding: "10px"}}>
                    <Title style={{textAlign: "center"}}>PoolManager</Title>
                    <Row justify="start" gutter={[16, 16]}>
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
                                            {dataClients?.length}
                                        </Text>
                                        <Progress type={"circle"} percent={25} size={45} format={(Percent)=> (
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
                                        $ {dataClients?.reduce((sum, client) => sum + client.price, 0)}
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
                {(dataClients || LoadingClients) && 
                <Table 
                    rowKey={"id"}
                    loading={LoadingClients}
                    columns={clientsColumns} 
                    dataSource={dataClients} 
                    rowSelection={rowSelection}
                    pagination={{pageSize: 10}}
                    size="small"
                    rowClassName={(_, index) => (index % 2 === 0 ? "even-row" : "odd-row")}
                    style={{boxShadow: "1px 1px 5px black", overflow: "hidden", borderRadius: "10px"}}
                    />
                }
                {ErrorClients && 
                <>
                <Title level={4}> Client Loading Error</Title>
                </>}
                </Col>
                <Col xs={24} md={12}>
                    <Title level={2}>Non Payments</Title>
                    <NonPayment onCheck={handleCheck} DataNonPayments={dataNonPayments} loading={isLoading}/>
                    {ErrorNonPayments && 
                    <>
                        <Title level={4}style={{textAlign:"center"}}>
                            Payments Loading Error
                        </Title>
                    </>}
                </Col>
            </Row>
            { 
            RowSelected.length > 0 && (check.length > 0 || check.length === 0) && (
                <AffixPoolFinished />
            )
            }
            {
            check.length > 0 && RowSelected.length === 0 && (
                <DeleteNonPayment handleClic={() => handleClicDelete(17, check)}/>
            )
            }
    </div>
  )
}