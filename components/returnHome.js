import React from "react";
import { IconHome } from "@arco-design/web-react/icon";
import Link from "next/link";
function ReturnHome() {
  return (
    <Link href="/">
      <IconHome />
    </Link>
  );
}

export default ReturnHome;
