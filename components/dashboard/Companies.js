import React from 'react';
import { Table, Grid, Switch, Form, Radio } from '@arco-design/web-react';

const FormItem = Form.Item;
const { Row, Col } = Grid;
const columns = [
  {
    title: 'Company ID',
    dataIndex: 'Company_ID',
  },
  {
    title: 'Company Name',
    dataIndex: 'Company_Name',
  },
  {
    title: 'Phone Number',
    dataIndex: 'Phone_Number',
  },
  {
    title: 'Registration Number',
    dataIndex: 'Registration_Number',
  },
  {
    title: 'Email',
    dataIndex: 'Org_Email',
  },
];
const defaultData = [
  {
    key: '1',
    name: 'Jane Doe',
    salary: 23000,
    address: '32 Park Road, London',
    email: 'jane.doe@example.com',
  },
  {
    key: '2',
    name: 'Alisa Ross',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com',
  },
  {
    key: '3',
    name: 'Kevin Sandra',
    salary: 22000,
    address: '31 Park Road, London',
    email: 'kevin.sandra@example.com',
  },
  {
    key: '4',
    name: 'Ed Hellen',
    salary: 17000,
    address: '42 Park Road, London',
    email: 'ed.hellen@example.com',
  },
  {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com',
  },
];
let data = defaultData;

class Companies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkbox: true,
      checkAll: true,
      border: true,
      borderCell: false,
      hover: true,
      stripe: false,
      loading: false,
      showHeader: true,
      fixedHeader: false,
      no_data: false,
      size: 'default',
      pagePosition: 'br',
    };
  }

  onChange = (type, checked) => {
    if (type === 'no_data') {
      data = checked ? [] : defaultData;
    }

    this.setState({
      [type]: checked,
    });
  };

  render() {
    const {
      checkbox,
      borderCell,
      checkAll,
      border,
      hover,
      stripe,
      loading,
      showHeader,
      fixedHeader,
      no_data,
      size,
      pagePosition,
    } = this.state;
    return (
      <div>
        <div>
        </div>
        <div>
          <Table
            columns={columns}
            data={data}
            {...this.state}
            rowSelection={
              checkbox && {
                type: 'checkbox',
                checkAll: checkAll,
              }
            }
            scroll={fixedHeader ? { y: 120 } : {}}
            style={{ marginTop: 10, }}
            pagination={{ pageSize: 5, }}
          />
        </div>
      </div>
    );
  }
}

export default Companies;
