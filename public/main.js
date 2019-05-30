const app = require('express')();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Classbook'
});

connection.connect(err => {
    if (err) {
        console.error(err);
    } else {
        console.log('Connected successfully');
    }
});

app.get('/', (req, resp) => {
    try {
        connection.query(
            `CREATE TABLE Teachers (
                name varchar(10)
            );`
        );
        console.log('Created teachers');
    } catch (err) {
        console.error(err);
    }
});

app.get('/restart', (req, resp) => {
    connection.query(
        `DROP TABLE Teachers`
    );
});


app.listen(1337);
