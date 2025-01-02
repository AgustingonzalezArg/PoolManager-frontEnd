import { Card, Col, Flex, Progress, Row, Typography } from "antd"
import { NonPayment } from "../components/NonPayment"
import { InfoCircleFilled, LineChartOutlined } from "@ant-design/icons"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchNotPayments } from "../service/tanstackQuery"
const {Title, Text} = Typography


type Props = {}

export const User = (props: Props) => {
const [check, setCheck] = useState<number[]>([])
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

  const handleCheck = (check: number[]): void => {
    setCheck(check)
    console.log(check)
  }

  const {isError: ErrorNonPayments, refetch, isLoading, data: dataNonPayments} = useQuery({
    queryKey: ['notPayments'],
    queryFn: async () => fetchNotPayments(1)
})
  return (
    <div>
      <Title style={{textAlign: "center", padding: "15px"}}>User</Title>
      <Row justify="start" gutter={[16, 16]} style={{ margin: "10px" }}>
          <Col xs={{ span: 24, offset: 0 }} sm={{ span: 18, offset: 3 }} md={{span: 12, offset: 0}} lg={{ span: 8, offset: 0 }}>
            <Card style={{ boxShadow: "1px 1px 5px grey", padding: "12px"}}>
              <Flex justify="space-around" align="center" style={{height: "95px"}}>
                <div>
                  <LineChartOutlined style={{ fontSize: "2.7rem", color: "yellowgreen" }} />
                  <Title level={2} style={{ fontSize: "1.3rem" }}>Earnings</Title>
                </div>
                <div>
                  <Title level={3} style={{ fontSize: "1rem" }}>{monthNames[new Date().getMonth()]}</Title>
                  <Text style={{ fontSize: "1.3rem", fontWeight: "bold" }}>${560000}</Text>
                </div>
              </Flex>
            </Card>
          </Col>

          <Col xs={{ span: 24, offset: 0 }} sm={{ span: 18, offset: 3 }} md={{span: 12, offset: 0}} lg={{ span: 8, offset: 0 }}>
            <Card style={{ boxShadow: "1px 1px 5px grey", padding: "12px"}}>
              <Flex justify="space-around" align="center" style={{height: "95px"}}>
                <div>
                  <Progress type="circle" percent={85} size={55} strokeWidth={10} style={{ padding: "0 0 2px 15px" }} />
                  <Title level={2} style={{ fontSize: "1.3rem" }}>Collected</Title>
                </div>
                <Text style={{ fontSize: "1.3rem", fontWeight: "bold" }}>$550000</Text>
              </Flex>
            </Card>
          </Col>

          <Col xs={{ span: 24, offset: 0 }} sm={{ span: 18, offset: 3 }} md={{span: 24, offset: 0}} lg={{ span: 8, offset: 0 }}>
            <Card style={{ boxShadow: "1px 1px 5px grey", padding: "12px"}}>
              <Flex justify="space-around" align="center" style={{height: "95px"}}>
                <div>
                  <Title level={2} style={{ fontSize: "1.3rem" }}>To Collect</Title>
                  <Text style={{ fontSize: "1.3rem", fontWeight: "bold" }}>$100000</Text>
                </div>
                <InfoCircleFilled style={{ fontSize: "3.5rem", color: "#dfc926" }} />
              </Flex>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={23} offset={1}>
            <Title level={3}>Non Payments</Title>
          </Col>
          { dataNonPayments?.length === 0 && !ErrorNonPayments &&
          <Col xs={{span: 20, offset: 2}} sm={{span: 20, offset: 2}} lg={{span:18, offset: 2}}>
            <Title level={4} style={{}}> All your pools charged! Excelent</Title>
          </Col>
          }
          { dataNonPayments?.length > 0 && !ErrorNonPayments &&
          <Col xs={{span: 24}} sm={{span: 20, offset: 2}} lg={{span:18, offset: 2}}>
            <NonPayment onCheck={handleCheck} DataNonPayments={dataNonPayments} loading={isLoading}/>
          </Col>
          }
          {ErrorNonPayments &&
            <Col xs={{span: 20, offset: 1}} sm={{span: 20, offset: 2}} lg={{span:18, offset: 2}}>
             <Title level={4}> Non payments error </Title>
            </Col>
          }
        </Row>

  
    </div>
  )
}