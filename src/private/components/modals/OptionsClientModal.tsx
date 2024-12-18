import { Affix, Button, Card, Col, Row } from "antd"

type Props = {
    numberRowSelected: number
    onDeleteClient: () => void
    onClickEdit: () => void
    onClickToday: () => void
    onClickTomorrow: () => void
}

export const OptionsClientModal = ({numberRowSelected, onDeleteClient, onClickEdit, onClickToday, onClickTomorrow}: Props) => {

  return (
    <div>
    <Affix
    style={{
        width: "100%",
        position: "absolute",
        bottom: 0,
    }}
    offsetBottom={0}>
        <Card>
            <Row align={"middle"} justify={"center"} gutter={[20,20]}>                
                {
                    numberRowSelected === 1 ?
                    <>
                       <Col xs={12} md={6} style={{textAlign: "center"}}>
                           <Button type="primary"
                           onClick={() => onClickToday()}>
                               Clean Today
                           </Button>
                       </Col>
                       <Col xs={12} md={6} style={{textAlign: "center"}}>
                           <Button type="primary"
                           onClick={() => onClickTomorrow()}>
                               Clean Tomorrow
                           </Button>
                       </Col>    
                       <Col xs={12} md={6} style={{textAlign: "center"}}>
                           <Button variant="outlined" color="primary"
                            onClick={() => onClickEdit()}>
                               Edit
                           </Button>
                       </Col>
                       <Col xs={12} md={6} style={{textAlign: "center"}}>
                           <Button type="primary" danger
                           onClick={() => onDeleteClient()}>
                           Delete
                           </Button>
                       </Col>
                    </>
                    :
                    <>
                        <Col span={12} style={{textAlign: "center"}}>
                            <Button type="primary"
                            onClick={() => onClickToday()}>
                                Clean Today
                            </Button>
                        </Col>
                        <Col span={12} style={{textAlign: "center"}}>
                            <Button type="primary"
                            onClick={() => onClickTomorrow()}>
                                Clean Tomorrow
                            </Button>
                        </Col>   
                    </>
                }
            </Row>
        </Card>
    </Affix>
    </div>
  )
}