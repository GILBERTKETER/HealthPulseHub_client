import React, { useState } from "react";
import { Layout, Menu, Breadcrumb, Message } from "@arco-design/web-react";
import Extra from "../../components/dashboard/extra";
import {
  IconHome,
  IconCalendar,
  IconCaretRight,
  IconCaretLeft,
} from "@arco-design/web-react/icon";
import Heading from "../../components/dashboard/heading";
import Doctor from "../../components/dashboard/Doctors";
import Companies from "../../components/dashboard/Companies";
import Contracts from "../../components/dashboard/Contracts";
import Drugs from "../../components/dashboard/Drugs";
import Home from "../../components/dashboard/Home";
import Patients from "../../components/dashboard/Patients";
import Pharmacies from "../../components/dashboard/Pharmacies";
import Prescriptions from "../../components/dashboard/Prescriptions";

const { Item: MenuItem, SubMenu } = Menu;
const { Sider, Header, Footer, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState("home");

  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const isComponentActive = (component) => selectedComponent === component;

  const extra = <Extra />;

  const renderComponent = (component) => {
    switch (component) {
      case "home":
        return <Home />;
      case "doctors":
        return <Doctor />;
      case "patients":
        return <Patients />;
      case "all_pharmacies":
        return <Pharmacies />;
      case "contracts":
        return <Contracts />;
      case "all_presp":
      case "doct_presc":
        return <Prescriptions />;
      case "all_drugs":
        return <Drugs />;
      case "drug_comp":
        return <Companies />;
      default:
        return null;
    }
  };
  const renderBreadcrumbItems = () => {
    const breadcrumbItems = ["Dashboard", selectedComponent];

    // Add subcomponents to breadcrumb if applicable
    if (selectedComponent === "pharmacies") {
      breadcrumbItems.push("All Pharmacies");
    } else if (selectedComponent === "prescriptions") {
      breadcrumbItems.push("All Prescriptions");
    }

    return breadcrumbItems;
  };
  return (
    <Layout
      className="layout-collapse-demo"
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        // border: "10px solid red",
        boxSizing: "border-box",
        maxHeight: "100vh",
      }}
    >
      <Sider
        collapsed={collapsed}
        onCollapse={handleCollapsed}
        collapsible
        trigger={collapsed ? <IconCaretRight /> : <IconCaretLeft />}
        breakpoint="xl"
        style={{
          minHeight: "100vh",
        }}
      >
        <div className="logo" />
        <Menu
          defaultOpenKeys={["home"]}
          defaultSelectedKeys={["home"]}
          style={{
            width: "100%",
          }}
        >
          <MenuItem
            key="home"
            disabled={isComponentActive("home")}
            onClick={() => setSelectedComponent("home")}
          >
            <IconHome />
            Home
          </MenuItem>
          <MenuItem
            key="doctors"
            disabled={isComponentActive("doctors")}
            onClick={() => setSelectedComponent("doctors")}
          >
            <IconCalendar />
            Doctors
          </MenuItem>
          <MenuItem
            key="patients"
            disabled={isComponentActive("patients")}
            onClick={() => setSelectedComponent("patients")}
          >
            <IconCalendar />
            Patients
          </MenuItem>
          <SubMenu
            key="pharmacies"
            title={
              <span>
                <IconCalendar />
                Pharmacies
              </span>
            }
          >
            <MenuItem
              key="all_pharmacies"
              disabled={isComponentActive("all_pharmacies")}
              onClick={() => setSelectedComponent("all_pharmacies")}
            >
              All Pharmacies
            </MenuItem>
            <MenuItem
              key="contracts"
              disabled={isComponentActive("contracts")}
              onClick={() => setSelectedComponent("contracts")}
            >
              Contracts
            </MenuItem>
            <SubMenu key="prescriptions" title="Prescriptions">
              <MenuItem
                key="all_presp"
                disabled={isComponentActive("all_presp")}
                onClick={() => setSelectedComponent("all_presp")}
              >
                All Prescriptions
              </MenuItem>
              <MenuItem
                key="doct_presc"
                disabled={isComponentActive("doct_presc")}
                onClick={() => setSelectedComponent("doct_presc")}
              >
                Prescribing Doctors
              </MenuItem>
            </SubMenu>
          </SubMenu>
          <SubMenu
            key="drugs"
            title={
              <span>
                <IconCalendar />
                Drugs
              </span>
            }
          >
            <MenuItem
              key="all_drugs"
              disabled={isComponentActive("all_drugs")}
              onClick={() => setSelectedComponent("all_drugs")}
            >
              All Drugs
            </MenuItem>
            <MenuItem
              key="drug_comp"
              disabled={isComponentActive("drug_comp")}
              onClick={() => setSelectedComponent("drug_comp")}
            >
              Drug Companies
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            paddingLeft: 20,
            // position: "fixed",
            // top: 0,
            // width: "100%",
            // boxSizing: "border-box",
          }}
        >
          <Heading extra={extra} />
        </Header>
        <Layout
          style={{
            padding: "0 24px",
            // border: "10px solid green",
            boxSizing: "border-box",
          }}
        >
          <Breadcrumb style={{ margin: "16px 0" }}>
            {renderBreadcrumbItems().map((item, index) => (
              <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <Content
            style={{
              overflow: "auto",
              height: "auto",
              // border: "10px solid blue",
              maxHeight: "80vh",
            }}
          >
            {renderComponent(selectedComponent)}
          </Content>
          <Footer>
            <p>hhheloooooooooooooo fooooooooooooterrrrrrrrrrrrrr</p>
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
