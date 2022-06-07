import Axios from "axios";
import React, { useState } from "react";

const Create = ()=>{

    const [nombreServicio, setNombreServicio] = useState("")
    const [usuarioServicio, setUsuarioServicio] = useState("")
    const [contraseniaServicio, setContraseniaServicio] = useState("")
    const [linkServicio, setLinkServicio] = useState("")
    const [creationStatus, setCreationStatus] = useState("")

    const creation = (e) =>{
        Axios.post("http://localhost:3001/creation",{name:nombreServicio,user:usuarioServicio,passw:contraseniaServicio,link:linkServicio}).then((response)=>{
            e.preventDefault();
            setNombreServicio("");
            setUsuarioServicio("");
            setContraseniaServicio("")
            setLinkServicio("")
            setCreationStatus(response.data.message)        
        })
    }

    const handleSubmit= (e)=>{
        e.preventDefault();
        setNombreServicio("");
        setUsuarioServicio("");
        setLinkServicio("")
        setContraseniaServicio("");
    }
    return(
        <>
            <h3>Crea tu nueva cuenta </h3>
            <form onSubmit={handleSubmit}>
                <h4>Nombre Del Servicio :</h4>
                <input type="text" placeholder="Nombre" onChange={(e)=>{
                    setNombreServicio(e.target.value)
                }} value={nombreServicio}></input>
                <h4>Usuario :</h4>
                <input type="text" placeholder="Usuario" onChange={(e)=>{
                    setUsuarioServicio(e.target.value)
                }} value={usuarioServicio}></input>
                <h4>Contraseña :</h4>
                <input type="password" placeholder="Contraseña" onChange={(e)=>{
                    setContraseniaServicio(e.target.value)
                }} value={contraseniaServicio}></input>
                <h4>Link :</h4>
                <input type="text" placeholder="url" onChange={(e)=>{
                    setLinkServicio(e.target.value)
                }} value={linkServicio}></input><br></br><br></br>
                <button onClick={creation}>Create</button>
            </form>
            <h4>{creationStatus}</h4>
        </>
    );
}
export default Create;