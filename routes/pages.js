const express = require('express');
const router = express.Router();

//get index
router.get('/', (req,res,next) => {
    res.render('index.html');
});

// get home
router.get('/app', (req,res,next) => {
    res.render('app.html');
});

router.post('/login', (req,res,next) => {
    res.json(req.body);
});


module.exports = router;

