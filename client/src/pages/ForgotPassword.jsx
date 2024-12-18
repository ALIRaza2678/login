import axios from 'axios';
import React,{useState} from 'react';
import Form from 'react-bootstrap/Form';

const ForgotPassword = () => {
    const [email,setEmail]=useState("")
    const [userVerified,setUserVerified]=useState(false)
    const [otp,setOTP]=useState(0)
    const [otpVerified,setOtpVerified]=useState(false)

    const onSubmit=async(e)=>{
        e.preventDefault();
        if(userVerified){
            let url=`${process.env.REACT_APP_BASE_URL}/user/verify`
            const response=await axios.post(url,{email:email,otp:otp})
            if(response.data.success){
                setOtpVerified(true)
            }    
        }else{
            let url=`${process.env.REACT_APP_BASE_URL}/user/otp`
            const response=await axios.post(url,{email:email})
            if(response.data.success){
                setUserVerified(true)
            }
        }
       
    }

  return (
    <div className='d-flex justify-content-center align-items-center flex-column'>
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter your email" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
      </Form.Group>
      {
        userVerified ?(
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>OTP</Form.Label>
            <Form.Control type="number" placeholder="Enter your OTP" name='otp' value={otp} onChange={(e)=>setOTP(e.target.value)}  />
          </Form.Group>
        ):null
      }
     {
        otpVerified?(
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Update Password</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>
        ):null
     }

      <button className='btn btn-primary'>{userVerified?"Verify OTP":"Send OTP"}</button>
    </Form>
    </div>
  );
}

export default ForgotPassword;
