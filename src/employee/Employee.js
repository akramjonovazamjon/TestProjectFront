import React, {useState} from "react";
import {Button} from "antd";
import EmployeeAdd from "./EmployeeAdd";
import EmployeeList from "./EmployeeList";
import axios from "axios";

function Employee({firstEmployee, firstGetEmployeeList}) {
    const [visible, setVisible] = useState(false);
    const [positionList, setPositionList] = useState([]);

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



    return (
        <div>
            <div>
                <Button type="primary" onClick={showModal}>Add Employee</Button>

                <EmployeeAdd positionList={positionList} visible1={visible} onOk={handleOk}
                             onCancel={handleCancel}/>
                <EmployeeList positionList={positionList} employeeList1={firstEmployee} getEmployeeList={firstGetEmployeeList}/>
            </div>
        </div>
    );
}

export default Employee;