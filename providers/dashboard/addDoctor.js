import {
  Form,
  Input,
  Button,
  Grid,
  Select,
  InputNumber,
  Tooltip,
  Space,
  Notification,
} from "@arco-design/web-react";
import { IconExclamationCircle } from "@arco-design/web-react/icon";
import { useRef, useState } from "react";
import api from "../../utils/api";
function App() {
  const formRef = useRef();
  const [values, setValues] = useState({});

  const onSubmit = async (values) => {
    try {
      const response = await api.post("api/data/doctor/addDoctor.php", values);
      if (response.status == 200 && response.data.success == true) {
        Notification.success({
          title: "Accepted",
          content: response.data.message,
        });
      } else {
        Notification.error({
          title: "Error",
          content: response.data.error,
        });
      }
    } catch (error) {
      Notification.errro({
        title: "Unknown",
        content: "An error occured",
      });
    }
  };
  return (
    <div>
      <Form
        ref={formRef}
        style={{ maxWidth: 500 }}
        autoComplete="off"
        onSubmit={onSubmit}
        onValuesChange={(_, values) => {
          setValues(values);
        }}
      >
        <Form.Item label="Doctor ID" required style={{ marginBottom: 0 }}>
          <Grid.Row gutter={8}>
            <Grid.Col span={12}>
              <Form.Item field="Identification" rules={[{ required: true }]}>
                <Input placeholder="please enter Identification" />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={12}>
              <Form.Item field="Experience" rules={[{ required: true }]}>
                <Input placeholder="Years of Experince" />
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
      </Form>
    </div>
  );
}

export default App;
