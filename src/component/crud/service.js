import React, { useReducer, useState, useEffect } from "react";
import { Button, Table, Tag, Space, Modal, Input, notification } from "antd";
import reqwest from "reqwest";
import axios from "axios";

const ServiceList = () =>{
    const url = "http://128.199.190.229:9393/api/v1/services";
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
    {title: 'Mã dịch vụ', key: 'service_code', dataIndex: 'service_code'},
    {title: 'Tên dịch vụ', key: 'name', dataIndex: 'name'},
    {title: 'Loại', key: 'type', dataIndex: 'type'},
    {title: 'Đơn giá', key: 'unit_price', dataIndex: 'unit_price'},
    {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <a>Sửa</a>
            <a onClick={ (e) =>{
                deleteService(record.id)
            }}>Xóa</a>
          </Space>
        ),
      },
  ]

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [service, setService] = useReducer(
      (state, newState) => ({...state, ...newState}),
      {
        service_code: "",
        name: "",
        type: "",
        unit_price: 0
      }
  )

  const deleteService = (id) =>{
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

  const showModel = () => {
    setVisible(true);
  };

  const handleOk = () =>{
      setConfirmLoading(true)
      axios.post(url, {
          service_code: service.service_code,
          name: service.name,
          type: service.type,
          unit_price: service.unit_price
      }).then((response) => {
        fetch(pagination);
        notification["success"]({
          message: "Add Success",
          duration: 3,
        });
        setVisible(false);
        setConfirmLoading(false);
      });
  }

  const handleCancel = () => {
    setVisible(false);
  };

  const handleChanged = (evt) => {
    const { name, value } = evt.target;
    setService({ [name]: value });
  };

  return (
    <div>
      <Button type="primary" onClick={showModel}>
        Add New
      </Button>

      <Modal
        title="Add new Service"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
      >
        <Input
          placeholder="Service Name"
          name="name"
          value={service.name}
          onChange={(e) => handleChanged(e)}
        />
        <Input
          placeholder="Service Code"
          name="service_code"
          value={service.service_code}
          onChange={(e) => handleChanged(e)}
        />
        <Input
          placeholder="Type"
          name="type"
          value={service.type}
          onChange={(e) => handleChanged(e)}
        />
        <Input
          placeholder="Unit Price"
          name="unit_price"
          value={service.unit_price}
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
}

export default ServiceList