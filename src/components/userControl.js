import React, {/*useEffect,*/ useState} from "react";
import Axios from "axios";
import '../css/App.css';


function UserControl(){
  const [usernameLog, setUsernameLog] = useState(""); 
  const [passwordLog, setPasswordLog] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [usernameReg, setUsernameReg] = useState(""); 
  const [registerStatus, setRegisterStatus] = useState("");
  const [passwordReg, setPasswordReg] = useState(""); 
  
  const register = (e)=>{
    Axios.post("http://localhost:3001/register",{username: usernameReg, password: passwordReg}).then((response)=>{
      if(response.data.fail){
        e.preventDefault();
        setUsernameReg('');
        setPasswordReg('');
        setRegisterStatus(response.data.message);
      }else{
        e.preventDefault();
        setUsernameReg('');
        setPasswordReg('');
        setRegisterStatus(response.data.message);
        // setRegisterStatus("Se ha registrado correctamente, por favor inicie sesión")
      }
    });
  }

  const login =()=>{
    Axios.post("http://localhost:3001/login",{username: usernameLog, password: passwordLog}).then((response)=>{
      if(response.data.message){
        setLoginStatus(response.data.message);
      }else{
        setLoginStatus(response.data[0].usuario);
        window.location.reload(false); 
      }
    });
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    setUsernameLog('');
    setPasswordLog('');
  }

  Axios.defaults.withCredentials = true;

  return(
    <div className="UserForm">
      <div className="Header">
        <img src="/logo_repokey.png" alt="logo_repokey"></img>
      </div>
      <div className="login">
        <form onSubmit={handleSubmit}>
          <h1>Log In</h1>
          <input className="col-12" type="text" placeholder='Username' onChange={(e)=>{
            setUsernameLog(e.target.value)
          }} value={usernameLog}/>
          <input className="col-12" type="password" placeholder='Password' onChange={(e)=>{
            setPasswordLog(e.target.value)
          }} value={passwordLog}/>
          <button onClick={login}>Log In</button>
        </form>
        <h2>{loginStatus}</h2>
      </div>
      <div className="registration">
          <form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <input className="col-12" type="text" placeholder='Username' onChange={(e)=>{
                setUsernameReg(e.target.value)
                }} value={usernameReg}/>
                <input className="col-12" type="password" placeholder='Password' onChange={(e)=>{
                setPasswordReg(e.target.value)
                }} value={passwordReg}/>
                <button onClick={register}>Register</button>
          </form>
          <h2>{registerStatus}</h2>
      </div>
    </div>
  )
}
export default UserControl;