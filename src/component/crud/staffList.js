import React, { useState, useEffect, useReducer } from "react";
import { Button, Table, Tag, Space, Modal, Input, DatePicker, notification } from "antd";
import reqwest from "reqwest";
import axios from "axios";

const StaffList = () => {
  const url= 'http://localhost:8080/api/v1/staffs'

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
      title: "Mã nhân viên",
      key: "code",
      dataIndex: "code",
    },
    {
      title: "Tên nhân viên",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Địa chỉ",
      key: "address",
      dataIndex: "address",
    },
    {
      title: "Ngày sinh",
      key: "date_of_birth",
      dataIndex: "date_of_birth",
    },
    {
      title: "Số điện thoại",
      key: "phone_number",
      dataIndex: "phone_number",
    },
    {
      title: "Cấp độ",
      key: "level",
      dataIndex: "level",
    },
    {
      title: "Vị trí",
      key: "position",
      dataIndex: "position",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>Sửa</a>
          <a>Xóa</a>
        </Space>
      ),
    },
  ];

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [staff, setStaff] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      name: "",
      address: "",
      code: "",
      date_of_birth: "",
      phone_number: ""
    }
  );

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    console.log(staff)
    axios.post(url,
     {'name': staff.name, 'code': staff.code, 'address': staff.address, 'date_of_birth': staff.date_of_birth, 'phone_number': staff.phone_number})
    .then(response => {
      fetch(pagination)
      notification['success']({
        message : 'Add Success',
        duration: 3,
      })
      setVisible(false);
      setConfirmLoading(false); 
    })
  };

  const handleCancel = () => {
    setVisible(false);
    console.log("Cancel Dialog");
  };

  const handleChanged = (evt) => {
    const {name, value} = evt.target
    setStaff({[name]: value})
    console.log(staff)
    console.log(evt.target.name)
  };

  const handleDate = (date, dateString) =>{
    setStaff({['date_of_birth']: dateString})
  }

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add New
      </Button>

      <Modal
        title="Add new Employee"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}>
        <Input
          placeholder="Name"
          name="name"
          value={staff.name}
          onChange={e => handleChanged(e)}
        />
        <Input
          placeholder="Code"
          name="code"
          value={staff.code}
          onChange={e => handleChanged(e)}
        />
        <Input
          placeholder="Address"
          name="address"
          value={staff.address}
          onChange={e => handleChanged(e)}
        />
        <DatePicker
          placeholder="Date of Birth"
          name="date_of_birth"
          className="date_of_birth"
          onChange={(date, dateString) => handleDate(date, dateString)}
        />
        <Input
          placeholder="Phone number"
          name="phone_number"
          value={staff.phone_number}
          onChange={e => handleChanged(e)}
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
export default StaffList;
