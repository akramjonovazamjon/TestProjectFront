import React, {useState} from 'react';
import axios from "axios";
import {Modal} from "antd";

function EmployeeAddDate({visible1, onOk, onCancel, employeeId}) {

    const [employeeDate, setEmployeeDate] = useState({});
    const onOkItSelf = () => {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("BearerToken")
            }
        }
        axios.post("http://localhost:8008/employees/" + employeeId + "/items", employeeDate, config).then((res) => {
            onOk();
            alert("Success")
        }).catch((error) => {
            alert("Error!")
        })

    }

    const handleInputChange = (e) => {
        setEmployeeDate({
            ...employeeDate,
            [e.target.name]: e.target.value
        })
    }


    return (
        <>
            <Modal title="Basic Modal" open={visible1} onOk={onOkItSelf} onCancel={onCancel}>
                <div className="form-group">
                    <label htmlFor="">Arrival Date</label>
                    <input type="datetime-local" className="form-control" onChange={handleInputChange}
                           name="arrivalDate"/>
                </div>
                <div className="form-group">
                    <label htmlFor="">Exit Date</label>
                    <input type="datetime-local" className="form-control" onChange={handleInputChange} name="exitDate"/>
                </div>
            </Modal>
        </>
    );
}

export default EmployeeAddDate;