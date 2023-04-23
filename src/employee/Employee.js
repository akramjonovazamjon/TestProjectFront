import React, {useState} from "react";
import {Button} from "antd";
import EmployeeAdd from "./EmployeeAdd";
import EmployeeList from "./EmployeeList";
import Organization from "../organization/Organization";
import axios from "axios";

function Employee({firstEmployee, firstGetEmployeeList, orgId}) {
    const [visible, setVisible] = useState(false);
    const [backStatus, setBackStaus] = useState(false);
    const [organizationList, setOrganizationList] = useState([]);

    const getOrganizationList = () => {
        axios.get("http://localhost:8008/organizations").then((response) => {
            setOrganizationList(response.data.result)
        })
    }

    const showModal = () => {
        setVisible(true);
    };
    const handleOk = () => {
        setVisible(false)
        firstGetEmployeeList();
    }

    const handleCancel = () => {
        setVisible(false)
    }

    function back() {
        getOrganizationList();
        setBackStaus(true);
    }

    if (backStatus) {
        return (<div>{<Organization firstOrgList={organizationList} firstGetOrgList={getOrganizationList}/>}</div>);
    }

    return (
        <div>
            <div>
                <Button type="primary" onClick={showModal}>Add Employee</Button>
                <Button type="primary" onClick={back}>Back To Organizations</Button>
                <EmployeeAdd organizationId={orgId} visible1={visible} onOk={handleOk} onCancel={handleCancel}/>
                <EmployeeList employeeList1={firstEmployee} getEmployeeList={firstGetEmployeeList}/>
            </div>
        </div>
    );
}

export default Employee;