import { HomeOutlined, MenuOutlined, UsergroupAddOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Col, Drawer, Menu, Row } from 'antd'
import { useState } from 'react'
import { MenuProps } from 'antd/es/menu'; 
import { Link } from 'react-router-dom'

type Props = {
    screens: boolean | undefined
}

export const Nav = ({screens}: Props) => {

    const [current, setCurrent] = useState("homePage")
    const [drawerVisible, setDrawerVisible] = useState(false)
    const items = [
        {
            label: <Link to={"/"}>HomePage</Link>,
            key: "homePage",
            icon: <HomeOutlined/>
        },
        {
            label: <Link to={"/clients"}>Clients</Link> ,
            key: "clients",
            icon: <UsergroupAddOutlined />
        },
        {
            label: <Link to={"/user"}> User</Link>,
            key: "user",
            icon: <UserOutlined />,
        }
    ]

    const handleClick: MenuProps["onClick"] = (e): void => {
        setCurrent(e.key)
        if(!screens) setDrawerVisible(false)
    }

    const showDrawer = () => setDrawerVisible(true); // Abre el Drawer
    const closeDrawer = () => setDrawerVisible(false); // Cierra el Drawer
  

    return (
        <div>
            {screens
            ?   <Menu 
                    onClick={handleClick} 
                    selectedKeys={[current]} 
                    mode='inline' 
                    theme='dark' 
                    items={items} 
                    style={{fontSize: ".85rem"}}/>
            :
                <Button 
                type='primary'
                icon= {<MenuOutlined/>}
                style={{position: 'fixed', bottom: 20, right: 20, zIndex: 100}}
                onClick={showDrawer}
                />
            }

        <Drawer
            title="Menú"
            placement="bottom"
            closable
            onClose={closeDrawer}
            autoFocus
            style={{backgroundColor: "#001529", color: "white"}}
            open={drawerVisible}
            width={200}
        >
            <Menu
              onClick={handleClick}
              selectedKeys={[current]}
              theme='dark'
              mode="inline"
              items={items}
            />
        </Drawer>

        </div>
    )

}