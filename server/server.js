import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import Jwt  from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
const salt = 10;

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));
//  app.use(cors());
app.use(cookieParser());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mvc"
})


const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "You are not authenticated" })
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json({ Error: "Token is  not ok" });
            } else {
                req.name = decoded.name;
                next();
            }
        })
    }
}

login.get('/', verifyUser, (req, res) => {
    return res.json({ Status: "Success", name: req.name });
})


db.connect(function(err){
    if(err)
    console.log("Error ", err);
else
console.log(" Database Connected");
})

app.post('/register', (req, res) => {
    const sql = "INSERT into login(`name`,`email`,`password`) VALUES(?)";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err)
            return res.json({ Error: "Error for hassing password" })

        const values = [
            req.body.name,
            req.body.email,
            hash
        ]
        db.query(sql, [values], (err, result) => {
            if (err)
                return res.json({ Error: "Inserting data Error in server" });
                return res.json({ Status: "Success" });
        })
    })
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ?";
    db.query(sql, req.body.email, (err, data) => { //data = result  
        if (err)
            return res.json({ Error: "Login Error on server" });
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err)
                    return res.json({ Error: "password compare error" });
                if (response) {
                    const name = data[0].name;
                    const token = Jwt.sign({ name }, "jwt-secret-key", { expiresIn: '30s' }, (err, token)=>{ //extra
                        console.log(token)
                        res.cookie('token', token)
                        return res.json({ Status: "Success" });    
                    });
                } else {
                    return res.json({ Error: "Password not matched" });
                }
            })
        } else {
            return res.json({ Error: "No email existed" });
        }
    })
})


app.listen(4000, ()=>{
    console.log("Server Started :)")
})
