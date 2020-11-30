import React, { useState, useEffect } from 'react'
import { Button, Table, Tag, Space } from 'antd'
import reqwest from 'reqwest';
import Modal from './sidebar/crud/employee/modelEmployee';
import EmployeeForm from './sidebar/crud/employee/modelEmployee';

const TableForm = () => {

    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
      current: 1,
      pageSize:10
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      fetch({pagination})
    }, []);

    const getRamdomUserParams = params => {
      return{
        results: params.pagination.pageSize,
        page: params.pagination.current,
        ...params,
      }
    }

    const handleTableChange = (pagination, filters, sorter) => {
      fetch({
        sortField: sorter.field,
        sortOrder: sorter.order,
        pagination,
        ...filters
      })
    }

    const fetch = (params = {}) => {
      setLoading(true)
      reqwest({
        url: 'http://192.168.43.6:8080/api/v1/employees',
        method: 'get',
        type: 'json',
        data: getRamdomUserParams(params),
      }).then(data => {
        console.log(data)
        setLoading(false)
        setData(data)
        setPagination({
          ...params.pagination,
          total: data.totalCount,
        })
      })
    }

    const columns = [
      {
        title: 'Mã nhân viên',
        key: 'address',
        dataIndex: 'address'
      },
      {
        title: 'Tên nhân viên',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
      },
      // {
      //   title: 'Mã số thuế',
      //   dataIndex: 'taxId',
      //   key: 'taxId',
      // },
      // {
      //   title: 'Vốn điều lệ',
      //   dataIndex: 'charterCapital',
      //   key: 'charterCapital',
      // },
      // {
      //   title: 'Lĩnh vực hoạt động',
      //   key: 'workArea',
      //   dataIndex: 'workArea',
      // },
      // {
      //   title: 'Số nhân viên',
      //   key: 'staffNo',
      //   dataIndex: 'staffNo'
      // },
      {
        title: 'Địa chỉ',
        key: 'address',
        dataIndex: 'address'
      },
      {
        title: 'Ngày sinh',
        key: 'date_of_birth',
        dataIndex: 'date_of_birth'
      },
      {
        title: 'Số điện thoại',
        key: 'phone_number',
        dataIndex: 'phone_number'
      },
      // {
      //   title: 'Diện tích mặt bằng',
      //   key: 'grossFloor',
      //   dataIndex: 'grossFloor'
      // },
      {
        title: 'Cấp độ',
        key: 'level',
        dataIndex: 'level'
      },
      {
        title: 'Vị trí',
        key: 'position',
        dataIndex: 'position'
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <a>Sửa</a>
            <a>Xóa</a>
          </Space>
        ),
      },
    ];
  
    const showModel = () =>{
        return(
          <EmployeeForm />
        )
    }

    return(
      <div>
        <Button type='primary' onClick = {showModel}>Add New</Button>
        <Table 
        columns={columns} 
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange} />
      </div>
    );
}
export default TableForm