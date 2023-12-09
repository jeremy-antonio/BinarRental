import { useState, useEffect } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined, BarChartOutlined, CarOutlined, ArrowLeftOutlined, PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme, Card, Modal } from "antd";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const Meta = Card.Meta;
const cars_api_base_url = "http://localhost:8087";

interface Cars {
  id: number;
  name: string;
  cost_per_day: number;
  size: string;
  car_picture_url: string;
}

export default function Cars() {
  const [listCars, setListCars] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
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

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleAddCarClick = () => {
    navigate("/dashboard/addcars");
  };

  const handleEditCarClick = () => {
    navigate("/dashboard/editcar");
  };

  const handleDeleteCar = async (id: number) => {
    try {
      const response = await fetch(`${cars_api_base_url}/api/cars/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        getListCars();
        console.log(`Car dengan ID ${id} berhasil dihapus`);
      } else {
        console.error(`Gagal menghapus car dengan ID ${id}`);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

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
          <div className="flex min-w-full justify-between mb-5">
            <div className="flex flex-col">
              <div className="text-xl font-bold">List Car</div>
              <div>All, S, M, L</div>
            </div>
            <Button onClick={handleAddCarClick} icon={<PlusOutlined />}>
              Add New Car
            </Button>
          </div>
          <div className="flex flex-wrap gap-5">
            {listCars.map((cars: Cars) => (
              <Card className="w-[23%]" key={cars.id} cover={<img src={cars.car_picture_url} alt="" className="h-[220px]" />}>
                <Meta title={cars.name} description={`Rp. ${cars.cost_per_day} / Hari`}></Meta>
                <div className="flex gap-3 mt-5">
                  <Button onClick={handleEditCarClick} icon={<EditOutlined />}>
                    Edit Car
                  </Button>
                  <Button onClick={() => setModalOpen(true)} danger icon={<DeleteOutlined />}>
                    Hapus Car
                  </Button>
                  <Modal title="Menghapus Data Mobil" centered open={modalOpen} onOk={() => handleDeleteCar(cars.id)} onCancel={() => setModalOpen(false)}>
                    <p>Setelah dihapus, data mobil tidak dapat dikembalikan. Yakin ingin menghapus?</p>
                  </Modal>
                </div>
              </Card>
            ))}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
