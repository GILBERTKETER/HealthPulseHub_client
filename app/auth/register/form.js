import React, { useState, useEffect, use } from "react";
import { Input, Button } from "@arco-design/web-react";
import {
  IconUser,
  IconLock,
  IconEye,
  IconEyeInvisible,
  IconEmail,
  IconBook,
  IconHome,
  IconBranch,
} from "@arco-design/web-react/icon";
import { Form, Message } from "@arco-design/web-react";
import Layout from "../../../components/Layout";
import api from "../../../utils/api";
import { Card, Notification } from "@arco-design/web-react";
import { Image } from "@arco-design/web-react";
import Verify from "../../../components/Verify";
const FormItem = Form.Item;

const Registerform = () => {
  const [form] = Form.useForm();
  const [loading2, setLoading2] = useState(false);
  const [showVerify, setShowVerify] = useState(false);

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
  }, [currentImageIndex, imageUrls.length]);

  const onClickBtn2 = async () => {
    setLoading2(true);

    const formValues = form.getFieldsValue();

    const emailValidation = validateEmail(formValues.email_org);
    if (emailValidation) {
      Notification.error({
        title: "Error",
        content: emailValidation,
      });
      setLoading2(false);
      return;
    }
    localStorage.setItem("email", formValues.email_org);

    registerUser(formValues);
  };

  const validateEmail = (value) => {
    if (value && value.indexOf("@") === -1) {
      return 'Email must contain the "@" symbol';
    }
    return null;
  };

  const registerUser = async (userData) => {
    let response;

    try {
      response = await api.post("api/register/api.php", userData);

      if (response.status == 200 && response.data.success == true) {
        Notification.success({
          title: "Success",
          content: response.data.message,
        });
        setShowVerify(true);
      } else {
        Notification.error({
          title: "Error",
          content: response.error || "Error from Application.",
        });
      }
    } catch (error) {
      console.log(error);
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
  // const [confirmLoading, setConfirmLoading] = React.useState(false);
  // const [visible, setVisible] = React.useState(true);
  // const [email, setEmail] = useState("");

  return (
    <Layout>
      <>
        {showVerify ? <Verify /> : ""};
        {imageUrls.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Slide ${index}`}
            className={`slide ${index === currentImageIndex ? "active" : ""}`}
          />
        ))}
        <Card
          className="cardLogin"
          title="Welcome to HealthPulseHub Registration platform"
        >
          <div className="holder">
            <div className="leftPane">
              <Image
                className="avif"
                width={"100%"}
                height={"100%"}
                src="/images/reg.png"
                alt="lamp"
              />
            </div>
            <div className="login-container">
              <div className="avatar-container">
                <img className="avatar" src="/images/logo.png" alt="Avatar" />
              </div>
              <h2 className="healthtitle">Register in to HealthPulseHub</h2>
              <Form
                form={form}
                style={{ width: "100%" }}
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
                  field="company_id"
                  rules={[
                    {
                      required: true,
                      message: "Organization ID is required",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    prefix={<IconUser />}
                    placeholder="Organization ID"
                  />
                </FormItem>
                <FormItem
                  field="Company_Name"
                  rules={[
                    {
                      required: true,
                      message: "Name of organization is required",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    prefix={<IconBranch />}
                    placeholder="Organization Name"
                  />
                </FormItem>
                <FormItem
                  field="Phone_Number"
                  rules={[
                    { required: true, message: "Phone number is required" },
                  ]}
                >
                  <Input
                    type="number"
                    prefix={<IconHome />}
                    placeholder="Enter phone number"
                  />
                </FormItem>
                <FormItem
                  field="Registration_Number"
                  rules={[
                    {
                      required: true,
                      type: "number",
                      message: "Business Registration Number is required",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    prefix={<IconBook />}
                    placeholder="Enter Registration Number"
                  />
                </FormItem>
                <FormItem
                  field="email_org"
                  rules={[
                    {
                      type: "email",
                      required: true,
                      message: "Email of organization is required",
                    },
                  ]}
                >
                  <Input
                    type="email"
                    prefix={<IconEmail />}
                    placeholder="Enter Email for organization"
                  />
                </FormItem>

                <FormItem
                  field="password"
                  rules={[{ required: true, message: "Password is required" }]}
                >
                  <Input
                    prefix={<IconLock />}
                    suffix={
                      passwordVisible ? (
                        <IconEyeInvisible
                          onClick={() => {
                            setPasswordVisible(!passwordVisible);
                          }}
                        />
                      ) : (
                        <IconEye
                          onClick={() => {
                            setPasswordVisible(!passwordVisible);
                          }}
                        />
                      )
                    }
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Enter your password"
                  />
                </FormItem>

                <FormItem
                  field="confirm_password"
                  dependencies={["password"]}
                  rules={[
                    {
                      validator: (v, cb) => {
                        if (!v) {
                          return cb("confirm_password is required");
                        } else if (form.getFieldValue("password") !== v) {
                          return cb(
                            "confirm_password must be equal with password"
                          );
                        }
                        cb(null);
                      },
                    },
                  ]}
                >
                  <Input
                    maxLength={{ length: 15, errorOnly: true }}
                    showWordLimit
                    prefix={<IconLock />}
                    type={passwordVisible ? "text" : "password"}
                    placeholder="please confirm your password"
                  />
                </FormItem>
                <FormItem>
                  <Button
                    loading={loading2}
                    onClick={onClickBtn2}
                    type="primary"
                    htmlType="submit"
                    long
                  >
                    {!loading2 ? "Register" : "Confirming details"}
                  </Button>
                </FormItem>
              </Form>
            </div>
          </div>
        </Card>
      </>
    </Layout>
  );
};

export default Registerform;
