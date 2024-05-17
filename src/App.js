import './App.css';
import Navbar from './Components/Navbar';
import React ,{useState}from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SignUp from './Components/SignUp';
import LogIn from './Components/LogIn';
import LogInPass from './Components/LogInPass';

function App() {
  const [credentials, setCredentials] = useState({"email":"","password":""})
  return (
    <>
    <Router>
      <Routes>
        <Route path='login' element={<LogIn credentials={credentials} setCredentials={setCredentials}  />}></Route>
        <Route path='loginpass' element={<LogInPass credentials={credentials} setCredentials={setCredentials}  />}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
   
        <Route path='/' element={ <Navbar/>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;