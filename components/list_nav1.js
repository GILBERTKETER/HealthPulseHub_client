import { Space, Button } from "@arco-design/web-react";
import React from "react";
import "@arco-design/web-react/dist/css/arco.css";
import Link from "next/link";
export default function ListNav() {
  return (
    <div className="nav">
      <div>
        <Link href="/" passHref>
          <strong>HealthPulseHub</strong> | Health Data Management Platform
        </Link>
      </div>
      <Space>
        <Link href="/new">
          <Button size="small" type="primary" shape="round">
            + New company
          </Button>
        </Link>
      </Space>
    </div>
  );
}
