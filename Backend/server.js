const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(cors())

// Replace this with a secure way to store your API keys
const apiKeys = new Set(['899yhyuiUOO908956145B7H']);

// Middleware for API key authentication
const authenticateApiKey = (req, res, next) => {
    const apiKey = req.headers['api-key'];

    if (!apiKey || !apiKeys.has(apiKey)) {
        return res.status(401).json({ error: 'Unauthorized - Invalid API key' });
    }

    next();
};

// Middleware to parse JSON requests
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'katf_trial'
})

app.get('/', (req, res)=>{
    return res.json("From Backend Side")
})

//Get data from database
app.get('/users', authenticateApiKey, (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

//Psting to database
app.post('/users', authenticateApiKey, (req, res)=>{
    const q = "INSERT INTO users (`id`, `name`,`user_name`,`about`,`profile_url`,`static_balance`,`star_balance`,`watched_vids`,`email`,`password`,`code`,`time_stamp`,`vids_watched`,`all_vids_watched`) VALUES (?)";
    const values = [105,
        'Angela Musangi Munyao',
        'Andrian_Omosh',
        'No caption yet',
        'images (3).jpeg',
        '29',
        '4',
        '0.0',
        'amusangi@aimsammi.org',
        'passcode',
        'passcode',
        '2023-06-24 09:47:25',
        '#104#127#',
        '#104#127#']
    db.query(q, [values], (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.listen(8081, ()=>{
    console.log("listening");
})