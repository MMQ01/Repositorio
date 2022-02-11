const express = require('express');
const routermarca = express.Router();
const mysqlConnection = require('../config/database.js')


    


routermarca.get('/marca', (req,res)=>{
    mysqlConnection.query('SELECT * FROM marca' , (err,rows,fields)=>{
        if(!err){
            res.json(rows);
            return;
        }else{
            console.log(err);
        }
    })
})

routermarca.get('/marca/:id', (req,res)=>{
    const {id}=req.params;
    mysqlConnection.query('SELECT * FROM marca  WHERE idmarca= ?',[id],(err,rows)=>{
        if(!err){
            res.json(rows[0]);
            return;
        }else{
            console.log(err);
        }
    })
})

routermarca.post('/marca',(req,res)=>{
    const {marcaDescripcion} = req.body;
         
        var sql = "INSERT INTO `marca` (`idmarca`, `marcaDescripcion`) VALUES ('"+"','" + req.body.marcaDescripcion+"')";
        mysqlConnection.query(sql,function (err,rows) {
            if(!err){
                res.json({status: 'marca guardado'})
            }else{
                console.log(err);
            }
        })
    })


    routermarca.delete('/marca/:id',(req,res)=>{
        const { id } = req.params;
        mysqlConnection.query('DELETE FROM marca WHERE idmarca=?',[id],(err,rows)=>{
            if(!err){
                res.json({status: 'cancion eliminada'})
            }else{
                console.log(err);
            }
        })
    })

    routermarca.put('/marca/:id', (req, res)=>{
        const { id } = req.params;
        const {marcaDescripcion}=req.body;
        //var sql = "INSERT INTO `marca` (`idmarca`, `marcaDescripcion`) VALUES ('"+"','" + req.body.marcaDescripcion+"')";

        var sql="UPDATE `marca` SET `marcaDescripcion` = '"+req.body.marcaDescripcion+"' WHERE `idmarca` = '"+req.params.id+"'";
        mysqlConnection.query(sql,function (err,rows) {
            if(!err){
                res.json({status: 'marca guardado'})
            }else{
                console.log(err);
            }
        })
        })
module.exports=routermarca;