// components/forgot_password.js
import { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Message,
  Notification,
} from "@arco-design/web-react";
import Verify from "./Verify"; // Import the Verify component
import api from "../../utils/api";
import P_achange from "./Pchange";
const FormItem = Form.Item;

function ForgotPassword({ visible, onClose }) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [verificationVisible, setVerificationVisible] = useState(false); // State for Verify modal
  const [form] = Form.useForm();
  const [loading2, setLoading2] = useState(false);

  const [email, setEmail] = useState("");
  const onOk = async () => {
    const formValues = form.getFieldsValue();

    try {
      await form.validate();
      // let emailAddress;
      const email = formValues.email;
      // emailAddress = email;
      setEmail(email);
      // localStorage.setItem("email", email);

      setConfirmLoading(true);
      setTimeout(() => {
        Message.success("Success!");
        sendEmail(formValues);
        // setVerificationVisible(true);
        onClose();
      }, 1500);
    } catch (error) {
      Notification.error({
        title: "Error",
        content: "Verification failed!",
      });
    }
  };
  const sendEmail = async (userData) => {
    let response;

    try {
      response = await api.post(
        "api/forgot_password/emailcheck_api.php",
        userData
      );

      if (response.status == 200 && response.data.success == true) {
        Notification.success({
          title: "Success",
          content: response.data.message,
        });
        setVerificationVisible(true);
      } else {
        Notification.error({
          title: "Error from Application.",
          content: response.data.error,
        });
      }
    } catch (error) {
      Notification.error({
        title: "Error",
        content: "Error from Application.",
      });
      if (response && response.data && response.data.error) {
        Notification.error({
          title: response.data.error,
          content: "An unexpected error occurred.",
        });
      } else {
        Notification.error({
          title: "unknown",
          content: "An unexpected error occurred.",
        });
        // }
      }
    } finally {
      setTimeout(() => {
        setConfirmLoading(false);
      }, 1000);
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
    <>
      <Modal
        title="Forgot Password"
        visible={visible}
        onOk={onOk}
        confirmLoading={confirmLoading}
        onCancel={onClose}
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
            label="Email"
            field="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Email of organization is required",
              },
            ]}
          >
            <Input placeholder="Enter your email" />
          </FormItem>
        </Form>
      </Modal>
      {verificationVisible ? (
        <Verify
          onClose={() => setVerificationVisible(false)}
          emailAddress={email}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default ForgotPassword;
