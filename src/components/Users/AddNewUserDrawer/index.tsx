import { Drawer, Form, Button, Col, Row, Input, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { createNewUser } from '../../../api';


interface Props {
    visible: boolean
    onClose: (shouldRefresh: boolean) => void;
}

const AddNewUserDrawer = (props: Props) => {
    const { visible, onClose } = props;
    const [form] = Form.useForm();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { value } } = e;

        setFirstName(value)
    }

    const handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { value } } = e;

        setLastName(value)
    }

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { value } } = e;

        setEmail(value)
    }

    const handleSave = () => {
        form
            .validateFields()
            .then(values => {
                form.resetFields();
                createNewUser(values).then(response => {
                    const { data, status } = response;
                    onClose(true)
                }).catch(err => {

                });
            })
            .catch(info => {
                console.log('Validate Failed:', info);

            });
    }

    const canSave = () => {
        return !form.isFieldsTouched(true) ||
            form.getFieldsError().filter(({ errors }) => errors.length)
                .length > 0
    }

    return (
        <Drawer
            title="Add New User"
            placement={"top"}
            closable={false}
            onClose={() => onClose(false)}
            visible={visible}
            key={"top"}
            // height={"90vh"}
            bodyStyle={{ paddingBottom: 80 }}
            extra={
                <Space>
                    <Button onClick={() => onClose(false)}>Cancel</Button>
                    <Button onClick={handleSave} type="primary" disabled={canSave()}>
                        Submit
                    </Button>
                </Space>
            }
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSave}
            // onFinishFailed={onFinishFailed}
            >
                <Row gutter={16}>
                    <Col span={12} xs={24} lg={12}>
                        <Form.Item
                            name="firstName"
                            label="First Name"
                            rules={[{ required: true, message: 'Please enter first name' }]}
                        >
                            <Input placeholder="Please enter first name"
                                name="firstName"
                                value={firstName}
                                onChange={handleChangeFirstName}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} lg={12}>
                        <Form.Item
                            name="lastName"
                            label="Last Name"
                            rules={[{ required: true, message: 'Please enter last name' }]}
                        >
                            <Input placeholder="Please enter last name"
                                name="lastName"
                                value={lastName}
                                onChange={handleChangeLastName}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} lg={12}>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ required: true, message: 'Please enter email', type: 'email' }]}
                        >
                            <Input
                                placeholder="Please enter Email (user.name@example.com)"
                                name="email"
                                value={email}
                                onChange={handleChangeEmail}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer >
    )
}

export default AddNewUserDrawer
