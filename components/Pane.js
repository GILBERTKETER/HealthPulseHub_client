import {
  Button,
  Space,
  Popconfirm,
  Input,
  Switch,
  Dropdown,
  Menu,
} from "@arco-design/web-react";
import Link from "next/link";
import { IconLeft } from "@arco-design/web-react/icon";
import React, { useState } from "react";
import ApplicationConfigDrawer from "./Config1";
import PreviewQueryModal from "./PreviewQueryModal";
import "../styles/globals.sass";
import { useDatabase } from "../context/DatabaseContext";
export default function Nav() {
  const [showDrawer, setShowDrawer] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [name, setName] = useState(null);
  const { state: credentials } = useDatabase(); // Fetch credentials using the hook

  const openPreviewModal = () => {
    setShowPreviewModal(true);
  };

  const closePreviewModal = () => {
    setShowPreviewModal(false);
  };
  const openDrawer = (drawerName) => {
    setShowDrawer(drawerName);
  };

  const saveCompany = async () => {
    if (!name) {
      alert("Please enter a name.");
      return;
    }

    // const data = await saveData(name, credentials);

    // if (data.success) {
    //   console.log("Data saved successfully:", data.data);
    //   // Handle any additional logic here
    // } else {
    //   console.error("Failed to save data:", data.error);
    //   // Handle error case
    // }
  };

  return (
    <nav className="nav">
      <Space>
        <Link href="/pharmaceuticals" passHref>
          <IconLeft style={{ fontSize: 20 }} />
        </Link>
        <Input
          type="text"
          value={name}
          onChange={(value) => setName(value)}
          style={{ width: "240px" }}
        />
      </Space>

      <Space>
        <Button
          size="small"
          type="primary"
          status="success"
          shape="round"
          onClick={() => saveCompany()}
        >
          Save
        </Button>
        <Dropdown
          position="bottom"
          droplist={
            <Menu>
              <Menu.Item
                key="add"
                className="context-menu-item"
                onClick={() => addTable()}
              >
                Pharmacy
              </Menu.Item>
              <Menu.Item
                key="import"
                className="context-menu-item"
                onClick={() => setShowModal("import")}
              >
                Doctors
              </Menu.Item>
              <Menu.Item
                key="import"
                className="context-menu-item"
                onClick={() => setShowModal("import")}
              >
                Patients
              </Menu.Item>
              <Menu.Item
                key="import"
                className="context-menu-item"
                onClick={() => setShowModal("import")}
              >
                Nurses
              </Menu.Item>
              <Menu.Item
                key="import"
                className="context-menu-item"
                onClick={() => setShowModal("import")}
              >
                Drugs
              </Menu.Item>
              <Menu.Item
                key="import"
                className="context-menu-item"
                onClick={() => setShowModal("import")}
              >
                Contract
              </Menu.Item>
              <Menu.Item
                key="import"
                className="context-menu-item"
                onClick={() => setShowModal("import")}
              >
                Prescription
              </Menu.Item>
            </Menu>
          }
        >
          <Button size="small" type="primary" shape="round">
            + Add Entities
          </Button>
        </Dropdown>
        <Popconfirm
          title="Are you sure you want to delete all the tables?"
          okText="Yes"
          cancelText="No"
          position="br"
          onOk={() => {
            setTableDict({});
            setLinkDict({});
          }}
        >
          <Button size="small" type="outline" status="danger" shape="round">
            Clear
          </Button>
        </Popconfirm>

        <Button
          size="small"
          type="outline"
          shape="round"
          onClick={() => openPreviewModal()}
        >
          Preview query
        </Button>

        <Button
          size="small"
          type="outline"
          shape="round"
          onClick={() => openDrawer("config")}
        >
          Config
        </Button>
      </Space>
      <ApplicationConfigDrawer
        showDrawer={showDrawer}
        onCloseDrawer={() => setShowDrawer(null)}
      />
      <PreviewQueryModal
        showModal={showPreviewModal}
        onCloseModal={() => closePreviewModal()}
      />
    </nav>
  );
}
