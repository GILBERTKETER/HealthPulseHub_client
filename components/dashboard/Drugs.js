import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { Button, Table, Input, Select, Form } from "@arco-design/web-react";
import api from "../../utils/api";

const FormItem = Form.Item;
const EditableContext = React.createContext({});

function EditableRow(props) {
  const { children, record, className, ...rest } = props;
  const refForm = useRef(null);

  const getForm = () => refForm.current;

  return (
    <EditableContext.Provider
      value={{
        getForm,
      }}
    >
      <Form
        style={{
          display: "table-row",
        }}
        children={children}
        ref={refForm}
        wrapper="tr"
        wrapperProps={rest}
        className={`${className} editable-row`}
      />
    </EditableContext.Provider>
  );
}

function EditableCell(props) {
  const { children, className, rowData, column, onHandleSave } = props;
  const ref = useRef(null);
  const refInput = useRef(null);
  const { getForm } = useContext(EditableContext);
  const [editing, setEditing] = useState(false);
  const handleClick = useCallback(
    (e) => {
      if (
        editing &&
        column.editable &&
        ref.current &&
        !ref.current.contains(e.target) &&
        !e.target.classList.contains("js-demo-select-option")
      ) {
        cellValueChangeHandler(rowData[column.dataIndex]);
      }
    },
    [editing, rowData, column]
  );
  useEffect(() => {
    editing && refInput.current && refInput.current.focus();
  }, [editing]);
  useEffect(() => {
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [handleClick]);

  const cellValueChangeHandler = (value) => {
    if (column.dataIndex === "salary") {
      const values = {
        [column.dataIndex]: value,
      };
      onHandleSave && onHandleSave({ ...rowData, ...values });
      setTimeout(() => setEditing(!editing), 300);
    } else {
      const form = getForm();
      form.validate([column.dataIndex], (errors, values) => {
        if (!errors || !errors[column.dataIndex]) {
          setEditing(!editing);
          onHandleSave && onHandleSave({ ...rowData, ...values });
        }
      });
    }
  };

  if (editing) {
    return (
      <div ref={ref}>
        {column.dataIndex === "salary" ? (
          <Select
            onChange={cellValueChangeHandler}
            defaultValue={rowData[column.dataIndex]}
            options={[2000, 5000, 10000, 20000]}
          />
        ) : (
          <FormItem
            style={{
              marginBottom: 0,
            }}
            labelCol={{
              span: 0,
            }}
            wrapperCol={{
              span: 24,
            }}
            initialValue={rowData[column.dataIndex]}
            field={column.dataIndex}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input ref={refInput} onPressEnter={cellValueChangeHandler} />
          </FormItem>
        )}
      </div>
    );
  }

  return (
    <div
      className={column.editable ? `editable-cell ${className}` : className}
      onClick={() => column.editable && setEditing(!editing)}
    >
      {children}
    </div>
  );
}

function Drugs() {
  const [count, setCount] = useState(5);

  const columns = [
    {
      title: "Drug ID",
      dataIndex: "Drug_ID",
      editable: true,
    },
    {
      title: "Trade Name",
      dataIndex: "Trade_Name",
      editable: true,
    },
    {
      title: "Drug Name",
      dataIndex: "Drug_Name",
    },
    {
      title: "Formula",
      dataIndex: "Formula",
    },
    {
      title: "Company ID",
      dataIndex: "Company_ID",
    },
    {
      render: (_, record) => (
        <Button
          onClick={() => removeRow(record.key)}
          type="primary"
          status="danger"
        >
          Delete
        </Button>
      ),
    },
  ];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get("api/data/drug/api.php");
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
  function handleSave(row) {
    const newData = [...data];
    const index = newData.findIndex((item) => row.key === item.key);
    newData.splice(index, 1, { ...newData[index], ...row });
    setData(newData);
  }

  function removeRow(key) {
    setData(data.filter((item) => item.key !== key));
  }

  function addRow() {
    setCount(count + 1);
    setData(
      data.concat({
        key: `${count + 1}`,
        name: "Tom",
        salary: 10000,
        address: "33 Park Road, London",
        email: "tom@example.com",
      })
    );
  }

  return (
    <>
      <Button
        style={{
          marginBottom: 10,
        }}
        type="primary"
        onClick={addRow}
      >
        Add
      </Button>
      <Table
        data={data}
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
        columns={columns.map((column) =>
          column.editable
            ? {
                ...column,
                onCell: () => ({
                  onHandleSave: handleSave,
                }),
              }
            : column
        )}
        className="table-demo-editable-cell"
      />
    </>
  );
}

export default Drugs;
