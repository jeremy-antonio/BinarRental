import { useState, useEffect } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined, BarChartOutlined, CarOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme, Space, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const cars_api_base_url = "http://localhost:8087";

interface Cars {
  id: number;
  name: string;
  cost_per_day: number;
  size: string;
  created_at: Date;
  updated_at: Date;
}

export default function Dashboard() {
  const [listCars, setListCars] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const getListCars = async () => {
    const response = await fetch(cars_api_base_url + "/api/cars", {
      method: "GET",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    const listOfCars = await result.data;
    setListCars(listOfCars);
    console.log(listOfCars);
  };
  useEffect(() => {
    getListCars();
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "cost_per_day",
      key: "cost_per_day",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          onClick={({ key }) => {
            if (key == "/") {
              localStorage.removeItem("token");
              navigate(key);
            } else {
              navigate(key);
            }
          }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/dashboard"]}
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
          <div className="text-xl font-bold mb-6">List Car</div>
          {listCars.length > 0 ? <Table columns={columns} dataSource={listCars} /> : <p>Loading...</p>}
        </Content>
      </Layout>
    </Layout>
  );
}
