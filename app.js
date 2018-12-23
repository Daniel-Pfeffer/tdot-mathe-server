let Person = require('./person.js');

const express = require('express');
const fs = require('fs');
const app = express();
let personArray = [];

app.listen(8080, () => {
    console.log('Server started');
    fileRead();
});


app.route('/tdot/getAll').get((req, res) => {
    res.send({
        personArray: personArray
    });

});

app.route('/tdot/addGuess').put((req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        let data = JSON.parse(body);
        if (!findPerson(data)) {
            personArray.push(new Person(data['name'], data['mail'], data['guess']));
            fileWrite();
            res.end('ok')
        } else {
            res.end('wot m8');
        }
    });
});

app.route('/tdot/getPerson').post((req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        let data = JSON.parse(body);
        const person = findRealPerson(data);
        res.status(200).send(person)
    });
});

function fileRead() {
    let data = fs.readFileSync('persons.json');
    let persons = JSON.parse(data);
    for (let personsKey in persons) {
        personArray.push(new Person(persons[personsKey]['name'], persons[personsKey]['mail'], persons[personsKey]['guess']));
    }
}

function fileWrite() {
    let data = JSON.stringify(personArray);
    fs.writeFileSync('persons.json', data)
}

function findPerson(data) {
    const mail = data['mail'];
    for (let personArrayElement of personArray) {
        if (personArrayElement.mail === mail) {
            return true
        }
    }
    return false;
}

function findRealPerson(data) {
    const mail = data['mail'];
    for (let personArrayElement of personArray) {
        if (personArrayElement.mail === mail) {
            return personArrayElement
        }
    }
    return null;
}