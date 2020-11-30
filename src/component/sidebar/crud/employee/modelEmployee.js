import React, { useEffect } from 'react';
import {Modal} from 'antd';

const EmployeeForm = () => {
    const [visible, setVisible] = useEffect(true) 
    const [confirmLoading, setConfirmLoading] = useEffect(false)  

    const handleOk = () =>{
        setConfirmLoading(true)
        setTimeout(() => {
            setVisible(false)
            setConfirmLoading(false)
        }, 10)
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
