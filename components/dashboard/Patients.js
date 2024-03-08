import React, { useRef, useState, useEffect } from "react";
import {
  Table,
  Space,
  Button,
  Drawer,
  Popconfirm,
  Tooltip,
  Form,
  Input,
  Notification,
} from "@arco-design/web-react";
import api from "../../utils/api";
import { IconEdit, IconDelete } from "@arco-design/web-react/icon";

function Patients() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pagination, setPagination] = useState({
    sizeCanChange: true,
    showTotal: true,
    total: 96,
    pageSize: 10,
    current: 1,
    pageSizeChangeResetCurrent: true,
  });
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [editRecord, setEditRecord] = useState({});

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get("api/data/patient/api.php");
      if (response.status === 200) {
        const data = response.data;
        setData(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const formRef = useRef();

  const handleEdit = (record) => {
    setEditFormVisible(true);
    setEditRecord(record);

    if (formRef.current) {
      formRef.current.setFieldsValue({
        patient_id: record.Patient_ID,
        patient_name: record.Patient_Name,
        Age: record.Age,
        Address: record.Address,
        Phone_Number: record.Phone_Number,
      });
    }
  };

  const handleDelete = async (record) => {
    try {
      const del_response = await api.post(
        "api/data/patient/delete_patient.php",
        record
      );
      if (del_response.data.success && del_response.status === 200) {
        Notification.success({
          title: "Deleted",
          content: del_response.data.message,
        });
        fetchData();
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

  const handleEditFormClose = () => {
    setEditFormVisible(false);
    setEditRecord({});
  };

  const handleEditSubmit = async (values) => {
    // Implement your edit logic here
    console.log("Edited record:", values);
    // You can send the edited data to the API here
    // Close the edit form
    handleEditFormClose();
    // Optionally, you can refetch the data to update the table
    fetchData();
  };

  const columns = [
    {
      title: "Patient ID",
      dataIndex: "Patient_ID",
    },
    {
      title: "Patient Name",
      dataIndex: "Patient_Name",
    },
    {
      title: "Age",
      dataIndex: "Age",
    },
    {
      title: "Address",
      dataIndex: "Address",
    },
    {
      title: "Phone Number",
      dataIndex: "Phone_Number",
    },
    {
      title: "",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            gap: "10px",
          }}
        >
          <Tooltip content="Edit">
            <IconEdit onClick={() => handleEdit(record)} />
          </Tooltip>
          <Popconfirm
            focusLock
            title="Confirm"
            content="Are you sure you want to delete?"
            onOk={() => {
              handleDelete(record);
            }}
          >
            <Tooltip content="Delete">
              <IconDelete />
            </Tooltip>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table
        loading={loading}
        columns={columns}
        data={data}
        pagination={pagination}
        onChange={(pagination) => setPagination(pagination)}
        rowSelection={{
          selectedRowKeys,
          onChange: (selectedRowKeys) => setSelectedRowKeys(selectedRowKeys),
        }}
      />
      <Drawer
        title="Edit Patient"
        width={500}
        visible={editFormVisible}
        onCancel={handleEditFormClose}
        footer={
          <Space>
            <Button onClick={handleEditFormClose}>Cancel</Button>
            <Button type="primary" onClick={handleEditSubmit}>
              Save
            </Button>
          </Space>
        }
      >
        <Form initialValues={editRecord} onSubmit={handleEditSubmit}>
          <Form.Item
            label="Patient ID"
            name="Patient_ID"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter Patient ID" disabled />
          </Form.Item>
          <Form.Item
            label="Patient Name"
            name="Patient_Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter Patient Name" />
          </Form.Item>
          <Form.Item label="Age" name="Age" rules={[{ required: true }]}>
            <Input placeholder="Enter Age" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="Address"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter Address" />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="Phone_Number"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter Phone Number" />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default Patients;
