import { Button, Col, message, Modal, Row } from "antd"
import { dataColumnsType } from "../../pages/HomePage"
import { useMutation } from "@tanstack/react-query"
import { deletePayments } from "../../fetchs/payment"
import Title from "antd/es/skeleton/Title"

type Props = {
  cleaning: dataColumnsType | undefined
  OpenModalDeletePayment: boolean
  onCloseModalDeletePayment: () => void
  onRefetchPaymentList: () => void
}

export const DeletePaymentModal = ({cleaning, OpenModalDeletePayment, onCloseModalDeletePayment, onRefetchPaymentList}: Props) => {

  const deletePaymentMutation = useMutation({
      mutationFn: async (id: number) => await deletePayments(1, id),
      onSuccess: () => {
          message.success('Cleanup deleted')
          onRefetchPaymentList()
      },
      onError: () => {
          message.error("Can't deleted Cleanup")
      }
  })

  const handleDeletePayment = (id: number) => {
      onCloseModalDeletePayment()
      deletePaymentMutation.mutate(id)
  }

return (
  <>
  { cleaning &&
      <Modal
      open={OpenModalDeletePayment}
      onCancel={() => onCloseModalDeletePayment()}
      footer={() => (
          <Row align={"middle"} justify={"center"}>
              <Col span={12} style={{textAlign: "center"}}>
                  <Button variant="solid" color="danger"
                      onClick={() => handleDeletePayment(cleaning.id)}>Yes</Button>
              </Col>
              <Col span={12} style={{textAlign: "center"}}>
                  <Button type="primary"
                      onClick={() => onCloseModalDeletePayment()} >No</Button>
              </Col>
          </Row>
      )}>
          <div>
              <span
                  style={{margin: "10px 5px", fontWeight: "600"}}
              >{`Are you sure to remove the ${cleaning.name} client's cleanup?`}</span>
          </div>
      </Modal>
  }
  </>
)
}
