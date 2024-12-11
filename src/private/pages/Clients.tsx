import { FlagFilled, PlusOutlined } from '@ant-design/icons'
import { columnsType } from './HomePage'
import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, Table, Typography } from 'antd'
import { useState } from 'react'
import { AddClientModal, Values } from '../components/modals/AddClientModal'

const { Text, Title } = Typography

type Props = {}

type DataType = {
  key: number
  name: string
  neighborhood: string
  price: number
  periodicity: number
  phone: string
}

export const Clients = (props: Props) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [rowsSelected, setRowsSelected] = useState<number[]>([])
  const [form] = Form.useForm()
  const DataClient: DataType[] = [
    {
      key: 1 ,
      name: "maria",
      neighborhood: "4 hojas" ,
      price: 12000,
      periodicity: 7 ,
      phone: "3512661510",
    },
    {
      key:2 ,
      name: "maria",
      neighborhood: "4 hojas" ,
      price: 12000,
      periodicity: 7 ,
      phone: "3512661510",
    },
    {
      key:3 ,
      name: "carla" ,
      neighborhood: "catalina",
      price: 10000,
      periodicity: 15,
      phone: "351486516",
    },
    {
      key: 4 ,
      name: "maria",
      neighborhood: "4 hojas" ,
      price: 12000,
      periodicity: 7 ,
      phone: "3512661510",
    }
  ]

  const ClientsColums: columnsType[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Neighborhood",
      dataIndex: "neighborhood",
      key: "neighborhood"
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price"
    },
    {
      title: "Periodicity",
      dataIndex: "periodicity",
      key: "periodicity"
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone"
    },
  ]

  const rowSelection = {
    onChange: (rowSelected: number[]) => {
      setRowsSelected(rowSelected)
    }
  }

  const handleCancel = () => {
    setOpenModal(false)
    form.resetFields()
  }

  const handleFinish = (values: Values) => {
    console.log("Values Form: ", values)
    setOpenModal(false)
    form.resetFields()
  }

  return (
    <>
      <Title style={{textAlign: "center"}}> Clients </Title>

      <Row>
        <Col 
        span={20}
        offset={2}>
          <Table
          dataSource={DataClient}
          columns={ClientsColums}
          rowClassName = {(_, index) => (index % 2 === 0 ? "even-row" : "odd-row")}
          pagination={{pageSize: 10}}
          size={'small'}
          scroll={{x: true}}
          style={{overflow: "hidden", boxShadow: "1px 1px 5px black", borderRadius: "10px"}}
          rowSelection={rowSelection} />
        </Col>
      </Row>
      <Button 
      icon={<PlusOutlined />} 
      iconPosition='end' 
      type='primary'
      style={{margin: "20px"}}
      onClick={() => setOpenModal(true)}>Add 
      </Button>
      <AddClientModal openModal={openModal} OnCancel={handleCancel} OnFinish={handleFinish} />
    </>
  )
}