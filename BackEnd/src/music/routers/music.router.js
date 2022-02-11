const express = require('express');
const router = express.Router();
const mysqlConnection = require('../config/database.js')
const axios= require('axios');

    


router.get('/music', (req,res)=>{
    mysqlConnection.query('SELECT * FROM musica' , (err,rows,fields)=>{
        if(!err){
            res.json(rows);
            return;
        }else{
            console.log(err);
        }
    })
})


router.post('/music',(req,res)=>{
    const {nombreCancion, Usuario} = req.body;
    var q=req.body.nombreCancion;
    
    const options = {
    
    //method: 'GET',
    url: `https://www.googleapis.com/youtube/v3/search?key=AIzaSyAco_Y-hWeJ4vXsH3ECSC706ipMCpZf28I&type=video&part=snippet&maxResults=1&q=${q}`
    };
    
    axios.get(options.url)
    .then(response => {
        for (var i in response.data.items){
        var item =response.data.items[i];
        console.log('[%s] Title: %s', item.id.videoId, item.snippet.title);
        
        //req.body.urlCancion="https://www.youtube.com/watch?v="+item.id.videoId;
        req.body.urlCancion="https://www.youtube.com/watch?v="+item.id.videoId;
        req.body.nombreCancion=item.snippet.title;
        console.log(req.body.urlCancion);
        var sql = "INSERT INTO `musica` (`id`, `nombreCancion`, `Usuario`, `urlCancion`) VALUES ('"+"','" + req.body.nombreCancion +"','"+ req.body.Usuario+"','"+ req.body.urlCancion+"')";
        mysqlConnection.query(sql,function (err,rows) {
            if(!err){
                res.json({status: 'cancion guardada'})
            }else{
                console.log(err);
            }
        })
        }
        
    })
    
  //  req.body.urlCancion="https://www.youtube.com/watch?v="+item.id.videoId;
    /*
    var sql = "INSERT INTO `musica` (`id`, `nombreCancion`, `Usuario`, `urlCancion`) VALUES ('"+"','" + req.body.nombreCancion +"','"+ req.body.Usuario+"','"+ req.body.urlCancion+"')";
    mysqlConnection.query(sql,function (err,rows) {
        if(!err){
            res.json({status: 'cancion guardado'})
        }else{
            console.log(err);
        }
    })*/
})



router.delete('/music/:id',(req,res)=>{
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM musica WHERE id=?',[id],(err,rows)=>{
        if(!err){
            res.json({status: 'cancion eliminada'})
        }else{
            console.log(err);
        }
    })
})
/*
routesproveedor.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        //console.log(req.body)
        conn.query('INSERT INTO proveedor set ?',[req.body], (err, rows)=> {
           if(err) return res.send(err)  
            res.send("Proveedor Insertado")
        })
    })
})*/
module.exports=router;