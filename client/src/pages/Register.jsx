import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import axios from "axios"
import { toast } from 'react-toastify';

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
        password: "",
        cpassword: ""
    })
    const { name, email, age, password, cpassword } = formData;
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
    const onSubmit = async (e) => {
        e.preventDefault();
        if(password === cpassword){
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user`, formData)
            if(response.data.success){
                toast.success(response.data.message);
                setFormData({
                    name: "",
                    email: "",
                    age: "",
                    password: "",
                    cpassword: ""
                })
            }
            else{
                toast.error(response.data.mesage)
            }
        }else{
            toast.error("Passwords do not match")
            return 0;
        }
      
    }
    return (
        <div className='d-flex justify-content-center align-items-center flex-column'>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name='name' value={name} onChange={onChange} />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name='email' value={email} onChange={onChange} />
                </Form.Group> <Form.Group className="mb-3">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="number" placeholder="Enter age" name='age' value={age} onChange={onChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your password" name='password' value={password} onChange={onChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm your password" name='cpassword' value={cpassword} onChange={onChange} />
                </Form.Group>
                <button className='btn btn-primary'>Register</button>
            </Form>
        </div>
    );
}

export default Register;
