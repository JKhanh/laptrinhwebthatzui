import React, { useState } from "react";
import { Menu, Button } from "antd";
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

function SideBar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ width: 200 }}>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
      >
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </Button>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1", "sub2"]}
        mode="inline"
        inlineCollapsed={collapsed}
      >
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          Trang Cá Nhân
        </Menu.Item>
        <SubMenu key="sub1" icon={<MailOutlined />} title="Quản Lý">
          <SubMenu key="sub2" title="Công Ty">
            <Menu.Item key="2">
              <Link to="/companies">Công Ty</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/companies/employee">Nhân Viên Trong Công Ty</Link>
            </Menu.Item>
            <Menu.Item key="4"> 
              <Link to="/companies/services">Dịch Vụ Sử Dụng</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="5">
            <Link to="/services">Dịch Vụ</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="/staffs">Nhân Viên</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
}

export default SideBar;
