const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(express.json());
app.use(cors({
    origin : ["http://localhost:3000"],
    methods : ["GET","POST"],
    credentials : true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    key : "userID",
    secret : "A!·$%&/()=0",
    resave : false,
    saveUninitialized : false,
    cookie : {
        name : "repokey",
        maxAge : 86400000 //24h TTL
    }
}))



const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "repokey",
});

let idAliveUser = 0;

app.use('/register', (req,res)=>{

    const username = req.body.username;
    const password = req.body.password;
    let idClient = 0;

    db.query("SELECT * FROM `credenciales` WHERE `usuario` = ?",[username],(err,result)=>{
        if(err){
            res.send(err);
        }else{
            if(result.length > 0){
                res.send({message:"Ya existe un usuario con ese nombre"})
            }else{
                db.query("SELECT COUNT(*) AS 'id' FROM `credenciales`",(err, result)=>{
                    if(err){
                        res.send({message:"Error comprobando clientes en la base de datos",fail:true});
                    }else{
                        // idClient=(result[0].id)+Math.floor(Math.random() * (9999)) + 1;
                        idClient=(result[0].id)+1;
                        db.query("INSERT INTO `credenciales`(`idCliente`, `usuario`, `contraseña`) VALUES (?,?,MD5(?))",[idClient,username,password],(err,result)=>{
                            if(err){
                            res.send({message:"Error en el registro del usuario",fail:true})
                            }else{
                                res.send({message:"Usuario registrado correctamente, Accede mediante el LogIn",fail:false});
                            }
                        })
                    }
                })
            }
        }
    })
})

app.get("/login",(req,res)=>{
    if(req.session.user && !die){
        res.send({loggedIn:true,user:req.session.user})
    }else{
        res.send({loggedIn:false})
    }
})
let die=false;
app.get("/die",(req,res)=>{
    die = true;
})

app.use("/erase",(req,res)=>{
    db.query("DELETE FROM `cuentas` WHERE `idCuenta` = ?",[req.body.idToErase],(err,result)=>{
        if(err){
            res.send({message:err})
        }else{
            res.send({message:"Cuenta Borrada Con Éxito"})
        }
    })
})

app.use('/login', (req,res)=>{
    db.query("SELECT * FROM `credenciales` WHERE `usuario`= ? AND `contraseña`= MD5(?)",
    [req.body.username,req.body.password],
    (err,result)=>{
        if(err){
            res.send({err:err});
        }else{
            if(result.length > 0){
                idAliveUser = result[0].idCliente;
                req.session.user = result;
                res.send(result);
                die = false;
            }else{
                res.send({message:"Login missmatch"});
            }
        }
    })
})

app.get("/data",(req,res)=>{

    if(req.session.user){
        db.query("SELECT * FROM `cuentas` WHERE `idCliente` = ?",[req.session.user[0].idCliente],(err,result)=>{
            if(err){
                res.send({err:err});
            }else{
                res.send(result);
            }
        });
    }
})

app.use("/update",(req,res)=>{
    
    db.query("UPDATE `cuentas` SET `usuario`= ?,`contraseña`= ?,`nombre`= ?, `link`= ? WHERE `idCuenta`= ?",[req.body.usuario,req.body.passw,req.body.nombre,req.body.link,req.body.id],(err,result)=>{
        
        if(err){
            res.send({message:err})
        }else{
            res.send({message:"Cuenta Actualizada"})
        }
    })
})

app.use("/creation",(req,res)=>{

    const name = req.body.name;
    const user = req.body.user;
    const passw = req.body.passw;
    const link = req.body.link
    let idCuenta = 0;


    db.query("SELECT * FROM `cuentas` WHERE `nombre` = ? AND `usuario` = ?",[name,user],(err,result)=>{
        if(err){
            res.send({message:"Error inesperado",fail:true});
        }else{
            if(result.length > 0){
                res.send({message:"Ya existe esa cuenta en ese servicio",fail:true})
            }else{
                db.query("SELECT `idCuenta` FROM `cuentas` WHERE `idCuenta` = (SELECT MAX(`idCuenta`) FROM `cuentas`)",(err,result)=>{
                    if(err){
                        res.send({message:"Error inesparado",fail:true});
                    }else{
                        idCuenta = (result[0].idCuenta)+1;
                        db.query("INSERT INTO `cuentas`(`idCuenta`, `usuario`, `contraseña`, `nombre`, `idCliente`, `link`) VALUES (?,?,?,?,?,?)",[idCuenta,user,passw,name,idAliveUser,link],(err,result)=>{
                            if(err){
                                res.send({message:"Error en la inserción",fail:true});
                                console.log(err)
                            }else{
                                res.send({message:"Cuenta creada con exito !",fail:false})
                            }
                        })
                    }
                })
            }
        }
    })
})

/*---------------------------------*/
app.listen(3001,()=>{
    console.log("running server...");
})