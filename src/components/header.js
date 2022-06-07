import React, {  } from "react";
import {
    Link,
    Route,
    Routes,
  } from "react-router-dom";
import App from "../App";
import Create from "./create";
import Edit from "./edit";

function Header(){
    
   
    return(
        <> 
            <div className="navbar">
                <button className="btn btn-outline-secondary"><Link to="/">Home</Link></button>
                <button className="btn btn-outline-secondary"><Link to="/created">Create</Link></button>
                <button className="btn btn-outline-secondary"><Link to="/edit">Edit</Link></button>
            </div>
            <Routes>
                <Route path="/" element={<App />}></Route>
                <Route path="/create" element={<Create />}></Route>
                <Route path="/edit" element={<Edit />}></Route>
            </Routes>

        </>
    )
}
export default Header;