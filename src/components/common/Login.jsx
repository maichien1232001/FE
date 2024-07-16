import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import GoogleLogin from "./GoogleLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");
    const expiry = query.get("expiry");
    const role = query.get("role");

    if (token && expiry && role) {
      localStorage.setItem("token", token);
      localStorage.setItem("expiry", expiry);
      localStorage.setItem("role", role);

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/tokens/login`,
        {
          email,
          password,
        }
      );
      const { token, role } = response.data;
      localStorage.setItem("token", token);
      console.log(response.data);

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Form onFinish={handleLogin}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
        <GoogleLogin />
      </Form.Item>
    </Form>
  );
};

export default Login;
