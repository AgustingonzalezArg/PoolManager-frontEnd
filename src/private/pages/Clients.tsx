import { PlusOutlined } from '@ant-design/icons'
import { columnsType } from './HomePage'
import { Button, Col, Row, Table, Typography, message } from 'antd'
import { Key, useState } from 'react'
import { AddClientModal } from '../components/modals/AddClientModal'
import { OptionsClientModal } from '../components/modals/OptionsClientModal'
import { DeleteClientModal } from '../components/modals/DeleteClientModal'
import { EditClientModal } from '../components/modals/EditClientModal'
import { useMutation, useQuery } from '@tanstack/react-query'

const { Title } = Typography

export type DataType = {
  id: number
  name: string
  neighborhood: string
  price: number
  periodicity: "weekly" | "biweekly" | "monthly"
  phoneNumber: string
}

const fetchClients = async (idUser: number) => {
  return await fetch(`http://localhost:3000/clients/${idUser}`)
  .then(res => {
      if(!res.ok) throw new Error("Error fetching")
      return res.json()
  })
}

const fetchAddNewClient = async (idUser: number, values: DataType): Promise<DataType> => {
  return await fetch(`http://localhost:3000/clients/${idUser}`, {
    method: "POST",
    headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify(values)
  })
  .then(res => {
    if(!res.ok) throw new Error("Client add failed")
    return res.json()
  })
}

const fetchEditClient = async (idUser: number, values: DataType): Promise<DataType> => {
  return await fetch(`http://localhost:3000/clients/${idUser}`, {
    method: "PATCH",
    headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify(values)
  })
  .then(res => {
    if(!res.ok) throw new Error("Client edit failed")
    return res.json()
  })
}

const fetchUpdateCleanToday = async (idUser: number, arrayIds: Key[]): Promise<void> => {
  return await fetch(`http://localhost:3000/clients/cleantoday/${idUser}`, {
    method: "PATCH",
    headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify(arrayIds)
  })
  .then(res => {
    if(!res.ok) throw new Error("Can't add clients to CleanToday")
    return res.json()
  })
}

const idUser = 1

export const Clients = () => {
  const {isLoading, isError, data, refetch: refetchClients} = useQuery<DataType[]>(
    {
      queryKey: ['clients'],
      queryFn: async () => await fetchClients(idUser)
    }
  )
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [rowsSelected, setRowsSelected] = useState<Key[]>([])
  const [clientSelected, setClientSelected] = useState<DataType[]>([])
  const [openModalDeleteClient, setOpenModalDeleteClient] = useState<boolean>(false)
  const [openModalEditClient, setOpenModalEditClient] = useState<boolean>(false)
  const [messageApi, contextHolder] = message.useMessage();

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
      dataIndex: "phoneNumber",
      key: "phoneNumber"
    },
  ]

  const rowSelection = {
    selectedRowKeys: rowsSelected,
    onChange: (selectedRowKeys: Key[], selectedRows: DataType[]) => {
      setRowsSelected(selectedRowKeys)
      setClientSelected(selectedRows)
      console.log(clientSelected)
    }
  }

  const addClientMutation = useMutation({
    mutationFn: (values: DataType) => fetchAddNewClient(idUser, values),
    onSuccess: () => {
      message.success('Client added successfully!');
      setOpenModal(false);
      setRowsSelected([]);
      refetchClients()
    },
    onError: () => {
      message.error('Failed to add client.');
    }
  });

  const editClientMutation = useMutation({
    mutationFn: (values: DataType) => fetchEditClient(idUser, values),
    onSuccess: () => {
      message.success('Client added successfully!');
      setOpenModalEditClient(false);
      setRowsSelected([]);
      refetchClients()
    },
    onError: () => {
      message.error('Failed to add client.');
    }  
  })

  const updateCleanTodayMutation = useMutation({
    mutationFn: async (arrayIds: Key[]) => fetchUpdateCleanToday(idUser, arrayIds),
    onSuccess: () => {
      message.success('Client added to "Clean Today" succesfully!');
      setOpenModalEditClient(false);
      setRowsSelected([]);
      refetchClients()
    },
    onError: () => {
      message.error('Failed to add clients. Check that you have not added them previously');
    }  
  })

  const handleFinish = (values: DataType, type: 'add' | 'edit') => {
    if (type === 'add') {
      addClientMutation.mutate(values);
    } else {
      editClientMutation.mutate(values)
    }
  };
  const handleDeleteClient = () => {
    setOpenModalDeleteClient(true)
    console.log(clientSelected)
  }

  const handleCloseModalDeleteClient = (): void => {
    setOpenModalDeleteClient(false)
    setClientSelected([])
    setRowsSelected([])
    message.open({
      type: 'success',
      content: 'Client deleted successfully'
    })
  }

  const handleClickToday = (rowsSelected: Key[]): void => {
    updateCleanTodayMutation.mutate(rowsSelected)
    setClientSelected([])
    setRowsSelected([])
  }

  const handleClickTomorrow = (rowsSelected: Key[]): void => {
    console.log("Clean Tomorrow", rowsSelected)
    setClientSelected([])
    setRowsSelected([])
    message.open({
      type: 'success',
      content: `${rowsSelected.length} clients added to "Clean Tomorrow"`
    })
  }

  const handleCancel = (): void => {
    openModal && setOpenModal(false)
    openModalEditClient && setOpenModalEditClient(false)
    setRowsSelected([])
  }

  return (
    <div  style={{
      position:"relative",
      height: "100vh"
      }}>
      <Title style={{textAlign: "center"}}> Clients </Title>
      {isError && <><Title level={4} style={{textAlign: "center"}}>Client loading Error </Title></>}
      {(data || isLoading) && 
        <>
          <Row>
            <Col 
            span={20}
            offset={2}>
              <Table
              loading={isLoading}
              dataSource={data}
              rowKey={"id"}
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
          <AddClientModal openModal={openModal} onFinish={handleFinish} onCancel={handleCancel} />
        </>
      }

      {rowsSelected.length > 0 &&
        
        <div>
          <OptionsClientModal 
          numberRowSelected={rowsSelected.length} 
          onDeleteClient={handleDeleteClient}
          onClickEdit={() => setOpenModalEditClient(true)} 
          onClickToday={() => handleClickToday(rowsSelected)}
          onClickTomorrow={() => handleClickTomorrow(rowsSelected)}/>
        </div>}
      <DeleteClientModal 
        clientSelected={clientSelected} 
        OpenModalDeleteClient={openModalDeleteClient}
        onCloseModalDeleteClient={handleCloseModalDeleteClient}/>
      <EditClientModal 
      openModalEditClient={openModalEditClient} 
      OnFinish={handleFinish} 
      onCancel={handleCancel}
      clientSelected={clientSelected}/>
    </div>
  )
}