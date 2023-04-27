import React, {useState} from 'react';
import {Modal} from "antd";

function EmployeeMonthlyStatistics({visible1, onOk, onCancel, employeeId, setIsEmployee}) {


    const [date, setDate] = useState({});
    const onOkItSelf = () => {
        sessionStorage.setItem("year", date.year)
        sessionStorage.setItem("month", date.month)
        sessionStorage.setItem("employeeId", employeeId)
        sessionStorage.setItem("isOK", "true")
        setIsEmployee();
    }

    const handleInputChange = (e) => {
        setDate({
            ...date,
            [e.target.name]: e.target.value
        })
    }

    // function catchOk() {
    //     setVisible(false)
    // }
    //
    // function catchOnCancel() {
    //     setVisible(false);
    // }

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

            {/*<Modal title="Basic Modal" open={visible} onOk={catchOk} onCancel={catchOnCancel}>*/}

            {/*    <pre>{JSON.stringify(object, null, 2)}</pre>*/}

            {/*</Modal>*/}
        </>
    );
}

export default EmployeeMonthlyStatistics;
