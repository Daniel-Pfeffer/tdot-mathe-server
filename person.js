/**
 * Created by PhpStorm.
 * User: danielpfeffer
 * Date: 2018-12-20
 * Time: 07:24
 */
'use strict';

module.exports = class Person {

    /*
    guess is a integer
    guessGummybear is a float which defines kg
    guessmandM is a float and defines gram
     */

    constructor(name, mail, guess, guessGummybear, guessMandM) {
        this.name = name;
        this.mail = mail;
        this.guess = guess;
        this.guessGummybear = guessGummybear;
        this.guessMandM = guessMandM;
    }
};
