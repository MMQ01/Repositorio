const { response } = require('express');
//importar modulos
const express=require('express');
const axios= require('axios');
const cors=require('cors');
const app=express();
const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.use(require('./src/music/routers/music.router.js'))
app.use(require('./src/music/routers/proveedor.router.js'))
app.use(require('./src/music/routers/marca.routers.js'))
app.use(require('./src/music/routers/productos.routers'))


app.listen(3000, ()=> console.log('Listening to port 3000'));
const http = require('http');
const host = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Primer servidor con Node.Js');
});
server.listen(port, host, () => {
  console.log(`Servidor corriendo en http://${host}:${port}`);
});

/*const {google} = require('googleapis');

google.youtube('v3').search.list({
    key: 'AIzaSyAco_Y-hWeJ4vXsH3ECSC706ipMCpZf28I',
    part: 'snippet',
    q: 'joji',
}).then((response) => {
    console.log(response);
}).catch((error)=> console.log(error));*/