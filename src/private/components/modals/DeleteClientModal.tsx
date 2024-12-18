import { Button, Col, Modal, Row } from "antd"
import { DataType } from "../../pages/Clients"


type Props = {
    clientSelected: DataType[]
    OpenModalDeleteClient: boolean
    onCloseModalDeleteClient: () => void
}

export const DeleteClientModal = ({clientSelected, OpenModalDeleteClient, onCloseModalDeleteClient}: Props) => {

    const handleDeleteClient = (clientSelected: DataType) => {
        onCloseModalDeleteClient()
        console.log("client deleted: " + clientSelected.name)
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