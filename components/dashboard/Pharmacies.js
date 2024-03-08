import React, { useEffect, useRef, useState } from "react";
import { Table, Button } from "@arco-design/web-react";
import api from "../../utils/api";

const columns = [
  {
    title: "Pharmacy ID",
    dataIndex: "Pharmacy_ID",
    // width: 140,
    fixed: "left",
  },
  {
    title: "Name",
    dataIndex: "Pharmacy_Name",
    // width: 100
  },
  {
    title: "Address",
    dataIndex: "Address",
  },
  {
    title: "Phone Number",
    dataIndex: "Phone_Number",
  },
];

// const data = Array(100000)
//   .fill('')
//   .map((_, index) => ({
//     Pharmacy_ID: `${index}`,
//     pharmacy_name: `Kevin ${index}`,
//     address: `${index} Park Road, London`,
//     Phone_Number: 22000,
//   }));

const Pharmacies = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const table = useRef(null);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get("api/data/pharmacy/api.php");
      if (response.status === 200) {
        const data = response.data;
        setData(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Button
        type="primary"
        onClick={() => table.current.scrollIntoView("500")}
        style={{
          marginBottom: 10,
        }}
      >
        滚动到第 500 条
      </Button>
      <Table
        ref={table}
        virtualized
        scroll={{
          y: 500,
          x: 1000,
        }}
        border
        columns={columns}
        data={data}
        pagination={false}
        // rowSelection={{}}
      />
    </div>
  );
};

export default Pharmacies;
