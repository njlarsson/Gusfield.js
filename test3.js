var Zalg = require('./Zalg');
var fs = require('fs');
var os = require('os');

var s = "aabaaacaad"

Zalg.compute_Z(s, function(Z1) {
    console.log(Z1);
    Zalg.naive_Z(s, function(Z2) {
        console.log(Z2);
        console.log(Z1.toString() == Z2.toString());
    });
});

    
