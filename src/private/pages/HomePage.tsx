import { Card, Col, Flex, Progress, Row, Table, TableProps, Typography } from "antd"
import "../../index.css"
import { NonPayment } from "../components/NonPayment"
import { CarryOutOutlined, DollarOutlined } from "@ant-design/icons"
import { Key, useState } from "react"
import { AffixPoolFinished } from "../components/modals/AffixPoolFinished"
import { DeleteNonPayment } from "../components/modals/DeleteNonPayment"

const { Title, Text} = Typography

type Props = {}

export type columnsType = {
    title: string
    dataIndex: string
    key: string
}

type dataColumnsType = {
    key: string
    name: string,
    neighborhood: string,
    price: number,
    status: boolean
}

export const HomePage  = (props: Props) => {
    const [RowSelected, setRowSelected] = useState<Key[]>([])
    const [check, setCheck] = useState<number[]>([])

    const [dataClients, setDataClient] = useState <dataColumnsType[]> ([
        {
            key: "1",
            name: "Nicolas",
            neighborhood: "4 hojas",
            price: 15000,
            status: false
        },
        {
            key: "2",
            name: "jaun",
            neighborhood: "4 hojas",
            price: 15000,
            status: false
        },
        {
            key: "3",
            name: "Mateo",
            neighborhood: "4 hojas",
            price: 15000,
            status: false
        },
        {
            key: "4",
            name: "Mateo",
            neighborhood: "4 hojas",
            price: 15000,
            status: false
        },
        {
            key: "5",
            name: "Mateo",
            neighborhood: "4 hojas",
            price: 15000,
            status: false
        },
        {
            key: "6",
            name: "Mateo",
            neighborhood: "4 hojas",
            price: 15000,
            status: false
        },
        {
            key: "7",
            name: "Mateo",
            neighborhood: "4 hojas",
            price: 15000,
            status: false
        },
        {
            key: "8",
            name: "Mateo",
            neighborhood: "4 hojas",
            price: 15000,
            status: false
        },
        {
            key: "9",
            name: "Mateo",
            neighborhood: "4 hojas",
            price: 15000,
            status: false
        },
        {
            key: "10",
            name: "Mateo",
            neighborhood: "4 hojas",
            price: 15000,
            status: true
        },
        {
            key: "11",
            name: "Mateo",
            neighborhood: "4 hojas",
            price: 15000,
            status: true
        }
    ])

    const [DataNonPayments, setDataNonPayments] = useState<NonPayment[]>([
        {
            key: 1,
            name: "juan",
            neighborhood: "a",
            date: "10/05",
            price: 9500,
        },
        {
            key: 2,
            name: "pedro",
            neighborhood: "aut",
            date: "12/05",
            price: 12000,
        },
        {
            key: 3,
            name: "carla",
            neighborhood: "aut",
            date: "14/05",
            price: 15000,
        },
        {
            key: 4,
            name: "carla",
            neighborhood: "aut",
            date: "14/05",
            price: 15000,
        },
        {
            key: 5,
            name: "carla",
            neighborhood: "aut",
            date: "14/05",
            price: 15000,
        },
        {
            key: 6,
            name: "carla",
            neighborhood: "aut",
            date: "14/05",
            price: 15000,
        }
    ])
  

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
    }

    const handleClicDelete = () => {
        for( const nonPayment of check) {
             setDataNonPayments((prev) => {
                return prev.filter(e => e.key !== nonPayment)
             })
        }
        setCheck([])
        console.log("elementos borrados")
 
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
                                            5 
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
                                        $50000
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
                <Table 
                    columns={clientsColumns} 
                    dataSource={dataClients} 
                    rowSelection={rowSelection}
                    pagination={{pageSize: 10}}
                    size="small"
                    rowClassName={(_, index) => (index % 2 === 0 ? "even-row" : "odd-row")}
                    style={{boxShadow: "1px 1px 5px black", overflow: "hidden", borderRadius: "10px"}}
                    />
                </Col>
                <Col xs={24} md={12}>
                    <Title level={2}>Non Payments</Title>
                    <NonPayment onCheck={handleCheck} DataNonPayments={DataNonPayments}/>
                </Col>
            </Row>
            { 
            RowSelected.length > 0 && (check.length > 0 || check.length === 0) && (
                <AffixPoolFinished />
            )
            }
            {
            check.length > 0 && RowSelected.length === 0 && (
                <DeleteNonPayment handleClic={handleClicDelete} />
            )
            }
    </div>
  )
}