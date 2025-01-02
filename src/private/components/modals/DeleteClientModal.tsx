import { Button, Col, message, Modal, Row } from "antd"
import { DataType } from "../../pages/Clients"
import { useMutation } from "@tanstack/react-query"


type Props = {
    clientSelected: DataType[]
    OpenModalDeleteClient: boolean
    onCloseModalDeleteClient: () => void
}

const fetchDeleteClient =async  (idUser: number, id: number) => {
    return await fetch(`http://localhost:3000/clients/${idUser}/${id}`,{
        method: "DELETE"
    })
    .then(res => {
        if(!res.ok) throw new Error("Can't delete client")
        return res.json()
      })
}

const idUser = 1

export const DeleteClientModal = ({clientSelected, OpenModalDeleteClient, onCloseModalDeleteClient}: Props) => {

    const deleteClientMutation = useMutation({
        mutationFn: async (id: number) => await fetchDeleteClient(idUser, id),
        onSuccess: () => {
            message.success('Client deleted')
        },
        onError: () => {
            message.error("Can't deleted Client")
        }
    })

    const handleDeleteClient = (clientSelected: DataType) => {
        onCloseModalDeleteClient()
        deleteClientMutation.mutate(clientSelected.id)
    }

  return (
    <>
        <Modal
        open={OpenModalDeleteClient}
        onCancel={() => onCloseModalDeleteClient()}
        footer={() => (
            <Row align={"middle"} justify={"center"}>
                <Col span={12} style={{textAlign: "center"}}>
                    <Button variant="solid" color="danger"
                        onClick={() => handleDeleteClient(clientSelected[0])}>Yes</Button>
                </Col>
                <Col span={12} style={{textAlign: "center"}}>
                    <Button type="primary"
                        onClick={() => onCloseModalDeleteClient()} >No</Button>
                </Col>
            </Row>
        )}>
            <div>
                <span
                    style={{margin: "10px 5px", fontWeight: "600"}}
                >{`Are you sure delete client ${clientSelected.length > 0  && clientSelected[0].name} in ${ clientSelected.length > 0 && clientSelected[0].neighborhood}?`}</span>
            </div>
        </Modal>
    </>
  )
}