import React, {useState} from 'react';
import axios from "axios";
import {Button} from "antd";
import EmployeeUpdateDate from "./EmployeeUpdateDate";
import Employee from "./Employee";

function EmployeeMonthlyWorkingStatistics2() {

    const [object, setObject] = useState([]);
    const [visible, setVisible] = useState(false);
    const [back1, setBack1] = useState(false);
    const [itemId, setItemId] = useState(-1);
    const [employeeList, setEmployeeList] = useState([]);

    function getEmployeeList() {
        console.log(sessionStorage.getItem("BearerToken"))
        let config = {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("BearerToken"),
            }
        }
        axios.get("http://localhost:8008/employees", config).then((response) => {
            setEmployeeList(response.data.result)
        }).catch(res => {

        })
    }

    const handleOk = () => {
        getStatistics()
        setVisible(false);
    }
    const handleCancel = () => {
        setVisible(false);
    }


    const getStatistics = () => {
        let year = sessionStorage.getItem("year");
        let month = sessionStorage.getItem("month");
        let employeeId = sessionStorage.getItem("employeeId");
        let config = {
            params: {
                'year': year,
                "month": month
            }
        }

        console.log(year + month + employeeId)

        axios.get("http://localhost:8008/employees/" + employeeId + "/items", config).then((res) => {
            setObject(res.data.result)
        }).catch((error) => {
            alert("Error")
        })
    }

    useState(getStatistics);


    function update(id) {
        setItemId(id)
        setVisible(true)
    }

    function deleteItem(id) {
        return axios.delete("http://localhost:8008/employees/" + id + "/items/" + id).then(res => {
            getStatistics()
        })
    }

    const back = () => {
        getEmployeeList();
        setBack1(true)
    }
    if (back1) {
        return <Employee firstEmployee={employeeList} firstGetEmployeeList={getEmployeeList}/>
    }

    return (
        <div>
            <Button type="primary" onClick={back}>Back</Button>
            <div className="container">
                <div className="py-4">
                    <table className="table border shadow">
                        <thead>
                        <tr>
                            <th scope="col">Employee</th>
                            <th scope="col">Arrival Date</th>
                            <th scope="col">Exit Date</th>
                            <th scope="col">Working Hours</th>
                            <th scope="col">Delete</th>
                            <th scope="col">Update</th>
                        </tr>
                        </thead>
                        <tbody>
                        {object.map((o) => (
                            <tr>
                                <td>{o.employee.fullName}</td>
                                <td>{o.arrivalDate}</td>
                                <td>{o.exitDate}</td>
                                <td>{o.workingHour}</td>
                                <td>{<Button type="primary" danger
                                             onClick={() => deleteItem(o.id)}>Delete</Button>}</td>
                                <td>{<Button type="primary" onClick={() => update(o.id)}>Update</Button>}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <EmployeeUpdateDate itemId={itemId} visible1={visible} onOk={handleOk} onCancel={handleCancel}/>
        </div>
    );
}

export default EmployeeMonthlyWorkingStatistics2;