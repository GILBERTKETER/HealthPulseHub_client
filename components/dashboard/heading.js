// components/Heading.js
"use client";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Button,
  Space,
  PageHeader,
  Typography,
  Steps,
  Switch,
} from "@arco-design/web-react";

function Heading({ extra, ...pageProps }) {
  return (
    <>
      <Head>
        <title>HealthPulseHub 1.0</title>
        <meta name="description" content="Health Data Management Platform" />
        <link rel="icon" href="/favicon.ico" />

        <style>{"body { overflow: auto !important; }"}</style>
      </Head>
      <PageHeader
        style={{
          background: "var(--color-bg-1)",
          position: "sticky",
          top: 0,
          boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
          zIndex: 2,
          fontWeight: "bold",
        }}
        title="HealthPulseHub 1.0"
        subTitle="Health Data Management Platform"
        extra={[extra]}
      />
    </>
  );
}

export default Heading;
