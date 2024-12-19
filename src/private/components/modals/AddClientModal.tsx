import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, Typography } from 'antd'
import { DataType } from '../../pages/Clients'

const {Title} = Typography

export type formType = {
    name: string
    neighborhood: string
    price: number
    periodicity: "weekly" | "biweekly" | "monthly"
    phoneNumber: string

}

type Props = {
    openModal: boolean
    onFinish: (formData: DataType, type: "add") => void
    onCancel: () => void
}

export const AddClientModal = ({openModal, onFinish, onCancel }: Props) => {
    const [form] = Form.useForm()

    const handleFinish = (values: DataType): void => {
        onFinish(values, "add")
        form.resetFields()
    }

  return (
    <>
      <Modal
        open={openModal}
        onCancel={onCancel}
        footer={null}>
        <Title level={2} style={{fontSize: "25px"}}>Add new Client</Title>
          <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}>
              <Form.Item
              name={"name"}
              label={"Full Name"}
              rules={[{required: true, message: "Full name es require"}]}>
                  <Input placeholder="Write full name"/>
              </Form.Item>
              <Form.Item
              name={"neighborhood"}
              label={"Neighborhood"}
              rules={[{required: true, message: "Neighborhood is require"}]}>
                  <Input placeholder="Write neighborhood"/>
              </Form.Item>
              <Row >
                  <Col span={12}>
                  <Form.Item
                  name={"price"}
                  label="Price"
                  rules={[{required: true, message: "Price is require"}]}>
                      <InputNumber
                      max={1000000}
                      min={0}/>
                  </Form.Item>
                  </Col>
                  <Col span={12}>
                  <Form.Item
                  name={"periodicity"}
                  label="Periodicity"
                  rules={[{required: true, message: "Periodicity is require"}]}>
                      <Select
                      placeholder="Select periodicity"
                      options={[
                          {value:"weekly", label: <span>weekly</span>},
                          {value:"biweekly", label: <span>biweekly</span>},
                          {value:"monthly", label: <span>monthly</span>}
                      ]}>
                      </Select>
                  </Form.Item>
                  </Col>
              </Row>
              <Row gutter={16} align={'middle'}>
                  <Col span={16}>
                      <Form.Item
                      name={"phoneNumber"}
                      label="Phone Number"
                      >
                        <Input placeholder='write phone number'></Input>
                      </Form.Item>
                  </Col>
                  <Col span={8} style={{ textAlign: "right" }}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                  </Col>
              </Row>
          </Form>
    </Modal>
    </>
  )
}