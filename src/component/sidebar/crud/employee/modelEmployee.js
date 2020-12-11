import React, { useState } from 'react';
import {Modal} from 'antd';

const EmployeeForm = () => {
    const [visible, setVisible] = useState(false) 
    const [confirmLoading, setConfirmLoading] = useState(false)  

    const handleOk = () =>{
        setVisible(false)
        setConfirmLoading(false)
    }

    const handleCancel = () =>{
        setVisible(false)
        console.log("Cancel Dialog")
    }

    return(
        <Modal 
            title='Add new Employee'
            visible ={ visible }
            onOk ={ handleOk }
            onCancel ={ handleCancel }
            confirmLoading ={ confirmLoading }>
            <p>Name</p> <input type='text'></input>
        </Modal>
    )
}

export default EmployeeForm
