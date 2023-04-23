import React, {useState} from 'react';
import axios from "axios";
import {Button} from "antd";
import EmployeeAddDate from "./EmployeeAddDate";
import EmployeeMonthlyStatistics from "./EmployeeMonthlyStatistics";
import EmployeeMonthlySalary from "./EmployeeMonthlySalary";

function EmployeeList({employeeList1, getEmployeeList}) {

    const [visible, setVisible] = useState(false);
    const [statisticsVisible, setStatisticsVisible] = useState(false);
    const [salaryVisible, setSalaryVisible] = useState(false);
    const [employeeId, setEmployeeId] = useState(-1);


    function deleteEmp(id) {
        return axios.delete("http://localhost:8008/organizations/" + id + "/employees/" + id).then(res => {
            getEmployeeList();
        });
    }

    const handleOk = () => {
        setVisible(false);
        setStatisticsVisible(false)
        setSalaryVisible(false)
    }

    const handleCancel = () => {
        setVisible(false)
        setStatisticsVisible(false)
        setSalaryVisible(false)
    }

    function addDate(id) {
        setEmployeeId(id);
        setVisible(true);
    }

    function addStatistics(id) {
        setEmployeeId(id);
        setStatisticsVisible(true);
    }

    function getMonthlySalary(id) {
        setEmployeeId(id);
        setSalaryVisible(true)
    }

    return (
        <div>
            <div className="container">
                <div className="py-4">
                    <table className="table border shadow">
                        <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Full Name</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Salary</th>
                            <th scope="col">Organization</th>
                            <th scope="col">Delete</th>
                            <th scope="col">Add Working Date</th>
                            <th scope="col">Monthly Statistics</th>
                            <th scope="col">Monthly Salary</th>
                        </tr>
                        </thead>
                        <tbody>
                        {employeeList1.map((o) => (
                            <tr>
                                <td>{o.id}</td>
                                <td>{o.fullName}</td>
                                <td>{o.phoneNumber}</td>
                                <td>{o.salary}</td>
                                <td>{o.organization}</td>
                                <td>{<Button type="primary" danger onClick={() => deleteEmp(o.id)}>Delete</Button>}</td>
                                <td>{<Button type="primary" onClick={() => addDate(o.id)}>Add Date</Button>}</td>
                                <td>{<Button type="primary" onClick={() => addStatistics(o.id)}>Monthly
                                    Statistics</Button>}</td>
                                <td>{<Button type="primary" onClick={() => getMonthlySalary(o.id)}>Monthly
                                    Salary</Button>}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>{<EmployeeAddDate visible1={visible} onOk={handleOk} onCancel={handleCancel}
                                   employeeId={employeeId}/>}</div>
            <div>{<EmployeeMonthlyStatistics visible1={statisticsVisible} onOk={handleOk} onCancel={handleCancel}
                                             employeeId={employeeId}/>}</div>
            <div>{<EmployeeMonthlySalary visible1={salaryVisible} onOk={handleOk} onCancel={handleCancel}
                                         employeeId={employeeId}/>}</div>
        </div>
    );
}

export default EmployeeList;