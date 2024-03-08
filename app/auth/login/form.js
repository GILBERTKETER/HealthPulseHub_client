import React, { useState, useEffect } from "react";
import { Input, Modal, Spin, Button, Space } from "@arco-design/web-react";
import { useRouter } from "next/navigation";
import { checkAuthentication } from "../../../utils/check_auth";
import {
  IconUser,
  IconLock,
  IconPlus,
  IconEye,
  IconEyeInvisible,
  IconEmail,
} from "@arco-design/web-react/icon";
import { Form, Message, Notification } from "@arco-design/web-react";

import {
  IconCheckCircleFill,
  IconInfoCircleFill,
} from "@arco-design/web-react/icon";
import Forgot_password from "../../../components/forgot/forgotPassword";
import { Card } from "@arco-design/web-react";
import { Image } from "@arco-design/web-react";
import api from "../../../utils/api";
import Link from "next/link";
import { redirect } from "next/dist/server/api-utils";
import Verify from "../../../components/Verify";
const FormItem = Form.Item;
const sleep = async (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};
const LoginForm = () => {
  const [showVerifyModal1, setShowVerifyModal1] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [loading2, setLoading2] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageUrls = [
    "/images/bg5.png",
    "/images/bg7.png",
    "/images/bg9.png",
    "/images/bg8.png",
    "/images/bg4.png",
  ];
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentImageIndex]);

  function onClickBtn2() {
    setLoading2(true);

    const formValues = form.getFieldsValue();
    // console.log(formValues);
    const emailValidation = validateEmail(formValues.email_org);
    if (emailValidation) {
      Notification.error({
        title: "Error",
        content: emailValidation,
      });
      setLoading2(false);
      return;
    }
    localStorage.setItem("email", formValues.email);
    logUser(formValues);
  }
  const router = useRouter();

  const logUser = async (userData) => {
    let response;
    const isAuthenticated = await checkAuthentication();
    if (isAuthenticated == true) {
      router.push("/dashboard");
    }
    try {
      response = await api.post("api/login/api.php", userData);
      // console.log(response);

      if (
        response.data.error != "Unverified" &&
        response.status == 200 &&
        response.data.success == true
      ) {
        Notification.success({
          title: response.data.message,
          content: "Welcome! Proceed to Dashboard.",
        });
        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);
      } else if (response.data.error == "Unverified") {
        //setShowVerifyModal1(true);
        Notification.error({
          title: "You are not verified",
          content: "Verify your account.",
        });
      } else {
        Notification.error({
          title: "Error from Application.",
          content: response.data.error,
        });
      }
    } catch (error) {
      // console.error("Error:", error);
      Notification.error({
        title: "Error",
        content: "An unexpected error occurred.",
      });
    } finally {
      setTimeout(() => {
        setLoading2(false);
      }, 1000);
    }
  };
  const openForgotPasswordModal = () => {
    setVisible(true);
  };

  const closeForgotPasswordModal = () => {
    setVisible(false);
  };
  const validateEmail = (value) => {
    if (value && value.indexOf("@") === -1) {
      return 'Email must contain the "@" symbol';
    }
    return null;
  };
  return (
    <>
      {showVerifyModal1 && <Verify />}
      {imageUrls.map((imageUrl, index) => (
        <img
          key={index}
          src={imageUrl}
          alt={`Slide ${index}`}
          className={`slide ${index === currentImageIndex ? "active" : ""}`}
        />
      ))}
      <Card className="cardLogin" title="Welcome to HealthPulseHub">
        <div className="holder">
          <div className="leftPane">
            <Image
              className="avif"
              width={"100%"}
              height={"100%"}
              src="/images/hospital.avif"
              alt="lamp"
            />
          </div>
          <div className="login-container">
            <div className="avatar-container">
              <img className="avatar" src="/images/logo.png" alt="Avatar" />
            </div>
            <h2 className="healthtitle">Sign in to HealthPulseHub</h2>
            <Form
              form={form}
              style={{ width: 320, margin: "0 auto" }}
              wrapperCol={{ span: 24 }}
              autoComplete="off"
              onValuesChange={(v, vs) => {
                // console.log(v, vs);
              }}
              onSubmit={(v) => {
                // console.log(v);
                Message.success("success");
              }}
            >
              <FormItem
                field="email"
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Email is required",
                  },
                ]}
              >
                <Input prefix={<IconEmail />} placeholder="Enter your Email" />
              </FormItem>

              <FormItem
                field="password"
                rules={[{ required: true, message: "password is required" }]}
              >
                <Input
                  prefix={<IconLock />}
                  suffix={
                    passwordVisible ? (
                      <IconEyeInvisible
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      />
                    ) : (
                      <IconEye
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      />
                    )
                  }
                  type={passwordVisible ? "text" : "password"}
                />
              </FormItem>
              <Space>
                <Link
                  href="#"
                  style={{
                    textDecoration: "none",
                    color: "var(--color-text-2)",
                    display: "flex",
                    alignItems: "flex-end",
                    marginLeft: "auto",
                    marginBottom: 10,
                  }}
                  onClick={openForgotPasswordModal}
                >
                  {" "}
                  forgot password?
                </Link>
                <Forgot_password
                  visible={visible}
                  onClose={closeForgotPasswordModal}
                />
              </Space>
              <FormItem>
                <Button
                  type="primary"
                  loading={loading2}
                  onClick={onClickBtn2}
                  htmlType="submit"
                  long
                >
                  {!loading2 ? "Sign in" : "Verifying"}
                </Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </Card>
    </>
  );
};

export default LoginForm;
