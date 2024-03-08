// components/Layout.js
"use client";
import React from "react";
import Head from "next/head";
import "../styles/globals.sass";
import { useState, useEffect } from "react";
function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setDarkMode(storedTheme === "dark");
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark-theme", darkMode);
  }, [darkMode]);
  return (
    <>
      <Head>
        <title>HealthPulseHub 1.0</title>
        <meta name="description" content="Health Data Management Platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}

      <style jsx global>{`
        body.dark-theme {
          --color-bg-2: #232324;
          --color-border-2: hsla(0, 0%, 100%, 0.12);
          --color-primary-light-1: #003060;
          --color-bg-1: #17171a;
          --color-text-2: rgba(255, 255, 255, 0.7);
          --color-text-3: rgba(255, 255, 255, 0.5);
          --color-text-4: rgba(255, 255, 255, 0.3);
        }

        .index-bg {
          background-color: var(--color-primary-light-1);
        }
      `}</style>
    </>
  );
}

export default Layout;
