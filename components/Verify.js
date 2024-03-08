import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Typography,
  VerificationCode,
  Modal,
  Notification,
} from "@arco-design/web-react";
import api from "../utils/api";

function Verify({ onClose }) {
  const [visible, setVisible] = React.useState(true);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [emailadd, setEmail] = useState("");
  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };
  const email = localStorage.getItem("email");
  // setEmail(email);

  const requestCode = async () => {
    const verificationEmail = {
      email: email,
    };
    const resp = await api.post("api/resend/api.php", verificationEmail);
    if ((resp.status == 200) && (resp.data.success == true)) {
      Notification.success({
        title: "Success",
        content: resp.data.message,
      });
    } else {
      Notification.error({
        title: "Error",
        content: resp.data.error,
      });
      setVisible(true);
    }
  };

  useEffect(() => {
    const emailFromStorage = localStorage.getItem("email");

    if (!emailFromStorage) {
      Notification.error({
        title: "Verification failed",
        content: "Please Register first!",
      });
    }
  }, []);
  return (
    <Modal
      title="Modal Title"
      visible={visible}
      onCancel={() => setVisible(false)}
      autoFocus={false}
      focusLock={true}
      footer={null}
      confirmLoading={confirmLoading}
    >
      <div className="demo-verify-code-wrapper">
        <Typography.Title heading={5}>
          Verification Code{" "}
          <Button
            onClick={requestCode}
            style={{ position: "absolute", right: "20px" }}
            type="secondary"
          >
            Resend code
          </Button>
        </Typography.Title>
        <Form form={form} wrapperCol={{ span: 24 }}>
          <Form.Item field="code" validateTrigger={["onFinish"]}>
            <VerificationCode
              size="large"
              validate={({ inputValue }) => /\d/.test(inputValue)}
            />
          </Form.Item>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            style={{ marginTop: 20 }}
            onClick={async () => {
              try {
                setConfirmLoading(true);

                const codeValue = form.getFieldValue("code");

                const verificationDetails = {
                  code: codeValue,
                  email: email,
                };

                const response = await api.post(
                  "api/verify-code/api.php",
                  verificationDetails
                );

                if (response.status == 200 && response.data.success == true) {
                  Notification.success({
                    title: response.data.message,
                    content: "Verification confirmed!Login now!",
                  });
                  setVisible(false);
                } else {
                  Notification.error({
                    title: "Verification failed!",
                    content: response.data.error,
                  });
                }
              } catch (error) {
                Notification.error({
                  title: "An error Occured",
                  content: response.data.error,
                });
              } finally {
                setConfirmLoading(false);
              }
            }}
          >
            Submit
          </Button>
        </Form>
      </div>
    </Modal>
  );
}

export default Verify;
