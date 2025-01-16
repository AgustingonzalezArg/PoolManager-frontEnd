import { Card, Col, Flex, Progress, Row, Typography } from "antd"
import { NonPayment } from "../components/NonPayment"
import { InfoCircleFilled, LineChartOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { deleteNonPayments, DeleteNotPayment, fetchNotPayments, fetchPaymentsPerMonth, Payment } from "../fetchs/payment"
import { DeleteNonPayment } from "../components/modals/DeleteNonPayment"
const {Title, Text} = Typography


type Props = {}
export const monthNumber = new Date().getMonth() + 1

export const User = (props: Props) => {
const [check, setCheck] = useState<number[]>([])
const [totalPayment, setTotalPayment] = useState<number>(0)
const [paymentColleted, setPaymentColleted] = useState<number>(0)
const [paymentToCollect, setPaymentToCollect] = useState<number>(0)
const [percentPaymentCollected, setPercentPaymentCollected] = useState<number>(0)
const [resetCheck, setResetCheck] = useState<number>(0)
const [dataNonPaymentsList, setDataNonPaymentsList] = useState<Payment[]>([])
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];



const {isError: ErrorNonPayments, refetch, isLoading, data: dataNonPayments} = useQuery({
  queryKey: ['notPayments'],
  queryFn: async () => fetchNotPayments(1)
})

const {isError: errorPayments, refetch: refetchPayments, data: dataPayments} = useQuery({
  queryKey: ['payments'],
  queryFn: async () => fetchPaymentsPerMonth(1, monthNumber)
})



const handleCheck = (check: number[]): void => {
  setCheck(check)
  console.log(check)
}

useEffect(() => {
  if(dataPayments && !errorPayments) {
  refetchPayments();
  const newTotalPayment =  dataPayments.reduce((sum, payment) => sum + payment.price, 0)
  const filterPaymentColleted = dataPayments.filter(pay => pay.payment === true)
  const newPaymentCollected = filterPaymentColleted.reduce((sum, payment) => sum + payment.price, 0)
  setPercentPaymentCollected(Math.round((newPaymentCollected * 100) / newTotalPayment))
  setTotalPayment(newTotalPayment)
  setPaymentColleted(newPaymentCollected)
  setPaymentToCollect(newTotalPayment - newPaymentCollected)
}
  if(dataNonPayments) {
    setDataNonPaymentsList(dataNonPayments.filter(payment => payment.cleaning === true))
  }
}, [dataPayments, dataNonPayments])

  const handleClicDelete = async (idUser: number, check: number[]) => {
      const listPayments: DeleteNotPayment[] = check.map(id => ({
          id,
          payment: true
      }))
      await deleteNonPayments(idUser, listPayments )
      console.log("elementos borrados")
      setResetCheck(val => val + 1)
      refetch()
  }

  return (
    <div>
      <Title style={{textAlign: "center", padding: "15px"}}>Earnings</Title>
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
                  <Text style={{ fontSize: "1.3rem", fontWeight: "bold" }}>${totalPayment}</Text>
                </div>
              </Flex>
            </Card>
          </Col>

          <Col xs={{ span: 24, offset: 0 }} sm={{ span: 18, offset: 3 }} md={{span: 12, offset: 0}} lg={{ span: 8, offset: 0 }}>
            <Card style={{ boxShadow: "1px 1px 5px grey", padding: "12px"}}>
              <Flex justify="space-around" align="center" style={{height: "95px"}}>
                <div>
                  <Progress type="circle" percent={percentPaymentCollected} size={55} strokeWidth={10} style={{ padding: "0 0 2px 15px" }} />
                  <Title level={2} style={{ fontSize: "1.3rem" }}>Collected</Title>
                </div>
                <Text style={{ fontSize: "1.3rem", fontWeight: "bold" }}>${paymentColleted}</Text>
              </Flex>
            </Card>
          </Col>

          <Col xs={{ span: 24, offset: 0 }} sm={{ span: 18, offset: 3 }} md={{span: 24, offset: 0}} lg={{ span: 8, offset: 0 }}>
            <Card style={{ boxShadow: "1px 1px 5px grey", padding: "12px"}}>
              <Flex justify="space-around" align="center" style={{height: "95px"}}>
                <div>
                  <Title level={2} style={{ fontSize: "1.3rem" }}>To Collect</Title>
                  <Text style={{ fontSize: "1.3rem", fontWeight: "bold" }}>${paymentToCollect}</Text>
                </div>
                <InfoCircleFilled style={{ fontSize: "3.5rem", color: "#dfc926" }} />
              </Flex>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={23} offset={2}>
            <Title level={3}>Non Payments</Title>
          </Col>
          { dataNonPaymentsList?.length === 0 ?
          <Col xs={{span: 20, offset: 2}} sm={{span: 20, offset: 2}} lg={{span:18, offset: 2}}>
            <Title level={4} style={{}}> All your pools charged! Excelent</Title>
          </Col>
          :
          <Col xs={{span: 24}} sm={{span: 20, offset: 2}} lg={{span:18, offset: 2}}>
            <NonPayment onCheck={handleCheck} DataNonPayments={dataNonPaymentsList} loading={isLoading} resetCheck={resetCheck}/>
          </Col>
          }
          {ErrorNonPayments &&
            <Col xs={{span: 20, offset: 1}} sm={{span: 20, offset: 2}} lg={{span:18, offset: 2}}>
             <Title level={4}> Non payments error </Title>
            </Col>
          }
        </Row>

         {
         check.length > 0 && 
             <DeleteNonPayment handleClic={() => handleClicDelete(1, check)}/>
         }
    </div>
  )
}