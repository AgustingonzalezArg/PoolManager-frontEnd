import { CloseOutlined, DollarOutlined, HomeOutlined, MenuOutlined, UsergroupAddOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Drawer, Menu } from 'antd';
import { useState, useEffect } from 'react';
import { MenuProps } from 'antd/es/menu';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  screens: boolean | undefined;
};

export const Nav = ({ screens }: Props) => {
  const location = useLocation(); // Obtiene la ubicación actual de la URL
  const [current, setCurrent] = useState(location.pathname.slice(1) || "homePage"); // Determina la clave inicial
  const [drawerVisible, setDrawerVisible] = useState(false);

  const items = [
    {
      label: <Link to={"/"}>HomePage</Link>,
      key: "homePage",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={"/clients"}>Clients</Link>,
      key: "clients",
      icon: <UsergroupAddOutlined />,
    },
    {
      label: <Link to={"/user"}>Earnings</Link>,
      key: "user",
      icon: <DollarOutlined />,
    },
  ];

  const handleClick: MenuProps["onClick"] = (e): void => {
    setCurrent(e.key);
    if (!screens) setDrawerVisible(false);
  };

  const showDrawer = () => setDrawerVisible(true); // Abre el Drawer
  const closeDrawer = () => setDrawerVisible(false); // Cierra el Drawer

  // Sincroniza el estado `current` con la ruta actual
  useEffect(() => {
    const currentKey = location.pathname === "/" ? "homePage" : location.pathname.slice(1);
    setCurrent(currentKey);
  }, [location]);

  return (
    <div>
      {screens ? (
        <Menu
          onClick={handleClick}
          selectedKeys={[current]}
          mode="inline"
          theme="dark"
          items={items}
          style={{ fontSize: ".85rem" }}
        />
      ) : (
        <Button
          type="primary"
          icon={<MenuOutlined />}
          style={{ position: "fixed", bottom: 20, right: 20, zIndex: 100 }}
          onClick={showDrawer}
        />
      )}

      <Drawer
        title="Menú"
        placement="bottom"
        closable
        onClose={closeDrawer}
        autoFocus
        style={{ backgroundColor: "#001529", color: "white" }}
        open={drawerVisible}
        width={200}
        closeIcon={<CloseOutlined style={{ color: "white" }} />}
      >
        <Menu
          onClick={handleClick}
          selectedKeys={[current]}
          theme="dark"
          mode="inline"
          items={items}
        />
      </Drawer>
    </div>
  );
};
