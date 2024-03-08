import { useState } from "react";
import {
  IconUser,
  IconLock,
  IconPlus,
  IconEye,
  IconEyeInvisible,
  IconEmail,
} from "@arco-design/web-react/icon";
import api from "../../utils/api";
import {
  Modal,
  Button,
  Form,
  Input,
  Select,
  Message,
  Spin,
  Notification,
} from "@arco-design/web-react";
import {
  IconInfoCircleFill,
  IconCheckCircleFill,
} from "@arco-design/web-react/icon";

const FormItem = Form.Item;

const sleep = async (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

function P_achange({ userEmail }) {
  const [visible, setVisible] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onOk = async () => {
    try {
      await form.validate();
      setConfirmLoading(true);

      const newPwd = form.getFieldValue("password");

      const newPassword = {
        newPassword: newPwd,
        userEmail: userEmail,
      };
      const response = await api.post(
        "api/forgot_password/change.php",
        newPassword
      );

      Modal.success({
        title: "Success",
        content: "Password changed successfully!",
        onOk: () => {
          setVisible(false);
        },
      });
      Notification.success({
        title: "Accepted!",
        content: response.data.message,
      });
    } catch (error) {
      // Handle error
      Modal.error({
        title: "Error",
        content: error.message || "An unexpected error occurred.",
      });
      Notification.error({
        title: "Error from Application!",
        content: response.data.error,
      });
    } finally {
      setConfirmLoading(false);
    }
  };

  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };

  return (
    <Modal
      title="Change your password!"
      visible={visible}
      onOk={onOk}
      confirmLoading={confirmLoading}
      onCancel={() => setVisible(false)}
    >
      <Form
        {...formItemLayout}
        form={form}
        labelCol={{
          style: { flexBasis: 90 },
        }}
        wrapperCol={{
          style: { flexBasis: "calc(100% - 90px)" },
        }}
      >
        <FormItem
          label="Password"
          field="password"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <Input
            prefix={<IconLock />}
            suffix={
              passwordVisible ? (
                <IconEyeInvisible
                  onClick={() => setPasswordVisible(!passwordVisible)}
                />
              ) : (
                <IconEye onClick={() => setPasswordVisible(!passwordVisible)} />
              )
            }
            type={passwordVisible ? "text" : "password"}
            placeholder="Enter your password"
          />
        </FormItem>
        <FormItem
          label="Confirm Password"
          field="confirm_password"
          dependencies={["password"]}
          rules={[
            {
              validator: (v, cb) => {
                if (!v) {
                  return cb("Confirm password is required");
                } else if (form.getFieldValue("password") !== v) {
                  return cb("Confirm password must be equal to password");
                }
                cb();
              },
            },
          ]}
        >
          <Input
            prefix={<IconLock />}
            type={passwordVisible ? "text" : "password"}
            placeholder="Confirm your password"
          />
        </FormItem>
      </Form>
    </Modal>
  );
}

export default P_achange;
