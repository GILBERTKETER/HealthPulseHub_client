"use client";
import React from "react";
import "@arco-design/web-react/dist/css/arco.css";
import Layout from "../../components/Layout";
import { DatabaseProvider } from "../../context/DatabaseContext";
import Dashboard from ".";
import enUS from "@arco-design/web-react/es/locale/en-US";
import { ConfigProvider } from "@arco-design/web-react";

function page() {
  return (
    <ConfigProvider locale={enUS}>
      <DatabaseProvider>
        <Layout>
          <Dashboard />
        </Layout>
      </DatabaseProvider>
    </ConfigProvider>
  );
}

export default page;
