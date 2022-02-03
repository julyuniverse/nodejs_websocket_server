const express = require('express');
const webSocket = require('./socket/webSocket');
const app = express();
const port = 3000;

// Express 4.16.0버전부터 body-parser의 일부 기능이 익스프레스에 내장 body-parser 연결 
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Controller
const authController = require('./controller/authController');

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.post('/api/auth/login', (req, res) => {
    const { id, pw } = req.body;

    authController.login(id, pw)
        .then((rows) => {
            console.log(rows);
            res.json(rows);
        })
        .catch((err) => {
            res.json(err);
        })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

webSocket();