import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Typography,
  VerificationCode,
  Modal,
  Notification,
} from "@arco-design/web-react";
import api from "../../utils/api";
import P_achange from "./Pchange";

function Verify({ onClose, emailAddress }) {
  const [visible, setVisible] = React.useState(true);
  const [Pchangevisible, setPchangeVisisble] = useState(false);
  const [emailadd, setEmailadd] = useState("");
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
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
  const requestCode = async () => {
    const verificationEmail = {
      email: emailAddress,
    };
    const resp = await api.post("api/resend-reset/api.php", verificationEmail);
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

                const email = emailAddress;
                setEmailadd(email);
                const verificationDetails = {
                  code: codeValue,
                  email: email,
                };

                const response = await api.post(
                  "api/forgot_password/verify.php",
                  verificationDetails
                );

                if (response.status == 200) {
                  Notification.success({
                    title: "Verification confirmed!",
                    content: "You will be logged in!",
                  });
                  setVisible(false);
                  setPchangeVisisble(true);
                } else {
                  Notification.error({
                    title: "Verification failed!",
                    content: "Verification don't match. Please try again.",
                  });
                }
              } catch (error) {
                Notification.error({
                  title: "An error Occured",
                  content: "Verification failed. Please try again.",
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
      {Pchangevisible && <P_achange userEmail={emailadd} />}
    </Modal>
  );
}

export default Verify;
