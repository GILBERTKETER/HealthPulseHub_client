"use client";
import "../../../styles/globals.sass";
import React from "react";
import Layout from "../../../components/Layout";
import Heading from "../../../components/heading";
import { Button } from "@arco-design/web-react";
import Link from "next/link";
import Loginform from "./form";
import "@arco-design/web-react/dist/css/arco.css";
import ReturnHome from "../../../components/returnHome";
import { Space } from "antd";
export default function Login() {
  return (
    <div>
      <Layout>
        <Heading
          extra={
            <Space>
              <Link href="/auth/register">
                <Button type="primary">Get an Account</Button>
              </Link>
              <ReturnHome />
            </Space>
          }
        />
        <Loginform />
      </Layout>
    </div>
  );
}
