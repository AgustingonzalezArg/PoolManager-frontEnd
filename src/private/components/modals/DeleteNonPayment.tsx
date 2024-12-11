
import { Affix, Button, Card } from "antd"


type Props = {
handleClic: () => void
}

export const DeleteNonPayment = ({handleClic}: Props) => {
  return (
    <Affix offsetBottom={0} style={{width: "100vw", position: "fixed", zIndex: 150, display: "flex", alignContent:"centers"}}>
        <Card>
            <Button type="primary" onClick={handleClic}>
                Checked payment
            </Button>
        </Card>
    </Affix>
  )
}