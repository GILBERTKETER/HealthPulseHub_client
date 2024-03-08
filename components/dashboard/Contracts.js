import { useState,useEffect, useRef } from "react";
import { Table, Input, Button } from "@arco-design/web-react";
import { IconSearch } from "@arco-design/web-react/icon";
import api from "../../utils/api";


function Contracts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get("api/data/contract/api.php");
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
  const columns = [
    {
      title: "Contract Name",
      dataIndex: "Contract_Name",
      filterIcon: <IconSearch />,
      filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
        return (
          <div className="arco-table-custom-filter">
            <Input.Search
              ref={inputRef}
              searchButton
              placeholder="Please enter name"
              value={filterKeys[0] || ""}
              onChange={(value) => {
                setFilterKeys(value ? [value] : []);
              }}
              onSearch={() => {
                confirm();
              }}
            />
          </div>
        );
      },
      onFilter: (value, row) => (value ? row.name.indexOf(value) !== -1 : true),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => inputRef.current.focus(), 150);
        }
      },
    },
    {
      title: "Contract ID",
      dataIndex: "Contract_ID",
    },
    {
      title: "Supervisor ID",
      dataIndex: "Supervisor_ID",
    },
    {
      title: "Start Date",
      dataIndex: "Start_Date",
    },
    {
      title: "End Date",
      dataIndex: "End_Date",
    },
    {
      title: "Company ID",
      dataIndex: "Company_ID",
    },
  ];
  return <Table columns={columns} data={data} />;
}

export default Contracts;
