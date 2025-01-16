import { Card, Checkbox, Flex, List, Typography } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import {  } from "../pages/Clients"
import { format } from "date-fns"
import { Payment } from "../fetchs/payment"

const { Text } = Typography

type Props = {
    onCheck: (val: number[]) => void
    DataNonPayments: Payment[] | undefined
    loading: boolean
    resetCheck: number
}

  export const NonPayment = ({onCheck, DataNonPayments, loading, resetCheck}: Props ) => {
    const [check, setCheck] = useState<number[]>([])

    useEffect(() => {
      onCheck(check)

    }, [check])
    
    useEffect(() => {
        setCheck([])
    }, [resetCheck])
    

    const handleCheckbox = (id: number) => {
        setCheck((prevcheck) => {
            if(prevcheck.includes(id)) {
                return prevcheck.filter(itemId => itemId !== id)
            } else {
                return [...prevcheck, id]
            }
        })
      }


    
      return (
    <div style={{maxHeight:"400px", overflowY: "auto"}}>
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={DataNonPayments}
        style={{paddingBottom: "40px"}}
        rowKey={"id"}
        renderItem={(item) => (
        <List.Item style={{padding: "5px"}}>
            <Card style={{ width: "100%", padding: "5px", backgroundColor: "#9dc6f7", boxShadow: "1px 1px 5px gray", borderRadius: "0px"}} bordered={false}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "0px"}}>
                    <Flex align="center">
                        <UserOutlined size={20} />
                        <Text strong style={{padding: "5px"}}>{item.client.name}</Text>
                    </Flex>
                    <Flex justify="center" align="center" gap={0} vertical>
                        <Text strong style={{fontSize:"8px"}}>neighborhood</Text>
                        <Text strong style={{fontSize:"15px"}}>{item.client.neighborhood}</Text>
                    </Flex>
                    <Flex justify="center" align="center" gap={0} vertical>
                        <Text strong style={{fontSize:"8px"}}>date</Text>
                        <Text strong style={{fontSize:"15px"}}>{format(new Date(item.date), 'dd-MM-yy')}</Text>
                    </Flex>
                    <Flex justify="center" align="center" gap={0} vertical>
                        <Text strong style={{fontSize:"8px"}}>price</Text>
                        <Text strong style={{fontSize:"15px"}}>{item.price}</Text>
                    </Flex>
                    <Flex justify="center" align="center" gap={0} vertical>
                        <Text strong style={{fontSize:"8px"}}>Payment</Text>
                        <Checkbox onChange={() => handleCheckbox(item.id)} checked={check.includes(item.id)} />
                    </Flex>
                </div>
            </Card>
        </List.Item>
        )}
      />
    </div>
  );
}