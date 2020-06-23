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
    });
});

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
    });
});
app.post('/addUser',(req,res) => {
    var user = req.body;

    let data = {
        full_name: user.name,
        email: user.mail,
        gender: user.gender,
        age: user.age
    }
    let sql = 'INSERT INTO web234_db2.users SET ?';
    db.query(sql,data, (err,result) => {
        if (err) throw err;
            console.log(result);
    }); 
    res.send('users added');
});
//id . match_date. user_id, wohnung_id
app.post('/addMatch', (req,res) => {
    var mtch = req.body;
    console.log(mtch);
    var data = {
        match_date: mtch.date,
        users_id: mtch.user_id,
        wohnung_id: mtch.wohnung_id
    }
    let sql = 'INSERT INTO web234_db2.matches SET ?';
    db.query(sql,data, (err,result) => {
        if (err) throw err;
        console.log(result);
    });

    console.log("match added!");
    res.send("Match added");
});
app.post('/addWohnung', (req, res) => {
    var flat = req.body;
    console.log(flat);

        let data = {
            adresse: flat.adresse,
            available: flat.date,
            description: flat.description,
            flatsize: flat.flatsize,
            mates:flat.mates,
            rent: flat.rent,
            roomsize: flat.roomsize,
            title: flat.title,
            users_id: flat.userid
        }
        let sql = 'INSERT INTO web234_db2.wohnung SET ?';
        db.query(sql,data, (err,result) => {
            if (err) throw err;
            console.log(result);
        });
        res.send('wohnung added');
});

/**
 * STATIC FILES
 */
app.use('/', express.static('app'));
app.use(express.static('public'));

//Default every except api to ->
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname + '/app/index.html'));
});
app.get('/app',function(req,res){
    res.sendFile(path.join(__dirname + '/app/app.html'));
});

module.exports =app;

