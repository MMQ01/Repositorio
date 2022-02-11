const mysql= require('mysql');

var conexion = mysql.createConnection({
    host:'192.168.1.41',
    database: 'proyecto',
    user:'root',
    pass:'root'
});

conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('Conexion exitosa');
    }
});

module.exports = conexion