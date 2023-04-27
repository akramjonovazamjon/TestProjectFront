import React, {useState} from 'react';
import {Modal} from "antd";
import axios from "axios";

function EmployeeMonthlySalary({visible1, onOk, onCancel, employeeId}) {


    const [visible, setVisible] = useState(false);
    const [date, setDate] = useState({});
    const [object, setObject] = useState({});
    const onOkItSelf = () => {
        let config = {
            params: {
                'year': date.year,
                'month': date.month
            }
        }
        axios.get("http://localhost:8008/employees/" + employeeId + "/items/salary", config).then((res) => {
            setObject(res.data.result)
            onOk();
            setVisible(true);
        }).catch((error) => {
            alert("Error")
        })

    }

    const handleInputChange = (e) => {
        setDate({
            ...date,
            [e.target.name]: e.target.value
        })
    }

    function catchOk() {
        setVisible(false)
    }

    function catchOnCancel() {
        setVisible(false);
    }

    return (
        <>
            <Modal title="Basic Modal" open={visible1} onOk={onOkItSelf} onCancel={onCancel}>

                <div className="form-group">
                    <label htmlFor="">Year</label>
                    <input type="number" className="form-control" onChange={handleInputChange}
                           name="year"/>
                </div>
                <div className="form-group">
                    <label htmlFor="">Month</label>
                    <input type="number" className="form-control" onChange={handleInputChange} name="month"/>
                </div>

            </Modal>

            <Modal title="Basic Modal" open={visible} onOk={catchOk} onCancel={catchOnCancel}>

                <pre>{JSON.stringify(object, null, 2)}</pre>

            </Modal>
        </>
    );
}

export default EmployeeMonthlySalary;
