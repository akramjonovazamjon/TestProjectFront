import React, {useState} from "react";
import OrganizationAdd from "./OrganizationAdd";
import OrganizationList from "./OrganizationList";
import Login from "../Login";

function Organization({firstOrgList, firstGetOrgList}) {
    const [visible, setVisible] = useState(false);
    const [backS, setBackS] = useState(false);


    const showModal = () => {
        setVisible(true);
    };
    const handleOk = () => {
        setVisible(false)
        firstGetOrgList();
    }

    const handleCancel = () => {
        setVisible(false)
    }

    function back() {
        setBackS(true)
    }

    if (backS) {
        return <Login/>
    }

    return (
        <div>
            <div>
                <OrganizationAdd visible1={visible} onOk={handleOk} onCancel={handleCancel}/>
                <OrganizationList backLogin={back} buttomShowModal={showModal} organizationList1={firstOrgList}
                                  getOrganizationList={firstGetOrgList}/>
            </div>
        </div>
    );
}

export default Organization;