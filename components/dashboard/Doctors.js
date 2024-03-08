import React, { useRef, useState, useEffect } from "react";
import {
  Table,
  Button,
  Popconfirm,
  Drawer,
  Tooltip,
  Notification,
  Space,
} from "@arco-design/web-react";
import api from "../../utils/api";
import { Form, Input, Grid, Select, InputNumber } from "@arco-design/web-react";
import { IconExclamationCircle } from "@arco-design/web-react/icon";
import DynamicForm from "../../providers/dashboard/addDoctor";
import { IconEdit, IconDelete } from "@arco-design/web-react/icon";

const App = () => {
  const formRef = useRef();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editForm, showEditForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log("Fetching data...");
      const response = await api.get("api/data/doctor/api.php");
      console.log("Response:", response);

      if (response.status === 200) {
        const data = await response.data;
        console.log("Data available:", data);
        setDoctors(data);
        setLoading(false);
      } else {
        console.error("Failed to fetch data");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const editRow = (record) => {
    // Implement your edit logic here
    showEditForm(true);

    // Set initial values for the form fields based on the selected row
    if (formRef.current) {
      formRef.current.setFieldsValue({
        Identification: record.Doctor_ID,
        Experience: record.Y_O_E,
        fullname: record.Full_Name,
        speciality: record.Speciality,
      });
    }
  };
  const onSubmit = async () => {
    const values = formRef.current.getFieldsValue();

    try {
      const response = await api.post(
        "api/data/doctor/edit_doctor.php",
        values
      );
      if (response.data.success && response.status == 200) {
        Notification.success({
          title: "Success",
          content: response.data.message,
        });
      } else {
        Notification.error({
          title: "Error",
          content: response.data.error || "Failed to edit doctor",
        });
      }
    } catch (error) {
      Notification.error({
        title: "Error",
        content: error,
      });
    }
  };

  const deleteRow = async (record) => {
    try {
      const del_response = await api.post(
        "api/data/doctor/delete_doctor.php",
        record
      );
      if (del_response.data.success === true && del_response.status === 200) {
        Notification.success({
          title: "Deleted",
          content: del_response.data.message,
        });
      } else {
        Notification.error({
          title: "Error",
          content: del_response.data.error,
        });
      }
    } catch (error) {
      Notification.error({
        title: "Error",
        content: "Our Bad",
      });
    }
  };

  const columns = [
    {
      title: "Doctor ID",
      dataIndex: "Doctor_ID",
      sorter: (a, b) => a.Doctor_ID - b.Doctor_ID,
    },
    {
      title: "Full Name",
      dataIndex: "Full_Name",
      sorter: (a, b) => a.Full_Name.localeCompare(b.Full_Name),
    },
    {
      title: "Speciality",
      dataIndex: "Speciality",
      sorter: (a, b) => a.Speciality.localeCompare(b.Speciality),
    },
    {
      title: "Years of Experience",
      dataIndex: "Y_O_E",
      sorter: (a, b) => a.Y_O_E - b.Y_O_E,
    },
    {
      title: "",
      render: (_, record) => (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              gap: "10px",
            }}
          >
            <Tooltip content="Edit">
              <IconEdit onClick={() => editRow(record)} />
            </Tooltip>
            <Popconfirm
              focusLock
              title="Confirm"
              content="Are you sure you want to delete?"
              onOk={() => {
                deleteRow(record);
              }}
            >
              <Tooltip content="Delete">
                <IconDelete />
              </Tooltip>
            </Popconfirm>
          </div>
        </div>
      ),
    },
  ];

  const showFormHandler = () => {
    setShowForm(true);
  };

  const closeFormHandler = () => {
    setShowForm(false);
    showEditForm(false);
  };

  return (
    <div>
      <Button
        style={{
          marginBottom: 10,
          marginLeft: "calc(100% - 60px)",
        }}
        type="primary"
        onClick={showFormHandler}
      >
        Add
      </Button>
      <Drawer
        width={500}
        title="Add a Doctor today"
        visible={showForm}
        onOk={closeFormHandler}
        onCancel={closeFormHandler}
        destroyOnClose
        footer={null}
      >
        <DynamicForm onCancel={closeFormHandler} />
      </Drawer>
      <Drawer
        width={500}
        title="Doctor editing form"
        visible={editForm}
        onOk={closeFormHandler}
        onCancel={closeFormHandler}
        destroyOnClose
        footer={null}
      >
        <Form
          ref={formRef}
          style={{ maxWidth: 500 }}
          autoComplete="off"
          onSubmit={onSubmit}
        >
          <Form.Item label="Doctor ID" required style={{ marginBottom: 0 }}>
            <Grid.Row gutter={8}>
              <Grid.Col span={12}>
                <Form.Item field="Identification" rules={[{ required: true }]}>
                  <Input disabled placeholder="please enter Identification" />
                </Form.Item>
              </Grid.Col>
              <Grid.Col span={12}>
                <Form.Item field="Experience" rules={[{ required: true }]}>
                  <Input placeholder="Years of Experience" />
                </Form.Item>
              </Grid.Col>
            </Grid.Row>
          </Form.Item>
          <Form.Item label="Full Name" required>
            <Grid.Row align="center">
              <Form.Item
                field="fullname"
                noStyle={{ showErrorTip: true }}
                rules={[{ required: true }]}
              >
                <Input placeholder="Full Name" />
              </Form.Item>
              <Tooltip content="必须填写哦">
                <IconExclamationCircle
                  style={{ margin: "0 8px", color: "rgb(var(--arcoblue-6))" }}
                />
              </Tooltip>
            </Grid.Row>
          </Form.Item>
          <Form.Item label="Speciality" required>
            <Grid.Row align="center">
              <Form.Item
                field="speciality"
                noStyle={{ showErrorTip: true }}
                rules={[{ required: true }]}
              >
                <Select
                  options={["Therapist", "Surgeon", "Scanner"]}
                  placeholder="Enter Speciality"
                  style={{ flex: 1 }}
                />
              </Form.Item>
              <Tooltip content="必须填写哦">
                <IconExclamationCircle
                  style={{ margin: "0 8px", color: "rgb(var(--arcoblue-6))" }}
                />
              </Tooltip>
            </Grid.Row>
          </Form.Item>

          <Form.Item label=" ">
            <Space size={24}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button
                onClick={() => {
                  formRef.current.resetFields();
                }}
              >
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>{" "}
      </Drawer>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table
          data={doctors}
          columns={columns}
          onChange={(pagination, changedSorter) => {
            console.log(changedSorter);
          }}
        />
      )}
    </div>
  );
};

export default App;
