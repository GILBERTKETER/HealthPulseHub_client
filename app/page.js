// pages/_app.js
"use client";
// import "../styles/globals.sass";
import { DatabaseProvider } from "../context/DatabaseContext";
import React from "react";
import "@arco-design/web-react/dist/css/arco.css";
import Layout from "../components/Layout";
import HomePage from "../components/HomePage";
function MyApp({ Component, pageProps }) {
  return (
    <DatabaseProvider>
      <Layout>
        <HomePage {...pageProps} />
      </Layout>
    </DatabaseProvider>
  );
}

export default MyApp;
