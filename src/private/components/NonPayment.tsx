import { Card, Checkbox, Flex, List, Row, TableProps, Typography } from "antd"
import { columnsType } from "../pages/HomePage"
import { UserOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"

const { Text } = Typography

export type NonPayment = {
    key: number
    name: string
    neighborhood: string
    date: string
    price: number
}

type Props = {
    onCheck: (val: number[]) => void
    DataNonPayments: NonPayment[]
}

const NonPaymentsColumns: columnsType[] = [
    {
        title: "Name" ,
        dataIndex: "name" ,
        key: "name" ,
    },
    {
        title: "Neighborhood",
        dataIndex: "neighborhood",
        key: "neighborhood",
    },
    {
        title: "Date",
        dataIndex: "date",
        key: "date",
    },
    {
        title: "Price",
        dataIndex: "price",
        key: "price",
    },
] 

  export const NonPayment = ({onCheck, DataNonPayments}: Props ) => {
      
    const [check, setCheck] = useState<number[]>([])
  
    useEffect(() => {
      onCheck(check)

    }, [check])
    
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
        itemLayout="horizontal"
        dataSource={DataNonPayments}
        style={{paddingBottom: "40px"}}
        rowKey={"key"}
        renderItem={(item) => (
        <List.Item style={{padding: "5px"}}>
            <Card style={{ width: "100%", padding: "5px", backgroundColor: "#9dc6f7", boxShadow: "1px 1px 5px gray", borderRadius: "0px"}} bordered={false}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "0px"}}>
                    <Flex align="center">
                        <UserOutlined size={20} />
                        <Text strong style={{padding: "5px"}}>{item.name}</Text>
                    </Flex>
                    <Flex justify="center" align="center" gap={0} vertical>
                        <Text strong style={{fontSize:"8px"}}>neighborhood</Text>
                        <Text strong style={{fontSize:"15px"}}>{item.neighborhood}</Text>
                    </Flex>
                    <Flex justify="center" align="center" gap={0} vertical>
                        <Text strong style={{fontSize:"8px"}}>date</Text>
                        <Text strong style={{fontSize:"15px"}}>{item.date}</Text>
                    </Flex>
                    <Flex justify="center" align="center" gap={0} vertical>
                        <Text strong style={{fontSize:"8px"}}>price</Text>
                        <Text strong style={{fontSize:"15px"}}>{item.price}</Text>
                    </Flex>
                    <Flex justify="center" align="center" gap={0} vertical>
                        <Text strong style={{fontSize:"8px"}}>Payment</Text>
                        <Checkbox onChange={() => handleCheckbox(item.key)} checked={check.includes(item.key)} />
                    </Flex>
                </div>
            </Card>
        </List.Item>
        )}
      />
    </div>
  );
}