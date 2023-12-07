import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined, BarChartOutlined, CarOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

export default function Cars() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          onClick={({ key }) => {
            navigate(key);
          }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/dashboard/cars"]}
          items={[
            {
              key: "/dashboard",
              icon: <BarChartOutlined />,
              label: "Dashboard",
            },
            {
              key: "/dashboard/cars",
              icon: <CarOutlined />,
              label: "Cars",
            },
            {
              key: "/",
              icon: <ArrowLeftOutlined />,
              label: "Sign Out",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          Ini Content Cars
        </Content>
      </Layout>
    </Layout>
  );
}
