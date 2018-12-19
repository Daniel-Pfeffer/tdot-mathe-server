const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.listen(8080, () => {
    console.log('Server started')
});


app.route('/tdot/getAll').get((req, res) => {
    res.send({
        persons: [{
            name: 'gunther',
            mail: 'ex.e@at.com',
            guess: 1027
        }, {
            name: 'daniel',
            mail: 'ex.e@daniel.com',
            guess: 2090
        }]
    });
});

//app.use(bodyParser.json);

app.route('/tdot/addGuess').put((req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        console.log(body);
        res.end('ok')
    });
});

app.route('/tdot/getPerson').post((req, res) => {

});

