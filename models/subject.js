const connection = require('../connection.js');

class Subject {
    constructor(name) {
        connection.run(`
            INSERT INTO Subject (subjectName)
            VALUES ('${name}');
        `);
    }

    static printEntry(id) {
        connection.run(`
            SELECT * FROM Student st
            WHERE st.id = ${id};
        `, (err, result, fields) => {
            console.log('(');
            for (let key of Object.keys(result[0])) {
                console.log('\t' + key + ': ' + result[0][key]);
            }
            console.log(')');
        });
    }

    static printLastEntry() {
        connection.run(`
            SELECT * FROM Subject
            ORDER BY id DESC;
        `, (err, result, fields) => {
            console.log('(');
            for (let key of Object.keys(result[0])) {
                console.log('\t' + key + ': ' + result[0][key]);
            }
            console.log(')');
        });
    }

    static remove(id) {
        console.log('Removed Subject')
        Subject.printEntry(id);
        connection.run(`
            DELETE FROM Subject
            WHERE id = ${id};
        `);
    }
}

module.exports = Subject;
