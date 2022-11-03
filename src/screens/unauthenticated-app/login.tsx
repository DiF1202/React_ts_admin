import React from "react";
import { useAuth } from "screens/context/auth-context";
import { Form, Input, Button } from "antd";
// const apiUrl = process.env.REACT_APP_API_URL;

const LoginScreen = () => {
  const { login } = useAuth();

  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name="username" rules={[{ required: true, message: "请输入用户名" }]}>
        <Input type="text" placeholder="用户名" id="username" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
        <Input type="text" placeholder="密码" id="password" />
      </Form.Item>
      <Form.Item></Form.Item>
      <Button htmlType={"submit"} type="primary">
        登录
      </Button>
    </Form>
  );
};

export default LoginScreen;
