import React, {useState} from 'react';
import axios from "axios";
import {Button} from "antd";
import Employee from "../employee/Employee";

function OrganizationList({organizationList1, getOrganizationList, buttomShowModal, backLogin}) {

    const [employees, setEmployees] = useState([]);
    const [visible, setVisible] = useState(false);
    const [id, setId] = useState(-1);

    const getEmployeeList = (id) => {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("BearerToken")
            }
        }
        axios.get("http://localhost:8008/organizations/" + id + "/employees", config).then((response) => {
            setEmployees(response.data.result)
        })
    }

    function deleteOrg(id) {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("BearerToken")
            }
        }
        return axios.delete("http://localhost:8008/organizations/" + id, config).then(res => {
            getOrganizationList();
        });
    }

    function openEmployees(id) {
        getEmployeeList(id);
        setId(id);
        setVisible(true);
    }

    if (visible) {
        console.log(employees);
        return (<div>{<Employee orgId={id} firstEmployee={employees}
                                firstGetEmployeeList={() => getEmployeeList(id)}/>}</div>)
    }

    return (
        <div>
            <div className="container">
                <div className="py-4">
                    <table className="table border shadow">
                        <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Delete</th>
                            <th scope="col">Employees</th>
                            <th scope="col">{<Button type="primary" onClick={backLogin}>Log Out</Button>}</th>
                            <th scope="col">{<Button type="primary" onClick={buttomShowModal}>Add
                                Organization</Button>}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {organizationList1.map((o) => (
                            <tr>
                                <td>{o.id}</td>
                                <td>{o.name}</td>
                                <td>{<Button type="primary" danger onClick={() => deleteOrg(o.id)}>Delete</Button>}</td>
                                <td>{<Button type="primary" onClick={() => openEmployees(o.id)}>Employees</Button>}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
}

export default OrganizationList;