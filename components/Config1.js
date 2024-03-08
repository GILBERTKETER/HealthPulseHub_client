import React, { useEffect } from "react";
import { Drawer, Form, Input, Button, Space } from "@arco-design/web-react";
import { useDatabase } from "../context/DatabaseContext";
function ApplicationConfigBaseForm({ defaultValues }) {
  const { state, setCredentials } = useDatabase();

  return (
    <>
      <Form.Item
        label="Host Name"
        field="hostname"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValue={state.hostname || defaultValues?.hostname}
        onChange={(value) => setCredentials({ hostname: value })}
      >
        <Input type="text" />
      </Form.Item>
      <Form.Item
        label="User Name"
        field="username"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValue={state.username || defaultValues?.username}
        onChange={(value) => setCredentials({ username: value })}
      >
        <Input type="text" />
      </Form.Item>

      <Form.Item
        label="Password"
        field="password"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValue={state.password || defaultValues?.password}
        onChange={(value) => setCredentials({ password: value })}
      >
        <Input type="password" />
      </Form.Item>

      <Form.Item
        label="Database"
        field="database"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValue={state.database || defaultValues?.database}
        onChange={(value) => setCredentials({ database: value })}
      >
        <Input type="text" />
      </Form.Item>
    </>
  );
}

export default function ApplicationConfigDrawer({ showDrawer, onCloseDrawer }) {
  const [form] = Form.useForm();
  const { state, setCredentials } = useDatabase();

  useEffect(() => {
    if (showDrawer === "config") {
      // Additional initialization logic if needed
    }
  }, [showDrawer]);

  const save = (values) => {
    // Handle save logic
    console.log("Saved values:", values);
    setCredentials(values); // Set credentials globally
    onCloseDrawer(); // Close the drawer after saving
  };

  return (
    <Drawer
      width={320}
      title="Config for Connection"
      visible={showDrawer === "config"}
      okText="Save"
      onCancel={() => onCloseDrawer()}
      footer={null}
      mask={false}
      style={{ boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)" }}
    >
      <Form
        form={form}
        labelAlign="left"
        requiredSymbol={false}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onValuesChange={(changedValues, allValues) => {
          console.log("Changed values:", changedValues);
          console.log("All values:", allValues);
        }}
        scrollToFirstError
      >
        <ApplicationConfigBaseForm
          defaultValues={
            {
              // Provide default values if needed
            }
          }
        />
      </Form>
      <div style={{ position: "absolute", bottom: 16, right: 16 }}>
        <Button type="primary" onClick={() => save(form.getFieldsValue())}>
          Configure
        </Button>
      </div>
    </Drawer>
  );
}
