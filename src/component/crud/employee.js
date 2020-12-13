import React, { useState, useReducer } from "react";
import { Table, Input, Button, DatePicker, Modal, notification, Space } from "antd";
import reqwest from "reqwest";
import axios from "axios";

const { Search } = Input;

const EmployeeList = () => {
  const [data, setData] = useState([]);
  const url = "http://128.199.190.229:9393/api/v1/company/employees/";

  const columns = [
    { title: "Mã nhân viên", dataIndex: "employee_code", key: "employee_code" },
    { title: "Tên", dataIndex: "employee_name", key: "employee_name" },
    { title: "CMT", dataIndex: "id_card", key: "id_card" },
    { title: "Ngày sinh", dataIndex: "date_of_birth", key: "date_of_birth" },
    { title: "SĐT", dataIndex: "phone_number", key: "phone_number" },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick={(e) => {
              updateEmployee(record);
            }}
          >
            Sửa
          </a>
          <a
            onClick={(e) => {
              deleteEmployee(record.id);
            }}
          >
            Xóa
          </a>
        </Space>
      ),
    },
  ];

  const updateEmployee = (employee) => {
    setEmployee(employee)
    showModel();
  };

  const deleteEmployee = (id) => {
    axios.delete(url + "/" + id).then((response) => {
      console.log(response);
      fetch(company.id);
      notification["success"]({
        message: "Deleted",
        duration: 3,
      });
    });
  };

  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [employee, setEmployee] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      date_of_birth: "",
      employee_code: "",
      employee_name: "",
      id: 0,
      id_card: "",
      phone_number: ""
    }
  )

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onSearch = (id) =>{
    fetch(id)
  }

  const [company, setCompany] = useState(
    {
      id: 0,
      address_in_building: "",
      authorized_capital: 0,
      company_id: 0,
      company_name: "",
      field_of_operation: "",
      ground_area: 0,
      phone_number: "",
      tax_number: "",
    }
  )

  const handleTableChange = (pagination, filters, sorter) => {
    fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

  const fetch = (id) => {
    setLoading(true);
    reqwest({
      url: url + "get_by_company?company_id=" + id,
      method: "get",
      type: "json",
      error: function(err) {
        if(err.status === 404){
          setLoading(false);
          setData([]);
        }
      }
    }).then((data) => {
      console.log(data);
      setLoading(false);
      setData(data);
    });

    reqwest({
      url: "http://128.199.190.229:9393/api/v1/companies/" + id,
      method: "get",
      type: "json",
    }).then((data) =>{
      setCompany(data)
      console.log(data)
    })
  };

  const showModel = () => {
    setVisible(true);
  };

  const handlePost = () => {
    setConfirmLoading(true)
    axios
      .post(url, {
        'company':{
          company_id: company.id,
          address_in_building: company.address_in_building,
          authorized_capital: company.authorized_capital,
          company_name: company.company_name,
          field_of_operation: company.field_of_operation,
          ground_area: company.ground_area,
          phone_number: company.phone_number,
          tax_number: company.tax_number,
        },
        "date_of_birth": employee.date_of_birth,
        "employee_code": employee.employee_code,
        "employee_name": employee.employee_name,
        "id_card": employee.id_card,
        "phone_number": employee.phone_number
      })
      .then((response) => {
        fetch(company.id);
        notification["success"]({
          message: "Add Success",
          duration: 3,
        });
        setVisible(false);
        setConfirmLoading(false);
      });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handlePut = () => {
    setConfirmLoading(true)
    axios
      .post(url, {
        'company':{
          company_id: company.id,
          address_in_building: company.address_in_building,
          authorized_capital: company.authorized_capital,
          company_name: company.company_name,
          field_of_operation: company.field_of_operation,
          ground_area: company.ground_area,
          phone_number: company.phone_number,
          tax_number: company.tax_number,
        },
        "id": employee.id,
        "date_of_birth": employee.date_of_birth,
        "employee_code": employee.employee_code,
        "employee_name": employee.employee_name,
        "id_card": employee.id_card,
        "phone_number": employee.phone_number
      })
      .then((response) => {
        fetch(company.id);
        notification["success"]({
          message: "Update Success",
          duration: 3,
        });
        setVisible(false);
        setConfirmLoading(false);
      });
  }

  const handleChanged = (evt) => {
    const { name, value } = evt.target;
    setEmployee({ [name]: value });
  };

  const handleDate = (date, dateString) =>{
    setEmployee({['date_of_birth']: dateString})
  }

  return (
    <div>
      <Search
        placeholder="Nhập mã Công ty"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
      <h1>{company.company_name}</h1>
      <Table
        columns={columns}
        dataSource={data}
        pagination={pagination}
        onChange={handleTableChange}
        loading={loading}
      />
      <Button type="primary" onClick={showModel}>
        Add New
      </Button>
      <Modal
        title="Add new Service"
        visible={visible}
        onOk={handlePost}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        footer={[
            <Button key="back" onClick={handleCancel}>
              Return
            </Button>,
            <Button
              key="put"
              type="primary"
              loading={loading}
              onClick={handlePut} >
              Update
            </Button>,
            <Button
              key="post"
              type="primary"
              loading={loading}
              onClick={handlePost}>
              Add new
            </Button>,
          ]}
      >
        <Input
          placeholder="Name"
          name="employee_name"
          value={employee.employee_name}
          onChange={e => handleChanged(e)}
        />
        <Input
          placeholder="Code"
          name="employee_code"
          value={employee.employee_code}
          onChange={e => handleChanged(e)}
        />
        <Input
          placeholder="Address"
          name="id_card"
          value={employee.id_card}
          onChange={e => handleChanged(e)}
        />
        <DatePicker
          placeholder="Date of Birth"
          name="date_of_birth"
          onChange={(date, dateString) => handleDate(date, dateString)}
        />
        <Input
          placeholder="Phone number"
          name="phone_number"
          value={employee.phone_number}
          onChange={e => handleChanged(e)}
        />
      </Modal>
    </div>
  );
};

export default EmployeeList;
