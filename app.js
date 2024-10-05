const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const routes = require('./routes/route');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

app.use('/', routes);


const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
