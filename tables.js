const connection = require('./connection.js');

class Tables {

    static createStudents() {
        connection.run(`
            CREATE TABLE Student (
                id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(20),
                surname VARCHAR(20),

                classId INTEGER,

                FOREIGN KEY(classId) REFERENCES Class(id) ON DELETE CASCADE
            );
        `);
    }

    static createClasses() {
        connection.run(`
            CREATE TABLE Class (
                id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
                className VARCHAR(3)
            );
        `);
    }

    static createSubjects() {
        connection.run(`
            CREATE TABLE Subject (
                id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
                subjectName VARCHAR(20)
            )
        `);
    }

    static createSubjectMarks() {
        connection.run(`
            CREATE TABLE SubjectMark (
                id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,

                mark INTEGER,

                subjectId INTEGER,
                studentId INTEGER,

                FOREIGN KEY(subjectId) REFERENCES Subject(id) ON DELETE CASCADE,
                FOREIGN KEY(studentId) REFERENCES Student(id) ON DELETE CASCADE
            );
        `);
    }

    static create() {
        Tables.createClasses();
        Tables.createStudents();
        Tables.createSubjects();
        Tables.createSubjectMarks();
    }
}

module.exports = Tables;
