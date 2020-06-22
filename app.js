const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');

//https://stackabuse.com/node-js-express-examples-rendered-rest-and-static-websites/ // Gutes Beispiel
//https://www.tutorialspoint.com/nodejs/nodejs_event_emitter.htm // Events
// Vue.js https://vuejs.org/v2/guide/

// https://codeshack.io/basic-login-system-nodejs-express-mysql/

//Create connectoin
var db = mysql.createPool({
    connectionLimit: 20,
    host: "s224.goserver.host",
    user: "web234",
    password : "jsukj3jpLZCsVDE",
    database: 'web234_db2'
});
/*
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("Database connection established");
})
*/
/*
runCycle();
function runCycle(){
    db.query("SELECT * FROM web234_db2.wohnung",(err,res) =>{
        console.log(res);
    });
    setTimeout(runCycle, {  
    }, 1000);
}
*/
//EXCLUDE!

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

/**
 * API
 */


//CREATE DB
app.get('/createdb', (req,res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err,result) => {
        if (err) throw err;
        console.log(result);
        res.send('db created');
    })
})

//web234_db2.users
/*
id auto 
full name varchar(45) not Null
phone varchar(45) null
email varchar(45) not Null
gender varchar(1) null
photos blob null
age int(11) null

*/

app.get('/getUsers', (req,res) =>{
    db.query("SELECT * FROM web234_db2.users", (err,result) => {
        res.send(result);
    });
});
app.get('/getWohnung', (req,res) =>{
    db.query("SELECT * FROM web234_db2.wohnung", (err,result) => {
        res.send(result);
    })
})
app.get('/addUser', (async function(req,res){
    for(var i = 0; i < 30; i++){
        var duude = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        let data = {
            full_name: "giirl"+duude,
            email: duude+"@.com",
            gender: "w",
            age: "24"
        }
        let sql = 'INSERT INTO web234_db2.users SET ?';
        try{
        await db.query(sql,data, (err,result) => {
        console.log(result);
        });
        }catch(err){
            console.err("transaction error");
        }
    }
    res.send('users added');
}));

app.get('/addWohnung', (req, res) => {
    for(var i = 0; i < 32; i++){
        var duude = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        
        let data = {
            adresse: "Strasse"+duude,
            available: "2020-07-07",
            description: "Hier steht was",
            flatsize: "77",
            mates:"12",
            rent: "777",
            roomsize: "3",
            title: "Wohnung"+duude,
            users_id: Math.abs(i+1)
        }
        let sql = 'INSERT INTO web234_db2.wohnung SET ?';
        db.query(sql,data, (err,result) => {
        if (err) throw err;
        console.log(result);
});
res.send('wohnung added');

}


})

/**
 * STATIC FILES
 */
app.use('/', express.static('app'));
app.use(express.static('public'));

//Default every except api to ->
app.get('*', function(req,res){
    res.sendFile(path.join(__dirname + '/app/index.html'));
})

module.exports =app;

