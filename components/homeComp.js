"use client";
import React from "react";
import {
  Button,
  Space,
  PageHeader,
  Typography,
  Steps,
  Switch,
} from "@arco-design/web-react";
import { IconSunFill, IconMoonFill } from "@arco-design/web-react/icon";
import { useState, useEffect } from "react";
import Link from "next/link";
function Homecomp() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setDarkMode(storedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      localStorage.removeItem("theme");
      setDarkMode(false);
    } else {
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  useEffect(() => {
    document.body.classList.toggle("dark-theme", darkMode);
  }, [darkMode]);
  return (
    <>
      <Space>
        <Switch
          checked={darkMode}
          checkedIcon={<IconMoonFill />}
          uncheckedIcon={<IconSunFill />}
          onChange={toggleTheme}
        />
        {/* <Link href="/pharmaceuticals">
          <Button type="primary">Pharmaceuticals</Button>
        </Link> */}
        <Link href="/auth/login">
          <Button type="secondary">Login</Button>
        </Link>
        <Link href="/auth/register">
          <Button type="outline">Sign Up</Button>
        </Link>
      </Space>
    </>
  );
}

export default Homecomp;
