let Person = require('./person.js');

const express = require('express');
const fs = require('fs');
const app = express();
let personArray = [];

app.listen(8080, () => {
    console.log('Server started');
    fileRead();
});

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.route('/tdot/getAll').get((req, res) => {
    console.log("getAll called");
    res.send({
        personArray: personArray
    });

});

app.route('/tdot/addGuess').post((req, res) => {
    console.log("addGuess called");
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
    console.log("getPerson called");
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