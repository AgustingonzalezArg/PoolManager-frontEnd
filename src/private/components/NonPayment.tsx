import { Card, Checkbox, Flex, List, Row, TableProps, Typography } from "antd"
import { columnsType } from "../pages/HomePage"
import { TableRowSelection } from "antd/es/table/interface"
import { UserOutlined } from "@ant-design/icons"
import { useState } from "react"
import { DeleteNonPayment } from "./modals/DeleteNonPayment"

const { Text } = Typography

type Props = {
    rowSelection: TableRowSelection<DataType>
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

const rowSelection: TableProps<DataType>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  export const NonPayment = () => {
      
    const [check, setCheck] = useState<number[]>([])
    const [DataNonPayments, setDataNonPayments] = useState([
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
    
    const handleCheckbox = (id: number) => {
        setCheck((prevcheck) => {
            if(prevcheck.includes(id)) {
                return prevcheck.filter(itemId => itemId !== id)
            } else {
                return [...prevcheck, id]
            }
        })
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
      {check.length > 0 && <DeleteNonPayment handleClic={handleClicDelete}/>}
    </div>
  );
}