const express = require('express')
const mysql = require('mysql2')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"W7301@jqir#",
    database:"mytable"
})



const port = process.env.port || 5000

console.log(port)

app.listen(port,()=>{
    console.log("listening to the server")
})

app.get('/',(req,res)=>{
    db.query(`SELECT * FROM candidate`,(err,result)=>{
        if(err) return res.json ({message:'404 not out'})
        res.json(result)    
    }) 
})

app.post('/insert',(req,res)=>{
const {name,position,age} = req.body
db.query(`INSERT INTO candidate(name,position,age) VALUES ('${name}','${position}',${age})`,(err,result)=>{
    if (err) return res.json({message:err})
    res.status(200).json({message:'inserted success'})    
})
})


app.put('/edit/:id',(req,res)=>{
    const {name,position,age} = req.body
    const {id} = req.params
    db.query(`UPDATE candidate SET name='${name}', position='${position}' ,age=${age} WHERE id = ${id}`,(err,result)=>{
        if(err) return res.json({message:'hello ji'})
        
        res.status(200).json({message:'updated success'})    
    })
})

app.delete('/delete/:id',(req,res)=>{
    const {id} = req.params;
    db.query(`DELETE FROM candidate WHERE id=${id}`, (err,result)=>{
        if(err) return res.json({message:err})
        res.json(result)    
    })
})