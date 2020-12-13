import React, { useReducer, useState, useEffect } from "react";
import { Button, Table, Tag, Space, Modal, Input, notification } from "antd";
import reqwest from "reqwest";
import axios from "axios";
import EmployeeList from "./employee"
import 'antd/dist/antd.css';

const CompanyList = () => {
  const url = "http://128.199.190.229:9393/api/v1/companies";

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch({ pagination });
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
      setPagination({
        ...params.pagination,
        total: data.totalCount,
      });
    });
  };

  const columns = [
    {
      title: "Tên công ty",
      key: "company_name",
      dataIndex: "company_name",
    },
    {
      title: "Lĩnh vực hoạt động",
      key: "field_of_operation",
      dataIndex: "field_of_operation",
    },
    {
      title: "Vốn điều lệ",
      key: "authorized_capital",
      dataIndex: "authorized_capital",
    },
    {
      title: "Địa chỉ trong tòa nhà",
      key: "address_in_building",
      dataIndex: "address_in_building",
    },
    {
      title: "Diện tích mặt bằng",
      key: "ground_area",
      dataIndex: "ground_area",
    },
    {
      title: "Số điện thoại",
      key: "phone_number",
      dataIndex: "phone_number",
    },
    {
      title: "Mã số thuế",
      key: "tax_number",
      dataIndex: "tax_number",
    },
    {
      title: "Số nhân viên",
      key: "amount_employee",
      dataIndex: "amount_employee",
    },
    {
      title: "Tiền dịch vụ",
      key: "using_fee",
      dataIndex: "using_fee",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>Sửa</a>
          <a onClick={ (e) =>{
            deleteCompany(record.id)
          }}>Xóa</a>
        </Space>
      ),
    },
  ];

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [company, setCompany] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      address_in_building: "",
      authorized_capital: 0,
      company_id: 0,
      company_name: "",
      field_of_operation: "",
      ground_area: 0,
      phone_number: "",
      tax_number: "",
    }
  );

  const showModel = () => {
    setVisible(true);
  };

  const deleteCompany = (id) =>{
    axios.delete(url + '/' + id)
    .then((response) =>{
        console.log(response)
        fetch(pagination);
        notification["success"]({
            message: "Deleted",
            duration: 3,
          });
    })
  }

  const handleOk = () => {
    axios
      .post(url, {
        address_in_building: company.address_in_building,
        authorized_capital: company.authorized_capital,
        company_name: company.name,
        field_of_operation: company.field_of_operation,
        ground_area: company.ground_area,
        phone_number: company.phone_number,
        tax_number: company.tax_number,
      })
      .then((response) => {
        fetch(pagination);
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

  const handleChanged = (evt) => {
    const { name, value } = evt.target;
    setCompany({ [name]: value });
  };

  return (
    <div>
      <Button type="primary" onClick={showModel}>
        Add New
      </Button>

      <Modal
        title="Add new Company"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
      >
        <Input
          placeholder="Company Name"
          name="name"
          value={company.name}
          onChange={(e) => handleChanged(e)}
        />
        <Input
          placeholder="Field of Operation"
          name="field_of_operation"
          value={company.field_of_operation}
          onChange={(e) => handleChanged(e)}
        />
        <Input
          placeholder="Address in Building"
          name="address_in_building"
          value={company.address_in_building}
          onChange={(e) => handleChanged(e)}
        />
        <Input
          placeholder="Authorized Capital"
          name="authorized_capital"
          value={company.authorized_capital}
          onChange={(e) => handleChanged(e)}
        />
        <Input
          placeholder="Ground Area"
          name="ground_area"
          value={company.ground_area}
          onChange={(e) => handleChanged(e)}
        />
        <Input
          placeholder="Phone Number"
          name="phone_number"
          value={company.phone_number}
          onChange={(e) => handleChanged(e)}
        />
        <Input
          placeholder="Tax Number"
          name="tax_number"
          value={company.tax_number}
          onChange={(e) => handleChanged(e)}
        />
      </Modal>
      <Table
        columns={columns}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default CompanyList;
