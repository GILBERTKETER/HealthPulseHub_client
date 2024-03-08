import React, { useState, useEffect } from "react";
import { Modal, Tabs } from "@arco-design/web-react";
import Editor from "@monaco-editor/react";

const { TabPane } = Tabs;

export default function PreviewQueryModal({ showModal, onCloseModal }) {
  const [editorContent, setEditorContent] = useState("");
  const [selectedDb, setSelectedDb] = useState("mysql");

  const handleExecute = () => {
    console.log("Executing query:", editorContent);
  };

  return (
    <Modal
      title="Preview Query"
      visible={showModal}
      onOk={() => handleExecute()}
      onCancel={() => onCloseModal()}
      okText="Execute"
      cancelText="Close"
    >
      <Tabs activeTab={selectedDb} onChange={(value) => setSelectedDb(value)}>
        <TabPane key="mysql" title="MySQL" />
        <TabPane key="postgres" title="PostgreSQL" />
        <TabPane key="mssql" title="MSSQL" />
        <TabPane key="dbml" title="DBML" />
      </Tabs>
      <Editor
        language={selectedDb === "dbml" ? "dbml" : "sql"}
        value={editorContent}
        onChange={(value) => setEditorContent(value)}
        height="200px"
      />
      {/* No need for an empty div */}
    </Modal>
  );
}
