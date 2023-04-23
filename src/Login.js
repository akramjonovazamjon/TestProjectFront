import {Button, Form, Input} from 'antd';
import axios from "axios";
import React, {useState} from "react";
import Register from "./Register";
import Organization from "./organization/Organization";

const Login = () => {

    const [visible, setVisible] = useState(false);
    const [isLoading1, setLoading1] = useState(false);
    const [organizationList, setOrganizationList] = useState([]);


    const onFinish = (values) => {
        console.log('Success:', values);
        axios.post("http://localhost:8008/auth/sign-in", values).then((res) => {
            getOrganizationList();
            setLoading1(true);
        }).catch(res => {
            alert("Username or Password wrong. Try again!")
        })
    };


    const getOrganizationList = () => {
        axios.get("http://localhost:8008/organizations").then((response) => {
            setOrganizationList(response.data.result)
        }).catch(res => {
        })
    }

    if (isLoading1) {
        return (<div>{<Organization firstOrgList={organizationList} firstGetOrgList={getOrganizationList}/>}</div>);
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    function visibility() {
        setVisible(!visible);
    }

    return (
        <div>

            {visible === true ? (<Register setVisible={visibility}/>) : (<div>
                <div><h4>Log In Center</h4></div>
                <br/>
                <div>
                    <Form
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
                            <Button type="primary" onClick={visibility}>
                                Register
                            </Button>
                        </Form.Item>
                    </Form></div>
            </div>)}

        </div>
    );

};
export default Login;