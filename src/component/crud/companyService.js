import React, { useEffect, useState } from "react";
import { Table, Input, Button, Select, Modal, notification, Space } from "antd";
import reqwest from "reqwest";
import axios from "axios";

const { Search } = Input;
const {Option} = Select;

const CompanyServiceList = () => {
  const [data, setData] = useState([]);
  const url = "http://128.199.190.229:9393/api/v1/company/services/";

  const columns = [
    { title: "Mã dịch vụ", key: "service_code", dataIndex: "service_code" },
    { title: "Tên dịch vụ", key: "name", dataIndex: "name" },
    { title: "Loại", key: "type", dataIndex: "type" },
    { title: "Đơn giá", key: "unit_price", dataIndex: "unit_price" },
    { title: "Số Tháng", key: "month", dataIndex: "month" },
    {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <a
              onClick={(e) => {
                updateCompanyService(record);
              }}
            >
              Sửa
            </a>
            <a
              onClick={(e) => {
                deleteCompanyService(record.id);
              }}
            >
              Xóa
            </a>
          </Space>
        ),
      },
  ];

  const updateCompanyService = (companyService) => {
    setService({
        name: companyService.name,
    })
    setMonth(companyService.month)
    setid(companyService.id)
    console.log(service)
    showModel();
  };

  const deleteCompanyService = (id) => {
    axios.delete(url + "/" + id).then((response) => {
      console.log(response);
      fetch(company.id);
      notification["success"]({
        message: "Deleted",
        duration: 3,
      });
    });
  };

  const [month, setMonth] = useState(0)
  const [id, setid] = useState(0)

  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState({
    id: 0,
    address_in_building: "",
    authorized_capital: 0,
    company_id: 0,
    company_name: "",
    field_of_operation: "",
    ground_area: 0,
    phone_number: "",
    tax_number: "",
  });
  const [service, setService] = useState({
    id: 0,
    service_code: "",
    name: "",
    type: "",
    unit_price: 0
  });
  const [serviceList, setServiceList] = useState([])

  const onSearch = (id) => {
    setCompany({
        id: 0,
        address_in_building: "",
        authorized_capital: 0,
        company_id: 0,
        company_name: "",
        field_of_operation: "",
        ground_area: 0,
        phone_number: "",
        tax_number: "",
        })
    fetch(id);
  };

  useEffect(() =>{
    reqwest({
        url: "http://128.199.190.229:9393/api/v1/services",
        method: "get",
        type: "json",
      }).then((data) => {
        setServiceList(data)
      });
  }, [])

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
      url: url + id,
      method: "get",
      type: "json",
      error: function (err) {
        if (err.status === 404) {
          setLoading(false);
          setData([]);
        }
      },
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

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModel = () => {
    setVisible(true);
  };

  const handlePost = () => {
      setLoading(true)
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
        service,
        'month': month
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
      setLoading(true)
    axios.put(url, {
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
        service,
        'month': month,
        'id': id
    }).then((response) => {
      fetch(company.id);
      notification["success"]({
        message: "Update Success",
        duration: 3,
      });
      setVisible(false);
      setConfirmLoading(false);
    });
  }

  const handleChanged = (value) =>{
      setLoading(true)
    reqwest({
        url: "http://128.199.190.229:9393/api/v1/services/" + value,
        method: "get",
        type: "json",
      }).then((data) => {
        setService(data)
        setLoading(false)
      });
  }

  const handleChangedMonth = (evt) =>{
      setMonth(evt.target.value)
  }

  const options = serviceList.map(d => <Option key={d.id}>{d.name}</Option>);

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
        pagination={false}
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
        <Select onChange={handleChanged} size="large" value={service.name}>
            {options}
        </Select>
        <Input
          placeholder="Service Code"
          name="service_code"
          value={service.service_code}
          disabled={true}
          loading={loading}
        />
        <Input
          placeholder="Type"
          name="type"
          value={service.type}
          disabled={true}
          loading={loading}
        />
        <Input
          placeholder="Unit Price"
          name="unit_price"
          value={service.unit_price}
          disabled={true}
          loading={loading}
        />
        <Input 
            placeholder="Month"    
            name="month"
            value={month}
            onChange={(e) => handleChangedMonth(e)}
        />
      </Modal>
    </div>
  );
};

export default CompanyServiceList;
