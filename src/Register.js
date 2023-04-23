import {Button, Form, Input} from 'antd';
import axios from "axios";
import Organization from "./organization/Organization";
import {useState} from "react";


const Register = ({setVisible}) => {


    const [isLoading, setLoading] = useState(false);
    const [organizationList, setOrganizationList] = useState([]);
    const onFinish = (values) => {
        console.log('Success:', values);
        axios.post("http://localhost:8008/auth/sign-up", values).then((res) => {
            if (res.status === 200) {
                getOrganizationList();
                setLoading(true);
            }
        }).catch(res => {
            alert("Username is not valid!")
        })

    };

    const getOrganizationList = () => {
        axios.get("http://localhost:8008/organizations").then((response) => {
            setOrganizationList(response.data.result)
        })
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    if (isLoading) {
        return (<div>{<Organization firstOrgList={organizationList} firstGetOrgList={getOrganizationList}/>}</div>);
    }

    return (
        <div>
            <div><h4>Registration Center</h4></div>
            <br/>
            <div><Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="FullName"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >

                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button type="primary" onClick={setVisible}>
                        Log In
                    </Button>
                </Form.Item>
            </Form></div>
        </div>
    );

};
export default Register;