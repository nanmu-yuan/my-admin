import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import { useHistory } from 'react-router';
import { createCaptcha } from './utils'
import './style.less'

const Login: React.FC = () => {
    const [form]= Form.useForm();
    const history = useHistory();
    const canvasRef = useRef(null);
    const [captcha,setCaptcha] = useState('');
    const getCaptcha = () => {
        setCaptcha(createCaptcha(canvasRef.current))
    }
    const handleFinish = async () => {
        history.replace('/dashboard')
     try{
        const values = await form.validateFields();
        console.log(values)
        history.replace('/dashboard')
     }catch(error){
        console.log('failed',error)
     }
    }
    useEffect(() => {
        getCaptcha()
    }, [])
    return (
        <div className="page-login">
            <div className="page-login__title">澳鹏客服系统</div>
            <Form form={form} onFinish={handleFinish}>
                <Form.Item
                    label={<div className='form-item_label'>账户</div>}
                    validateTrigger="onBlur"
                    name="account"
                    initialValue="admin"
                    rules={[{ required: true, message: '账户不能为空' }]}
                >
                    <Input placeholder='请输入账户'></Input>
                </Form.Item>
                <Form.Item
                    label={<div className='form-item_label'>密码</div>}
                    validateTrigger="onBlur"
                    name="password"
                    initialValue="1231312"
                    rules={[
                        {
                            required:true,
                            message:'密码不能为空'
                        },
                        {
                            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
                            message:'密码位6~20位，且需要包含数字和字母'
                        }
                    ]}
                    >
                    <Input.Password  placeholder='请输入密码'></Input.Password>
                </Form.Item>
                <Form.Item 
                label={<div className='form-item_label'>验证码</div>}
                name="captcha"
                validateTrigger="onBlur"
                rules={[
                    {
                        required:true,
                        message:'验证码不能为空'
                    },
                    {
                        pattern:new RegExp(captcha,'i'),
                        message:'验证码错误'
                    }
                ]}
                >
                    <Row>
                        <Col span={16}>
                            <Input  placeholder='请输入验证码' />
                        </Col>
                        <Col span={8} style={{height:'40px'}}>
                            <canvas
                                onClick={getCaptcha}
                                width="80"
                                height="40"
                                style={{ cursor: 'pointer' }}
                                ref={canvasRef}
                            ></canvas>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType='submit' block={true}>登录</Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default Login