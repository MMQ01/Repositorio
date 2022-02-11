const express = require('express');
const routerproducto = express.Router();
const mysqlConnection = require('../config/database.js')

  
routerproducto.get('/producto', (req,res)=>{
    mysqlConnection.query('SELECT * FROM producto JOIN marca ON producto.ProductoMarca = marca.idmarca JOIN proveedor ON producto.ProductoProveedor = proveedor.idproveedor;' , (err,rows,fields)=>{            if(!err){
                res.json(rows);
                return;
            }else{
                console.log(err);
            }
        })
    })
    
    routerproducto.get('/producto/:id', (req,res)=>{
        const {id}=req.params;
        mysqlConnection.query('SELECT * FROM producto WHERE idProducto=?',[id],(err,rows)=>{
            if(!err){
                res.json(rows[0]);
                return;
            }else{
                console.log(err);
            }
        })
    })
    
    routerproducto.post('/producto',(req,res)=>{
        const {ProductoNombre,ProductoDescripcion,ProductoStock,ProductoPrecioUnitario,ProductoMarca,ProductoProveedor} = req.body;
             
            var sql = "INSERT INTO `producto` (`idProducto`, `ProductoNombre`, `ProductoDescripcion`, `ProductoStock`, `ProductoPrecioUnitario`, `ProductoMarca`, `ProductoProveedor`) VALUES ('"+"','" + req.body.ProductoNombre+"','" + req.body.ProductoDescripcion+"','" + req.body.ProductoStock+"','" + req.body.ProductoPrecioUnitario+"','" + req.body.ProductoMarca+"','" + req.body.ProductoProveedor+"')";
            mysqlConnection.query(sql,function (err,rows) {
                if(!err){
                    res.json({status: 'producto guardado'})
                }else{
                    console.log(err);
                }
            })
        })
    
    
        routerproducto.delete('/producto/:id',(req,res)=>{
            const { id } = req.params;
            mysqlConnection.query('DELETE FROM producto WHERE idProducto=?',[id],(err,rows)=>{
                if(!err){
                    res.json({status: 'producto eliminada'})
                }else{
                    console.log(err);
                }
            })
        })
    
        routerproducto.put('/producto/:id', (req, res)=>{
            const { id } = req.params;
            const {ProductoNombre,ProductoDescripcion,ProductoStock,ProductoPrecioUnitario,ProductoMarca,ProductoProveedor} = req.body;
    
            var sql="UPDATE `producto` SET `ProductoNombre` = '"+req.body.ProductoNombre+"', `ProductoDescripcion` = '"+req.body.ProductoDescripcion+"', `ProductoStock` = '"+req.body.ProductoStock+"', `ProductoPrecioUnitario` = '"+req.body.ProductoPrecioUnitario+"' WHERE `idProducto` = '"+req.params.id+"'";
            mysqlConnection.query(sql,function (err,rows) {
                if(!err){
                    res.json({status: 'Producto guardado'})
                }else{
                    console.log(err);
                }
            })
            })

module.exports=routerproducto;