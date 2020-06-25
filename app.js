const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
const { deepEqual } = require('assert');

//https://stackabuse.com/node-js-express-examples-rendered-rest-and-static-websites/ // Gutes Beispiel
//https://www.tutorialspoint.com/nodejs/nodejs_event_emitter.htm // Events
// Vue.js https://vuejs.org/v2/guide/

// https://codeshack.io/basic-login-system-nodejs-express-mysql/

//Setting Up MySQL
var db = mysql.createPool({
    connectionLimit: 20,
    host: "s224.goserver.host",
    user: "web234",
    password: "jsukj3jpLZCsVDE",
    database: 'web234_db2'
});

// Setting up Express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.engine('html', require('ejs').renderFile);


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
app.get('/getUsers', (req, res) => {
    db.query("SELECT * FROM web234_db2.users", (err, result) => {
        res.send(result);
    });
});

app.get('/getWohnung', (req, res) => {
    db.query("SELECT * FROM web234_db2.wohnung", (err, result) => {
        res.send(result);
    });
});
app.post('/getMyFlats', (req, res) => {
    var userid = req.body.user_id;
    console.log("Getting Flats for:", userid);
    db.query("SELECT * FROM web234_db2.wohnung WHERE users_id = " + parseInt(userid) + ";", (err, result) => {
        console.log(result);
        res.send(JSON.stringify(result));
    });
});

app.post('/updateProfile', (req, res) => {
    console.log(req.body);

    db.query(`UPDATE web234_db2.users SET full_name = "${req.body.full_name}",phone = "${req.body.phone}",gender = "${req.body.gender}",age = "${req.body.age}" WHERE id = ` + parseInt(req.body.id) + ";",
        (err, result) => {
            console.log("update attempt");
            console.log(result);
            res.send(result);
        });
});

app.post('/getMatches', (req, res) => {

    var id = req.body.wohnung_id;
    var matchlist = [{name:"test",phone:"1234"}];
    console.log("request", id);
    db.query('SELECT * FROM web234_db2.matches WHERE wohnung_id = ' + parseInt(id) + ";",
        (err, result) => {
            result.forEach(user => {
                console.log("match usr id:", user.Users_id);
                db.query('SELECT * FROM web234_db2.users WHERE id = ' + parseInt(user.Users_id), (err, db2) => {
                    matchlist.push({ name: db2[0].full_name, phone: db2[0].phone });
                    
                });
            });
        }
    );
    setTimeout(function(){res.send(matchlist);},1200);
});

app.post('/deleteFlat', (req, res) => {
    var flat = req.body.id;
    console.log("delete flat",flat);
    db.query("DELETE FROM web234_db2.matches WHERE wohnung_id " + parseInt(flat), (err,result) => {

        setTimeout(function(){db.query('DELETE FROM web234_db2.wohnung WHERE id = ' + parseInt(flat), (err, result) => {
            console.log("delete attempt");
            console.log(err);
            console.log(result);
            res.send(result);
        });},1200);
    });
    

});

app.post('/signup', (req, res) => {
    var username = req.body.name;
    var email = req.body.mail;
    console.log(username, email);
    db.query(`SELECT * FROM web234_db2.users WHERE full_name = "${username}" AND email = "${email}";`, (err, result) => {
        console.log("login attempt");
        console.log(result);
        res.send(result);
    });

});

app.post('/addUser', (req, res) => {
    var user = req.body;

    let data = {
        full_name: user.name,
        email: user.mail,
    };

    let sql = 'INSERT INTO web234_db2.users SET ?';
    db.query(sql, data, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });

});
//id . match_date. user_id, wohnung_id
app.post('/addMatch', (req, res) => {
    var mtch = req.body;
    console.log(mtch);
    var data = {
        match_date: mtch.date,
        users_id: mtch.user_id,
        wohnung_id: mtch.wohnung_id
    }
    let sql = 'INSERT INTO web234_db2.matches SET ?';
    db.query(sql, data, (err, result) => {
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
        mates: flat.mates,
        rent: flat.rent,
        roomsize: flat.roomsize,
        title: flat.title,
        users_id: flat.userid
    }
    let sql = 'INSERT INTO web234_db2.wohnung SET ?';
    db.query(sql, data, (err, result) => {
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
app.get('/', function (req, res) {
    res.render('index.html');
});
app.get('/app', function (req, res) {
    res.render('app.html');
});

module.exports = app;