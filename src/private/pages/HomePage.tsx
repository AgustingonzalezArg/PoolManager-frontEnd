import { Card, Col, Flex, Progress, Row, Table, TableProps, Typography } from "antd"
import "../../index.css"

const { Title, Text} = Typography

type Props = {}

type columnsType = {
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


    const dataClients: dataColumnsType[] = [
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
    ]


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
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: DataType) => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        }),
      };
      

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
                                        minWidth: "200px", 
                                        minHeight: "132px",
                                        display: "inline-block"}} 
                                    bordered={false}>
                                    <Title 
                                        level={2}  
                                        style={{fontSize: "1.2rem", color: "#e7f0f9"}} >
                                        Pools of the Day
                                    </Title>
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
                                        minWidth:"200px", 
                                        display: "inline-block",
                                        minHeight: "132px",}} 
                                    bordered={false}>
                                    <Title 
                                        level={2} 
                                        style={{marginBottom: 0 , fontSize: "1.2rem", color: "#e7f0f9"}} >
                                        Billing
                                    </Title>
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
            <Row style={{padding: "25px"}}
                gutter={[15, 15]}
                >
                <Col xs={24} md={12}>
                <Title level={2}>Clients</Title>
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
                <Title level={2}>Clients</Title>
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
            </Row>
    </div>
  )
}