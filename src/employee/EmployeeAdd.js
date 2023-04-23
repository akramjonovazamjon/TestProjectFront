import React, {useState} from 'react';
import axios from "axios";
import {Modal} from "antd";

function EmployeeAdd({visible1, onOk, onCancel, organizationId}) {

    const [employee, setEmployee] = useState({});
    const onOkItSelf = () => {
        axios.post("http://localhost:8008/organizations/" + organizationId + "/employees", employee).then((res) => {
            onOk();
        }).catch((error) => {
            alert("This Employee already exist!")
        })

    }

    const handleInputChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        })
    }


    return (
        <>
            <Modal title="Basic Modal" open={visible1} onOk={onOkItSelf} onCancel={onCancel}>
                <div className="form-group">
                    <label htmlFor="">Name</label>
                    <input type="text" className="form-control" onChange={handleInputChange} name="fullName"/>
                </div>
                <div className="form-group">
                    <label htmlFor="">Phone Number</label>
                    <input type="text" className="form-control" onChange={handleInputChange} name="phoneNumber"/>
                </div>
                <div className="form-group">
                    <label htmlFor="">Salary</label>
                    <input type="number" className="form-control" onChange={handleInputChange} name="salary"/>
                </div>
            </Modal>
        </>
    );
}

export default EmployeeAdd;