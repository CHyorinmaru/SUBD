const express = require('express');
const path = require('path');
const connection = require('./connection.js');
const tables = require('./tables.js');
const readline = require('readline');

const tClass = require('./models/class.js');
const tStudent = require('./models/student.js');
const tSubject = require('./models/subject.js');
const tSubjectMark = require('./models/subjectMark.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function printStudent(id) {
    connection.run(`
        SELECT s.name, s.surname, c.className FROM Student s
        LEFT JOIN Class c ON s.classId = c.id
        WHERE s.id = ${id};
    `, (err, result, fields) => {
        console.log(result[0]);
    });
}

rl.on('line', (input) => {
    if (input.match(/^new/)) {
        if (input.match(/Class\(\d{1,2}\w\)/)) {
            let text = input.substr('new Class('.length);
            text = text.replace(/\)/, ' ');
            new tClass(text);
            console.log("Created Class");
            tClass.printLastEntry();
        }

        if (input.match(/Student\(\w+,\s*\w+,\s*\d+\)/)) {
            let text = input.substr('new Student('.length);
            text = text.replace(/\)/, '');
            text = text.replace(/\s+/, '');
            text = text.split(/,/);
            new tStudent(text[0], text[1], parseInt(text[2]));
            console.log("Created new Student");
        }

        if (input.match(/Subject\(w+\)/))
    }
});
