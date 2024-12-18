import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
<Route path='/' element={<Home/>}></Route>
<Route path='/register' element={<Register/>}></Route>
<Route path='/login' element={<Login/>}></Route>
<Route path='/dashboard' element={<Dashboard/>}></Route>
<Route path='/forgot' element={<ForgotPassword/>}></Route>



    </Routes>
<ToastContainer/>    
    </>
  );
}

export default App;
