import React, {useState} from "react";
import {Button} from "antd";
import EmployeeAdd from "./EmployeeAdd";
import EmployeeList from "./EmployeeList";
import axios from "axios";
import EmployeeMonthlyWorkingStatistics2 from "./EmployeeMonthlyWorkingStatistics2";
import Login from "../Login";

function Employee({firstEmployee, firstGetEmployeeList}) {
    const [visible, setVisible] = useState(false);
    const [positionList, setPositionList] = useState([]);
    const [isEmployee, setIsEmployee] = useState(false);
    const [logOutStatus, setLogOutStatus] = useState(false);

    const getPositions = () => {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("BearerToken")
            }
        }
        axios.get("http://localhost:8008/positions", config).then((response) => {
            setPositionList(response.data.result)
        })
    }

    const showModal = () => {
        getPositions()
        setVisible(true);
    };
    const handleOk = () => {
        setVisible(false)
        firstGetEmployeeList();
    }

    const handleCancel = () => {
        setVisible(false)
    }


    function setIsEmployeeTrue() {
        setIsEmployee(true)
    }

    function logOut() {
        setLogOutStatus(true)
    }

    if (logOutStatus) {
        return <Login/>
    }

    return (
        <div>
            {
                isEmployee ? (<EmployeeMonthlyWorkingStatistics2/>) : (<div>
                    <Button type="primary" onClick={showModal}>Add Employee</Button>
                    <Button type="primary" onClick={logOut}>Log Out</Button>

                    <EmployeeAdd positionList={positionList} visible1={visible} onOk={handleOk}
                                 onCancel={handleCancel}/>
                    <EmployeeList setIsEmployee={setIsEmployeeTrue} positionList={positionList}
                                  employeeList1={firstEmployee}
                                  getEmployeeList={firstGetEmployeeList}/>
                </div>)
            }

        </div>
    );
}

export default Employee;