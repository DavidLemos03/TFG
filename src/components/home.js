import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";



export const Home=({childToParent})=>{

    const [dataUser, setDataUser] = useState("");
    const [deleteMessg, setDeleteMessg] = useState("");
    const [passwText, setPasswText] = useState("Ver Contraseñas")
    const [secret, setSecret] = useState(true)
    

    Axios.defaults.withCredentials = true;
    useEffect(()=>{

        Axios.get("http://localhost:3001/data").then((response)=>{
            setDataUser(response);
        })
    },[])

    const randomizer=()=>{return (Math.floor(Math.random() * (Math.floor(Math.random() * (1000)) + 1)) + 1).toString();}

    if (dataUser.data) {
        
        return(
            <>
                <h3>Aquí están tus cuentas :</h3>
                <div className="Home">
                    {dataUser.data.map((account)=>{
                       return <div className="cuenta row" key={account.idCuenta}>
                    <div className="col-6">
                        <h3 key={account.nombre+randomizer()}>{account.nombre.toUpperCase()}</h3>
                        <h5 key={account.usuario+randomizer()}>Usuario: {account.usuario}</h5>
                        <h5 key={account.contraseña+randomizer()}>Contraseña: {secret ? "•••••••••••••" : account.contraseña}</h5>
                    </div>
                    <div className="col-6 column pt-4">      
                        <button className="btn btn-outline-danger pr-2" onClick={()=>{
                            let confirmation = window.confirm("Seguro/a que quieres borrar esta cuenta ?")
                            if(confirmation){
                                Axios.post("http://localhost:3001/erase",{idToErase:account.idCuenta}).then((response)=>{
                                    setDeleteMessg(response)
                                    window.location.reload(false);
                                })
                            }
                        }}>Delete</button>
                        <Link to="/edit" role="button" className="btn btn-outline-dark pl-2" onClick={()=>{
                            childToParent(account)
                        }}>Edit</Link>
                        <a href={account.link} role="button" className="btn btn-outline-info">Ir</a>
                    </div>
                    </div>
                    })}
                    <h5>{deleteMessg}</h5>
                </div>
                <button onClick={()=>{
                    setSecret(!secret)
                    if(secret){
                        setPasswText("Ocultar Contraseñas")

                    }else{
                        setPasswText("Ver Contraseñas")
                    }
                }}>{passwText}</button>
            </>
        )
    } else {
       return(
           <h1>Loading...</h1>
        ) 
           
    }
    
}