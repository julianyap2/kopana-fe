import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./Login.styled.css";
import axios from "axios";
import { useToasts } from 'react-toast-notifications'
import { useAuth } from "../../contexts/auth.context";
import { isStatus200ish } from "api";


const Login = () => {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { addToast } = useToasts();

  async function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  async function handleSubmit(event) {
    event.preventDefault()
    await auth.Login(email, password)
      .then(res => {
        if (isStatus200ish(res.status)) {
          addToast("berhasil!", {
            appearance: 'success',
            autoDismiss: true,
          })
          window.open('/beranda-login', '_self')
        }
      })
      .catch(err => {
        console.error(err);
        addToast('Gagal Login', {
          appearance: 'error',
          autoDismiss: true
        })
      })
  }
  return (
    <div className="login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label style={{ marginRight: '10px' }}>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label style={{ marginRight: '10px' }}>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button style={{ marginTop: '10px' }} block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
        <Link to='/daftar'>
          <Button style={{ marginTop: '10px', marginLeft: '10px' }} block size="lg" type="submit" disabled={!validateForm()}>
            Daftar
          </Button>
        </Link>
      </Form>
    </div>
  );
};

export default Login;
