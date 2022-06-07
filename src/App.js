import React, {useEffect, useState} from "react";
import UserControl from "./components/userControl";
import Axios from "axios";
import './css/App.css';
import { Home } from "./components/home";
import { Link, Route, Routes } from "react-router-dom";
import Create from "./components/create";
import Edit from "./components/edit";



function App(){
  
  const [activeUser, setActiveUser] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [dataAccount, setDataAccount] = useState("")
  Axios.defaults.withCredentials = true;
  
  const childToParent=(account)=>{
    setDataAccount(account)
  }

  useEffect(()=>{
    
    Axios.get("http://localhost:3001/login").then((response)=>{
      if(response.data.loggedIn && response.data.user[0].usuario){
        setLoginStatus(true);
        setActiveUser(response.data.user[0].usuario);
      }else{
        setLoginStatus(false);
      }
    })
  },[]);

  const dieSession=()=>{
    setLoginStatus(false);
    Axios.get("http://localhost:3001/die").then((response)=>{

    })
  }
  
  if(loginStatus){
    return(
      <div className="App">
        <div className="navbar">
          <button><Link to="/">Home</Link></button>
          <button><Link to="/create">Create</Link></button>
          <button onClick={dieSession}>Log Out</button>
        </div>
        <div className="Header">
          <img src="/logo_repokey.png" alt="logo_repokey"></img>
        </div>
          <h2>Hola {activeUser}</h2>
        <Routes>
          <Route path="/" element={<Home childToParent={childToParent} />}></Route>
          <Route path="/create" element={<Create />}></Route>
          <Route path="/edit" element={<Edit dataAccount={dataAccount}/>}></Route>
        </Routes>
      </div>
    );
    
  }else{
    return(
      <div className="userControl">
        <UserControl />
      </div>
    );
  }
}
export default App;