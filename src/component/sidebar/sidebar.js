import React, {useState} from 'react';
import { Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

function SideBar() {

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ width: 200 }}>
      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        inlineCollapsed={collapsed}
      >
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          Trang Cá Nhân
        </Menu.Item>
        <SubMenu key="sub1" icon={<MailOutlined />} title="Quản Lý">
          <Menu.Item key="2">Công Ty</Menu.Item>
          <Menu.Item key="3">Phòng</Menu.Item>
          <Menu.Item key="4">Dịch Vụ</Menu.Item>
          <Menu.Item key="5">Nhân Viên</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Thống Kê">
          <Menu.Item key="6">Doanh Thu Theo Phòng</Menu.Item>
          <Menu.Item key="7">Doanh Thu Theo Dịch Vụ</Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
}

export default SideBar;