import React, { useState, useEffect } from "react";
import { Table } from "antd";
import reqwest from "reqwest";
import axios from "axios";

const EmployeeList = () => {
    const [data, setData] = useState([])
    const url = "http://128.199.190.229:9393/api/v1/company/employees"

    const columns = [
        {title: 'Mã nhân viên', dataIndex: 'employee_code', key: 'employee_code'},
        {title: 'Tên', dataIndex: 'employee_name', key: 'employee_name'},
        {title: 'CMT', dataIndex: 'id_card', key: 'id_card'},
        {title: 'Ngày sinh', dataIndex: 'date_of_birth', key: 'date_of_birth'},
        {title: 'SĐT', dataIndex: 'phone_number', key: 'phone_number'}
    ]

    const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch();
  }, []);

  const handleTableChange = (pagination, filters, sorter) => {
    fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

  const fetch = (params = {}) => {
    setLoading(true);
    reqwest({
      url: url,
      method: "get",
      type: "json",
    }).then((data) => {
      console.log(data);
      setLoading(false);
      setData(data);
    });
  };

  return(
    <Table 
        columns={columns}
        dataSource = {data}
        pagination={false}
        onChange={handleTableChange}
    />
  );
}

export default EmployeeList