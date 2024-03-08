import React from "react";
import { Button, Divider } from "@arco-design/web-react";
import { IconCaretDown } from "@arco-design/web-react/icon";

function AppBody() {
  return (
    <div className="appBody">
      <div className="graph-list-btns">
        <Button size="large" type="primary" onClick={() => handlerAddGraph()}>
          Create a company
        </Button>
        <Divider orientation="center">
          {" "}
          <div>
            <h3>
              <IconCaretDown style={{ fontSize: "1.5em" }} />
            </h3>
            <h3>
              <IconCaretDown style={{ fontSize: "1.5em" }} />
            </h3>
            <h3>
              <IconCaretDown style={{ fontSize: "1.5em" }} />
            </h3>
          </div>
          * Design pharmaceutical company with HealthPulseHub *{" "}
        </Divider>
      </div>
      <div className="graph-list-btns">
        <Button size="large" type="primary" onClick={() => {}}>
          Create Pharmacies
        </Button>
        <Divider orientation="center">
          {" "}
          <div>
            <h3>
              <IconCaretDown style={{ fontSize: "1.5em" }} />
            </h3>
            <h3>
              <IconCaretDown style={{ fontSize: "1.5em" }} />
            </h3>
            <h3>
              <IconCaretDown style={{ fontSize: "1.5em" }} />
            </h3>
          </div>
          * Increase production rate *{" "}
        </Divider>
      </div>
    </div>
  );
}

export default AppBody;
