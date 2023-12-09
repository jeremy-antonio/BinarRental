import { useState, ChangeEvent } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined, BarChartOutlined, CarOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme, Input, Select, Form } from "antd";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

export default function AddCars() {
  const [carsName, setCarsName] = useState("");
  const [costPerDay, setCostPerDay] = useState("");
  const [size, setSize] = useState("");
  const [carPicture, setCarPicture] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [buttonLoading, setButtonLoading] = useState(false);

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const cars_api_base_url = "http://localhost:8087";
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleCancelClick = () => {
    navigate("/dashboard/cars");
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.id == "cars-name") {
      setCarsName(e.target.value);
    } else if (e.target.id == "cost-per-day") {
      setCostPerDay(e.target.value);
    } else if (e.target.id == "size") {
      console.log;
      setSize(e.target.value);
    } else if (e.target.id == "car-picture") {
      setCarPicture(e.target.files?.[0]);
      const carPicture = new FileReader();

      carPicture.onload = function () {
        setPreview(carPicture.result);
      };

      carPicture.readAsDataURL(e.target.files?.[0]);
    }
  };
  const handleSubmit = async () => {
    setButtonLoading(true);
    const formData = new FormData();
    formData.append("name", carsName);
    formData.append("cost_per_day", costPerDay);
    formData.append("size", size);
    formData.append("car_picture", carPicture!);
    const response = await fetch(cars_api_base_url + "/api/cars", {
      method: "POST",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        contentType: "multipart/form-data",
      },
      body: formData,
    });
    const result = await response.json();
    console.log(result);
    setButtonLoading(false);
  };

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
          <div className="text-xl font-bold mb-6">Add New Car</div>
          <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal" style={{ maxWidth: 600 }}>
            <Form.Item label="Car Name">
              <Input id="cars-name" name="cars-name" value={carsName} onChange={handleInput} />
            </Form.Item>

            <Form.Item label="Rent per Day">
              <Input id="cost-per-day" name="cost-per-day" value={costPerDay} onChange={handleInput} />
            </Form.Item>

            <Form.Item label="Size">
              <Select
                id="size"
                value={size || "Pilih Ukuran"}
                options={[
                  {
                    value: "S",
                    label: "Small",
                  },
                  {
                    value: "M",
                    label: "Medium",
                  },
                  {
                    value: "L",
                    label: "Large",
                  },
                  {
                    value: "Pilih Ukuran",
                    label: "Pilih Ukuran",
                    disabled: true,
                  },
                ]}
                onChange={(nilai) => setSize(nilai)}
              >
                {/* <Select.Option value="S">Small</Select.Option>
                <Select.Option value="M">Medium</Select.Option>
                <Select.Option value="L">Large</Select.Option> */}
              </Select>
            </Form.Item>

            <Form.Item label="Car Picture">
              <Input type="file" id="car-picture" onChange={handleInput}></Input>
              {preview && (
                <p className="mt-6">
                  <img src={preview as string} alt="" />
                </p>
              )}
            </Form.Item>
          </Form>
          <div className="ml-24 mt-6">
            <Button className="mr-5" type="default" onClick={handleSubmit} loading={buttonLoading}>
              Submit
            </Button>

            <Button danger type="default" onClick={handleCancelClick}>
              Cancel
            </Button>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
