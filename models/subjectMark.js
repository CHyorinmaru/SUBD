const connection = require('../connection.js');

class SubjectMark {
    constructor(mark, subject, student) {
        connection.run(`
            INSERT INTO SubjectMark (mark, subjectId, studentId)
            VALUES (${mark}, ${subject}, ${student});
        `);
        SubjectMark.printLastEntry();
    }

    static printLastEntry() {
        connection.run(`
            SELECT * FROM SubjectMark
            ORDER BY id DESC;
        `, (err, result, fields) => {
            console.log('(');
            for (let key of Object.keys(result[0])) {
                console.log('\t' + key + ': ' + result[0][key]);
            }
            console.log(')');
        });
    }

    static printEntry(id) {
        connection.run(`
            SELECT * FROM SubjectMark st
            WHERE st.id = ${id};
        `, (err, result, fields) => {
            console.log('(');
            for (let key of Object.keys(result[0])) {
                console.log('\t' + key + ': ' + result[0][key]);
            }
            console.log(')');
        });
    }

    static remove(id) {
        console.log('Removed Mark')
        Mark.printEntry(id);
        connection.run(`
            DELETE FROM Student
            WHERE id = ${id};
        `);
    }

    static update(id, mark, subject, student) {
        connection.run(`
            UPDATE SubjectMark sm
            SET sm.mark = ${mark}, sm.subjectId = ${subject}, sm.studentId = ${student}
            WHERE sm.id = ${id};
        `);
        console.log('Updated Mark');
        SubjectMark.printEntry(id);
    }
}

module.exports = SubjectMark;
