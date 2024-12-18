import { Affix, Button, Card, Col, Row } from "antd"

type Props = {
    onMarkAsPaid: () => void
    onMarkAsNotPaid: () => void
}

export const AffixPoolFinished = ({onMarkAsNotPaid, onMarkAsPaid}: Props) => {
  return (
    <>
        <Affix
        offsetBottom={0}
        style={{
            width: "100%",
            position: "absolute",
            bottom: 0 
        }}>
            <Row>
                <Col span={12}>
                    <Card>
                        <Button type="primary"
                        onClick={onMarkAsPaid}
                        >Mark as paid</Button>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card>
                        <Button type="primary"
                        onClick={onMarkAsNotPaid}
                        >Mark as not paid</Button>
                    </Card>
                </Col>
            </Row>
        </Affix>
    </>
  )
}