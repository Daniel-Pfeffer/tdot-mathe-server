var Person = require('./person.js');

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
let personArray = [];
app.use(bodyParser.urlencoded({
    extended: true
}));
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
        if(findPerson(data)){
            res.status(418).send("lel")
        } else {
            res.status(200).send("ok")
        }
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
    fs.writeFile('persons.json', data)
}

function findPerson(data) {
    const mail = data['mail'];
    for (let personArrayElement of personArray) {
        if(personArrayElement.mail === mail){
            return true
        }
    }
    return false;
}