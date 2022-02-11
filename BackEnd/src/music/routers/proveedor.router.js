const express = require('express');
const routerProveedor = express.Router();
const mysqlConnection = require('../config/database.js')


    


routerProveedor.get('/proveedor', (req,res)=>{
    mysqlConnection.query('SELECT * FROM proveedor' , (err,rows,fields)=>{
        if(!err){
            res.json(rows);
            return;
        }else{
            console.log(err);
        }
    })
})

routerProveedor.get('/proveedor/:id', (req,res)=>{
    const {id}=req.params;
    mysqlConnection.query('SELECT * FROM proveedor WHERE idproveedor=?',[id],(err,rows)=>{
        if(!err){
            res.json(rows[0]);
            return;
        }else{
            console.log(err);
        }
    })
})

routerProveedor.post('/proveedor',(req,res)=>{
    const {proveedorDescripcion} = req.body;
         
        var sql = "INSERT INTO `proveedor` (`idproveedor`, `proveedorDescripcion`) VALUES ('"+"','" + req.body.proveedorDescripcion+"')";
        mysqlConnection.query(sql,function (err,rows) {
            if(!err){
                res.json({status: 'proveedor guardado'})
            }else{
                console.log(err);
            }
        })
    })


routerProveedor.delete('/proveedor/:id',(req,res)=>{
        const { id } = req.params;
        mysqlConnection.query('DELETE FROM proveedor WHERE idproveedor=?',[id],(err,rows)=>{
            if(!err){
                res.json({status: 'proveedor eliminado'})
            }else{
                console.log(err);
            }
        })
    })

    routerProveedor.put('/proveedor/:id', (req, res)=>{
        const { id } = req.params;
        const {proveedorDescripcion}=req.body;
        //var sql = "INSERT INTO `marca` (`idmarca`, `marcaDescripcion`) VALUES ('"+"','" + req.body.marcaDescripcion+"')";

        var sql="UPDATE `proveedor` SET `proveedorDescripcion` = '"+req.body.proveedorDescripcion+"' WHERE `idproveedor` = '"+req.params.id+"'";
        mysqlConnection.query(sql,function (err,rows) {
            if(!err){
                res.json({status: 'marca guardado'})
            }else{
                console.log(err);
            }
        })
        })

module.exports=routerProveedor;