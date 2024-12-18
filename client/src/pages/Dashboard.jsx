import React,{useState,useEffect} from 'react';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const token=localStorage.getItem("token")
    const decodeToken=jwtDecode(token)
    console.log(decodeToken.id)
    const fetchUser=async()=>{
        try{
const response=await axios.get(`${process.env.REACT_APP_BASE_URL}/user/${decodeToken.id}`)
setUser(response.data.user)
        }
        catch(err){
            console.log(err.message)
        }
    }
    useEffect(() => {
fetchUser();
    },[])
    
  return (
    <div>
      <h1>Hello From Dashboard {user?.name}</h1>
    </div>
  );
}

export default Dashboard;
