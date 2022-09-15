const express = require('express');
const port = 3000;
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');


app.use('/', require('./routes/feed'));



app.listen(port, ()=>{
    console.log(`port is running at http://localhost:${port}`);
})

