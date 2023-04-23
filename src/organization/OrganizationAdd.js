import React, {useState} from 'react';
import axios from "axios";
import {Modal} from "antd";

function OrganizationAdd({visible1, onOk, onCancel}) {

    const [organization, setOrganization] = useState({});
    const onOkItSelf = () => {
        axios.post("http://localhost:8008/organizations", organization).then((res) => {
            onOk();
        }).catch((error) => {
            alert("This organization already exist!")
        })

    }

    const handleInputChange = (e) => {
        setOrganization({
            ...organization,
            [e.target.name]: e.target.value
        })
    }


    return (
        <>
            <Modal title="Basic Modal" open={visible1} onOk={onOkItSelf} onCancel={onCancel}>
                <div className="form-group">
                    <label htmlFor="">Name</label>
                    <input type="text" className="form-control" onChange={handleInputChange} name="name"/>
                </div>
            </Modal>
        </>
    );
}

export default OrganizationAdd;