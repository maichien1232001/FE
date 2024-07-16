import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          name,
          email,
          password,
        }
      );
      const { token } = response.data;
      localStorage.setItem("token", token);

      notification.success({
        message: "Login successful",
        description: "User registered successfully",
      });
      window.location.href = "/user";
      // Xử lý sau khi đăng ký thành công (ví dụ: điều hướng đến trang login)
    } catch (error) {
      notification.error({
        message: "Login error",
        description: "User registered error",
      });
      console.error("Registration failed:", error.response.data);
    }
  };

  return (
    <Form onFinish={handleRegister}>
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <Button type="primary" htmlType="submit">
        Register
      </Button>
    </Form>
  );
};

export default Register;
