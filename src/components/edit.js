import Axios  from "axios";
import React, { useState } from "react";

const makeid= () =>{
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!$%&/()=?¿ç*:';
    let charactersLength = characters.length;
    for ( let i = 0; i < 20; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
const recomendada = makeid();

function Edit({dataAccount}){
    const [nombreServicio, setNombreServicio] = useState(dataAccount.nombre)
    const [usuarioServicio,setUsuarioServicio] = useState(dataAccount.usuario)
    const [contraseniaServicio,setContraseniaServicio] = useState(dataAccount.contraseña)
    const [linkServicio, setLinkServicio] = useState(dataAccount.link)
    
    const update = () =>{
        Axios.post("http://localhost:3001/update",{id:dataAccount.idCuenta,nombre:nombreServicio,usuario:usuarioServicio,passw:contraseniaServicio,link:linkServicio}).then((response)=>{
            console.log(response.message)
        })
    }
   
    return(
        <>
            <h3>Aquí puedes editar tu cuenta de {nombreServicio}</h3>
            <form action="http://localhost:3000">
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
                }} value={contraseniaServicio}></input><p>Contraseña Recomendada: {recomendada}</p>
                <h4>Link :</h4>
                <input type="text" placeholder="url" onChange={(e)=>{
                    setLinkServicio(e.target.value)
                }} value={linkServicio}></input><br></br><br></br>
                <button onClick={update}>Editar</button>
                <button><a href="http://localhost:3000">Volver</a></button>
            </form>
        </>
    )
}
export default Edit;