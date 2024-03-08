"use client";
import React from "react";
import "@arco-design/web-react/dist/css/arco.css";

import Layout from "../../components/Layout";
import CreateCompany from "../../providers/create-company";
function Page() {
  return (
    <Layout>
      <CreateCompany />
    </Layout>
  );
}

export default Page;
