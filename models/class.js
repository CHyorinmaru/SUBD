const connection = require('../connection.js');

class Class {
    constructor(name) {
        connection.run(`
            INSERT INTO Class (className)
            VALUES ('${name}');
        `);
    }

    static printLastEntry() {
        connection.run(`
            SELECT * FROM Class
            ORDER BY id DESC;
        `, (err, result, fields) => {
            console.log('(');
            for (let key of Object.keys(result[0])) {
                console.log('\t' + key + ': ' + result[0][key]);
            }
            console.log(')');
        });
    }
}

module.exports = Class;
