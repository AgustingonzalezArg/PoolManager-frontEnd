import { Outlet } from "react-router-dom"
import { Col, Grid, Row } from "antd"
import { Nav } from "./private/components/Nav"

const {useBreakpoint} = Grid


function App() {

  const screens = useBreakpoint()
  const isNav = screens.md

  return (
    <>
    {
      isNav
      ? <Row>
          <Col xs={0} md={4} xl={3} style={{backgroundColor: "#001529", minHeight: "100vh", padding: "5px", position: "relative"}} >
              <Nav screens={isNav} />    
          </Col>

          <Col xs={24} md={20} xl={21} style={{backgroundColor: "#cce3fa", minHeight: "100vh"}}>

            <Outlet />
          </Col>
        </Row>
      : <Row>
          <Col xs={24} md={20} xl={21} style={{backgroundColor: "#cce3fa", minHeight: "100vh"}}>
            <Nav screens={isNav} />    
            <Outlet />
          </Col>
        </Row>
    }
      
    </>
  )
}

export default App
