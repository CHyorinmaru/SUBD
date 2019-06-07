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

rl.on('line', (input) => {
    if (input.match(/^new/)) {
        if (input.match(/Class\(\d{1,2}\w\)/)) {
            let text = input.substr('new Class('.length);
            text = text.replace(/\)/, ' ');
            text = text.replace(/\s+/, '');
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
            tStudent.printLastEntry();
        }

        if (input.match(/Subject\(\w+\)/)) {
            let text = input.substr('new Subject('.length);
            text = text.replace(/\)/, '');
            text = text.replace(/\s+/, '');
            new tSubject(text);
            console.log("Created new Subject");
            tSubject.printLastEntry();
        }

        if (input.match(/Mark\(\d+,\s*\d+,\s*\d\)/)) {
            let text = input.substr('new Mark('.length);
            text = text.replace(/\)/, '');
            text = text.replace(/\s+/, '');
            text = text.split(/,/);
            new tSubjectMark(parseInt(text[0]), parseInt(text[1]), parseInt(text[2]));
            console.log("Created new Mark");
        }
    }

    if (input.match(/^remove/)) {
        if (input.match(/Student\(\d+\)/)) {
            let text = input.substr('remove Student('.length);
            text = text.replace(/\)/, '');
            text = text.replace(/\s+/, '');
            tStudent.remove(parseInt(text));
        }

        if (input.match(/Subject\(\d+\)/)) {
            let text = input.substr('remove Subject('.length);
            text = text.replace(/\)/, '');
            text = text.replace(/\s+/, '');
            tSubject.remove(parseInt(text));
        }

        if (input.match(/Mark\(\d+\)/)) {
            let text = input.substr('remove Mark('.length);
            text = text.replace(/\)/, '');
            text = text.replace(/\s+/, '');
            tMark.remove(parseInt(text));
        }
    }

    if (input.match(/^update/)) {
        if (input.match(/Mark\(\d+,\s+\d+,\s+\d+,\s+\d+\)/)) {
            let text = input.substr('update Mark('.length);
            text = text.replace(/\)/, '');
            text = text.replace(/\s+/, '');
            text = text.split(/,/);
            tSubjectMark.update(parseInt(text[0]), parseInt(text[1]), parseInt(text[2]), parseInt(text[3]))
        }
    }



    if (input.match(/^show Student\(\d*\)/)) {
        let text = input.substr('show Student('.length);
        text = text.replace(/\)/, '');
        id = parseInt(text);
        tStudent.show(id);
    }
});
