"use client";
import React from "react";
import {
  IconUser,
  IconCamera,
  IconEdit,
  IconClose,
  IconLocation,
  IconDown,
  IconSettings,
  IconLanguage,
} from "@arco-design/web-react/icon";

import {
  Button,
  PageHeader,
  Typography,
  Steps,
  Avatar,
  Switch,
  Message,
  Dropdown,
  Footer,
  Menu,
  Divider,
  Link,
  Descriptions,
  Drawer,
  ConfigProvider,
} from "@arco-design/web-react";
import { Input, Space, Topography } from "@arco-design/web-react";
import { IconSunFill, IconMoonFill } from "@arco-design/web-react/icon";
import { useState, useEffect } from "react";
// import { Drawer } from "antd";
import { Upload, Radio } from "@arco-design/web-react";
const defaultFileList = [
  {
    uid: "-3",
    name: "light.png",
    url: "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp",
  },
];
function Extra() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setDarkMode(storedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      localStorage.removeItem("theme");
      setDarkMode(false);
    } else {
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  useEffect(() => {
    document.body.classList.toggle("dark-theme", darkMode);
  }, [darkMode]);
  const InputSearch = Input.Search;
  const handleLogout = () => {
    Message.success("Logout successful");
    setVisible(false);
  };

  const [visible, setVisible] = useState(false);
  return (
    <>
      <Drawer
        width={350}
        title={<span>My Information </span>}
        visible={visible}
        onOk={() => {
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);
        }}
        footer={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button type="secondary" onClick={handleLogout}>
              Logout
            </Button>
            <span style={{ textAlign: "center", color: "var(--color-text-2)" }}>
              © HealthPulseHub V 1.0.0{" "}
            </span>
          </div>
        }
      >
        <Descriptions
          colon=""
          title="Personal Information"
          column={1}
          labelStyle={{ width: 100 }}
          data={[
            {
              label: "Name",
              value: "Orwell",
            },
            {
              label: "Date of birth",
              value: "1995.01.01",
            },
            {
              label: "City",
              value: "Beijing",
            },
            {
              label: "To work",
              value: "2017.07",
            },
          ]}
        />

        <Divider />
        <Descriptions
          colon=""
          title="Contact Information"
          column={1}
          labelStyle={{ width: 100 }}
          data={[
            {
              label: "Telephone",
              value: "+86 136-6333-2888",
            },
            {
              label: "Email",
              value: "123456789@163.com",
            },
            {
              label: "Website",
              value: <Link to="/">https://123456789/design.com/</Link>,
            },
          ]}
        />
        <Divider />
        <Upload
          listType="picture-list"
          action="/"
          multiple
          defaultFileList={defaultFileList}
        ></Upload>
      </Drawer>
      <Space>
        <InputSearch
          searchButton
          defaultValue="Search content"
          placeholder="Enter keyword to search"
          style={{ width: 350 }}
        />

        <Avatar
          triggerIcon={<IconCamera onClick={() => Message.info("Upload...")} />}
          triggerIconStyle={{
            color: "#3491FA",
          }}
          autoFixFontSize={false}
          style={{
            backgroundColor: "#168CFF",
          }}
          onClick={() => {
            setVisible(true);
          }}
        >
          A
        </Avatar>

        <Switch
          checked={darkMode}
          checkedIcon={<IconMoonFill />}
          uncheckedIcon={<IconSunFill />}
          onChange={toggleTheme}
        />
      </Space>
    </>
  );
}

export default Extra;
