"use client";
import React from "react";
import Heading from "../../../components/heading";
import { Button, Space } from "@arco-design/web-react";
import Link from "next/link";
import ReturnHome from "../../../components/returnHome";
import Registerform from "./form";
import "@arco-design/web-react/dist/css/arco.css";
import Layout from "../../../components/Layout";

function page() {
  return (
    <Layout>
      <Heading
        extra={
          <Space>
            <Link href="/auth/login">
              <Button type="primary">My Account</Button>
            </Link>
            <ReturnHome />
          </Space>
        }
      />
      <Registerform />
    </Layout>
  );
}

export default page;
