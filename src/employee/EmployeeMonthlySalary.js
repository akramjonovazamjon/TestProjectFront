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

            <Modal title="Information about employee salary" open={visible} onOk={catchOk} onCancel={catchOnCancel}>

                {/*<pre>{JSON.stringify(object, null, 2)}</pre>*/}
                <h5>Employee name: <i>{object.fullName}</i></h5>
                <h5>Employee phone: <i>{object.phoneNumber}</i></h5>
                <h5>Employee position: <i>{object.position}</i></h5>
                <h5>Employee department: <i>{object.organization}</i></h5>
                <h5>Working month: <i>{object.month}</i></h5>
                <h5>Working hours: <i>{object.monthlyWorkingHour}</i></h5>
                <h5>Employee salary: <i>{object.salary} UZS</i></h5>

            </Modal>
        </>
    );
}

export default EmployeeMonthlySalary;
