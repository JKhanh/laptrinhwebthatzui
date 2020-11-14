import React from 'react'


const column = [
    {
        title: 'Số Phòng',
        dataIndex: 'roomNumber',
        key: 'roomNumber',
        render: text => <a>{text}</a>
    },
    {
        title: 'Tầng',
        dataIndex: 'floor',
        key: 'floor'
    },
    {
        title: ''
    }
]