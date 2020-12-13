import React, { useState, useEffect, useReducer } from "react";
import { Button, Table, Space, Modal, Input, DatePicker, notification } from "antd";
import reqwest from "reqwest";
import axios from "axios";

const StaffList = () => {
  const url= 'http://128.199.190.229:9393//api/v1/staffs'

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
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={(e) => {
              updateStaff(record);
            }}>Sửa</a>
          <a onClick={ (e) =>{
            deleteStaff(record.id)
          }}>Xóa</a>
        </Space>
      ),
    },
  ];

  const updateStaff = (staff) =>{
    setStaff(staff)
    showModal()
  }

  const deleteStaff = (id) =>{
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

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [staff, setStaff] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      id: 0,
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

  const handlePost = () => {
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

  const handlePut = () => {
    axios.put(url,
      {
        'id': staff.id,
        'name': staff.name, 
        'code': staff.code, 
        'address': staff.address, 
        'date_of_birth': staff.date_of_birth, 
        'phone_number': staff.phone_number
    })
     .then(response => {
       fetch(pagination)
       notification['success']({
         message : 'Update Success',
         duration: 3,
       })
       setVisible(false);
       setConfirmLoading(false); 
     })
  }

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
        ]}>
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
