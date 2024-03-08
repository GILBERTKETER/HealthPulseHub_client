import React from "react";
import "../styles/globals.sass";
import Nav from "../components/Pane";
import Layout from "../components/Layout";
import { DatabaseProvider } from "../context/DatabaseContext";
export default function CreateCompany() {
  return (
    <div>
      <DatabaseProvider>
        <Layout>
          <Nav />
        </Layout>
      </DatabaseProvider>
    </div>
  );
}
