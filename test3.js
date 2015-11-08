var Z = require('./Z');
var fs = require('fs');
var os = require('os');

var s = "aabaaacaad"

Z.compute(s, function(Z1) {
    console.log(Z1);
    Z.naiveCompute(s, function(Z2) {
        console.log(Z2);
        console.log(Z1.toString() == Z2.toString());
    });
});

    
