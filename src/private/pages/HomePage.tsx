import { Col, Row, Table, Typography } from "antd"
import { Nav } from "../components/Nav"

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
    price: number
}

export const HomePage  = (props: Props) => {


    const dataClients: dataColumnsType[] = [
        {
            key: "1",
            name: "Nicolas",
            neighborhood: "4 hojas",
            price: 15000
        },
        {
            key: "2",
            name: "jaun",
            neighborhood: "4 hojas",
            price: 15000
        },
        {
            key: "3",
            name: "Mateo",
            neighborhood: "4 hojas",
            price: 15000
        }
    ]


    const clientsColumns : columnsType[] = [
        {
            title: "Name",
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

  return (
    <div>
            <Row >
                <Col span={24}>
                    <Title style={{textAlign: "center"}}>Pools of the Day</Title>
                    <Row align={"middle"} justify={"center"}>
                        <Col span={8} style={{display: "flex", justifyContent: "center"}}><Text style={{fontSize: "3rem", fontWeight: 700}} strong>5</Text></Col>
                        <Col span={16} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <Title level={4} style={{marginTop: "0"}}> Billing</Title>
                            <Text strong> $50000</Text>
                        </Col> 
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col xs={24} md={12}>
                <Title level={2}>Clients</Title>
                <Table columns={clientsColumns} dataSource={dataClients} pagination={false}/>
                </Col>
                <Col xs={24} md={12}></Col>
            </Row>
    </div>
  )
}