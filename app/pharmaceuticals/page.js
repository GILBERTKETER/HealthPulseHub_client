"use client";
import React from "react";
import AppBody from "../../providers/appBody";
import { Space } from "@arco-design/web-react";
import ListNav from "../../components/list_nav1";
import Layout from "../../components/Layout";
function Page() {
  return (
    <>
      <Layout>
        <Space>
          <ListNav />
        </Space>
        <AppBody />
      </Layout>
    </>
  );
}

export default Page;