import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import axios from "axios"
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",

    })
    const navigate = useNavigate();
    const { email, password } = formData;
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`, formData)
        if (response.data.success) {
            toast.success(response.data.message);
            setFormData({
                email: "",
                password: "",
            })
            localStorage.setItem("token", response.data.token)
            setTimeout(()=>{
                navigate("/dashboard")
            },2000)
        }
        else {
            toast.error(response.data.mesage)
        }
    }
return (
    <div className='d-flex justify-content-center align-items-center flex-column'>
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" >
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name='email' value={email} onChange={onChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter your password" name='password' value={password} onChange={onChange} />
            </Form.Group>
            <Link to="/forgot">Forgot Password</Link>
            <button className='btn btn-primary'>Login</button>
        </Form>
    </div>
);
}

export default Login;
