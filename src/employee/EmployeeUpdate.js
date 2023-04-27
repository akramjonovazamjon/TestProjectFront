import React, {useState} from 'react';
import axios from "axios";
import {Modal} from "antd";

function EmployeeUpdate({visible1, onOk, onCancel, positionList, employeeId}) {

    const [employee, setEmployee] = useState({});
    const onOkItSelf = () => {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("BearerToken")
            }
        }
        axios.put("http://localhost:8008/employees/" + employeeId, employee, config).then((res) => {
            onOk();
        }).catch((error) => {
            alert("Some error")
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
                    <input required={true} type="text" className="form-control" onChange={handleInputChange}
                           name="fullName"/>
                </div>
                <div className="form-group">
                    <label htmlFor="">Phone Number</label>
                    <input required={true} type="text" className="form-control" onChange={handleInputChange}
                           name="phoneNumber"/>
                </div>
                <div className="form-group ">
                    <label htmlFor="">Positions</label>
                    <select name="positionId" className="form-control" onChange={handleInputChange}>
                        {positionList.map(item => (
                            <option name={"positionId"} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>
            </Modal>
        </>
    );
}

export default EmployeeUpdate;