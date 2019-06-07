const connection = require('../connection.js');

class Student {
    constructor(name, surname, classId) {
        connection.run(`
            INSERT INTO Student (name, surname, classId)
            VALUES ('${name}', '${surname}', '${classId}');
        `);
    }

    static printLastEntry() {
        connection.run(`
            SELECT * FROM Student
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

    static show(id) {
        connection.run(`
            SELECT c.className, st.id, st.name, st.surname, s.subjectName, sm.mark FROM SubjectMark sm
            LEFT JOIN Student st ON st.id = sm.studentId
            LEFT JOIN Subject s ON s.id = sm.subjectId
            LEFT JOIN Class c ON st.classId = c.id
            WHERE st.id = ${id}
            ORDER BY s.subjectName
        `, (err, result, fields) => {
            let first = result[0];
            console.log(first.id + ' ' + first.className + ' ' + first.name + ' ' + first.surname) ;
            let currSubject = '';
            for (let entry of result) {
                if (currSubject != entry.subjectName) {
                    currSubject = entry.subjectName;
                    console.log('\n' + currSubject + ':');
                }
                console.log(`\t- ${entry.mark}`);
            }
        });
    }

    static remove(id) {
        console.log('Removed Student')
        Student.printEntry(id);
        connection.run(`
            DELETE FROM Student
            WHERE id = ${id};
        `);
    }
}

module.exports = Student;
