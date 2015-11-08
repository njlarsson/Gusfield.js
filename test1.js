var Z = require('./Z');
var fs = require('fs');
var os = require('os');

var zShowMatches = function(P, T) {
    Z.findMatches(P, T, '\0', function(matches) {
        console.log(matches);
    });
};

var zShowMatchesInFile = function(P, fnam) {
    fs.readFile(fnam, 'binary', function(err, data) {
        if (err) { console.log("Failed to read " + fnam); }
        else     { zShowMatches(P, data); }
    });
};

zShowMatches("abc", "aabcabbabcabca");
zShowMatchesInFile("e was p", os.homedir() + "/bigfiles/skull.txt");
zShowMatchesInFile("as that of a", os.homedir() + "/bigfiles/rfcs.txt");
