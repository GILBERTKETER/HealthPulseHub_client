import { Table } from "@arco-design/web-react";
import api from "../../utils/api";
import { useState, useEffect } from "react";
const columns = [
  {
    title: "Prescription ID",
    dataIndex: "Pres_ID",
    sorter: (a, b) => a.Doctor_ID - b.Doctor_ID,
    filters: [
      {
        text: "> 20000",
        value: "20000",
      },
      {
        text: "> 30000",
        value: "30000",
      },
    ],
    defaultFilters: ["20000"],
    onFilter: (value, row) => row.salary > value,
    sortDirections: ["ascend"],
    defaultSortOrder: "ascend",
  },
  {
    title: "Quantity",
    dataIndex: "Quantity",
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "Paris",
        value: "Paris",
      },
    ],
    onFilter: (value, row) => row.address.indexOf(value) > -1,
    filterMultiple: false,
  },
  {
    title: "Date",
    dataIndex: "Date_Time",
    sorter: (a, b) => a.Date_Time.length - b.Date_Time.length,
  },
];
const Prescriptions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get("api/data/prescription/api.php");
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
  return <Table columns={columns} data={data} />;
};

export default Prescriptions;
