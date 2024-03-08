// components/HomePage.js
"use client";
import Heading from "./heading";
import Link from "next/link";
import { Button, Typography, Steps } from "@arco-design/web-react";
import Homecomp from "./homeComp";

const Step = Steps.Step;

function HomePage() {
  const extra = <Homecomp />;

  return (
    <>
      <div className="index-container">
        <Heading extra={extra} />
        <div className="index-bg">
          <Typography.Title className="tc" type="secondary">
            <p>Simply easy</p>
            <p className="mark">
              {" "}
              Empowering Health Data Management and Analysis
            </p>
          </Typography.Title>
          <Link href="/pharmaceuticals">
            <Button
              type="primary"
              size="large"
              className="start-button"
              style={{
                fontSize: "2em",
                height: "auto",
              }}
            >
              Get started
            </Button>
          </Link>
        </div>

        <div className="index-steps">
          <Steps
            labelPlacement="vertical"
            current={5}
            style={{
              maxWidth: "1200px",
              margin: "100px auto",
            }}
          >
            <Step
              title="Capture Patient Information"
              description="Effortlessly record patient details"
            />
            <Step
              title="Establish Doctor-Patient Connections"
              description="Facilitate seamless communication"
            />
            <Step
              title="Manage Medications"
              description="Efficiently handle prescriptions and medications"
            />
          </Steps>
        </div>

        <div className="index-footer">
          <div className="mark1">
            <strong>HealthPulseHub</strong> | Health Data Management Platform
          </div>
          <Link href="/pharmaceuticals">
            <Button type="text">Get started free</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default HomePage;
